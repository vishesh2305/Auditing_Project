const API_BASE_URL = 'http://localhost:3001/api';

const PROMPT_TEMPLATES = {
  'security-policy': {
    persona: "You are a world-class cybersecurity auditor.",
    json_structure: `{
      "summary": "A brief overview of the policy's strengths and weaknesses.",
      "vulnerabilities": [{
        "title": "Short vulnerability title",
        "severity": "Low/Medium/High",
        "description": "Clear explanation of the vulnerability.",
        "recommendation": "Actionable step to fix the vulnerability."
      }]
    }`,
    task: "Analyze the provided security policy and identify vulnerabilities."
  },
  'smart-contract': {
    persona: "You are an expert smart contract auditor specializing in Solidity.",
    json_structure: `{
      "summary": "A summary of the contract's security posture.",
      "issues": [{
        "title": "e.g., 'Reentrancy Vulnerability'",
        "severity": "Low/Medium/High/Critical",
        "description": "Explain the security issue and its potential impact.",
        "remediation": "Provide a code snippet or clear instructions to fix the issue."
      }]
    }`,
    task: "Analyze the following Solidity smart contract for security vulnerabilities, gas inefficiencies, and deviations from best practices."
  },
  'accessibility': {
    persona: "You are a web accessibility expert specializing in WCAG 2.1 standards.",
    json_structure: `{
      "summary": "An overview of the page's accessibility compliance.",
      "findings": [{
        "issue": "e.g., 'Missing alt text for image'",
        "compliance_level": "A/AA/AAA",
        "description": "Explain why this is an accessibility barrier.",
        "solution": "Provide the corrected HTML or specific instructions for remediation."
      }]
    }`,
    task: "Analyze the provided HTML snippet for Web Content Accessibility Guidelines (WCAG) 2.1 violations."
  },
  'code-quality': {
    persona: "You are a senior software engineer and code reviewer.",
    json_structure: `{
      "summary": "A general assessment of the code's quality and maintainability.",
      "points_of_concern": [{
        "area": "e.g., 'High Cyclomatic Complexity'",
        "type": "Readability/Performance/Best Practice",
        "comment": "Explain the issue with the code.",
        "suggestion": "Suggest a better approach or a refactored code snippet."
      }]
    }`,
    task: "Review the following code snippet for issues related to quality, style, best practices, and potential bugs."
  }
};

// 🔍 Main structured audit function (based on templates)
export const analyzeWithAI = async (auditType, inputText) => {
  const template = PROMPT_TEMPLATES[auditType];
  if (!template) {
    throw new Error(`Invalid audit type: ${auditType}`);
  }

  const prompt = `
${template.persona}
Your task is to ${template.task}
Provide your response strictly in the following JSON format. Do not include any text, markdown, or explanations outside of the single JSON object.
The required JSON structure is:
${template.json_structure}

Here is the content to analyze:
---
${inputText}
---
  `;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from the local LLM proxy');
    }

    return await response.json();
  } catch (error) {
    return {
      error: "Failed to Analyze",
      message: "Could not communicate with the local AI model. Please ensure the backend server and Ollama are running correctly."
    };
  }
};

// 🧠 Freeform simulation or markdown-style input (used by RemediationSimulator)
export const generateWithLocalLLM = async (prompt) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from the local LLM proxy');
    }

    return await response.text(); // Freeform result for raw display
  } catch (error) {
    return `<p class="text-red-600 font-semibold">❌ Local LLM unavailable. Check your server and Ollama instance.</p>`;
  }
};

// 🔐 Custom wrapper for analyzing structured policies (e.g., JSON objects)
export const analyzePolicyStructured = async (structuredPolicyText) => {
  return analyzeWithAI('security-policy', structuredPolicyText);
};

// ✨ NEW FUNCTION FOR CODE REMEDIATION ✨
export const generateCodeRemediation = async (vulnerableCode, vulnerabilityDescription) => {
  const persona = "You are an expert software security engineer and code auditor specializing in fixing vulnerabilities.";
  const task = `
Given the following vulnerable code snippet and a description of its issue, rewrite the code to fix the vulnerability.
Your response must be a valid JSON object with a single key "fixedCode", which contains the complete, corrected code as a string.
Do not include any other text, markdown, or explanations outside of this JSON object.`;

  const prompt = `
${persona}
${task}

---
VULNERABILITY DESCRIPTION:
${vulnerabilityDescription}
---
VULNERABLE CODE:
\`\`\`javascript
${vulnerableCode}
\`\`\`
---
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // Increased timeout for code generation

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from the local LLM proxy');
    }

    return await response.json(); // The backend should return a { "fixedCode": "..." } object
  } catch (error) {
    console.error("Failed to generate code remediation:", error);
    return {
      error: "Failed to Generate Fix",
      message: "Could not communicate with the AI model to generate a code fix. Please ensure the backend server and Ollama are running correctly."
    };
  }
};

// ✨ NEW FUNCTION FOR CODE SCORING ✨
export const scoreCodeWithAI = async (codeSnippet) => {
  const persona = "You are a senior software architect and code analysis expert.";
  const task = `
Analyze the provided code snippet and score it from 1 to 10 on three distinct metrics:
1.  **Security**: How well does it resist common vulnerabilities and attacks? (1=very insecure, 10=highly secure)
2.  **Performance**: How efficient is the code in terms of speed and resource usage? (1=very slow, 10=highly performant)
3.  **Readability**: How easy is the code to understand and maintain? (1=very confusing, 10=very clear)

Your response MUST be a valid JSON object with three keys: "securityScore", "performanceScore", and "readabilityScore".
Do not include any other text, markdown, or explanations outside of this JSON object.`;

  const prompt = `
${persona}
${task}

---
CODE TO ANALYZE:
\`\`\`
${codeSnippet}
\`\`\`
---
`;

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from the local LLM proxy');
    }

    return await response.json(); // Should return { "securityScore": N, "performanceScore": N, "readabilityScore": N }
  } catch (error) {
    console.error("Failed to score code:", error);
    return {
      error: "Scoring Failed",
      securityScore: 0,
      performanceScore: 0,
      readabilityScore: 0
    };
  }
};