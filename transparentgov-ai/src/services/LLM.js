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

export const analyzeWithAI = async (auditType, inputText, model = 'llama3') => {
  const template = PROMPT_TEMPLATES[auditType];
  if (!template) {
    throw new Error(`Invalid audit type: ${auditType}`);
  }

  const prompt = `
${template.persona}
Your task is to ${template.task}.

Your response MUST be a single, valid JSON object. Do not include any other text, conversational filler, markdown, or explanations before or after the JSON object.
The JSON object must strictly adhere to the following structure. Do not add, remove, or rename any keys.

Required JSON structure:
\`\`\`json
${template.json_structure}
\`\`\`

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
      body: JSON.stringify({ prompt, model: 'qwen2.5:7b', format: 'json' }),
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

    return await response.text();
  } catch (error) {
    return `<p class="text-red-600 font-semibold">❌ Local LLM unavailable. Check your server and Ollama instance.</p>`;
  }
};

export const analyzePolicyStructured = async (structuredPolicyText) => {
  return analyzeWithAI('security-policy', structuredPolicyText);
};

export const generateCodeRemediation = async (vulnerableCode, vulnerabilityDescription) => {
  const persona = "You are an expert software security engineer and code auditor specializing in fixing vulnerabilities.";
  const task = `
Given the following vulnerable code snippet and a description of its issue, rewrite the code to fix the vulnerability.
Your response MUST be a single, valid JSON object containing exactly one key: "fixedCode".
The value of "fixedCode" MUST be a string containing the complete, corrected code.
Do not add comments to the code unless they are essential for understanding the fix.
Do not include any other text, markdown, or explanations outside of the JSON object.`;
  const prompt = `
${persona}
${task}

---
VULNERABILITY DESCRIPTION:
${vulnerabilityDescription}
---
VULNERABLE CODE:
\`\`\`
${vulnerableCode}
\`\`\`
---
JSON Response:
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 200000);

  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model: 'qwen2.5:7b' }),
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
      error: "Failed to Generate Fix",
      message: "Could not communicate with the AI model to generate a code fix. Please ensure the backend server and Ollama are running correctly."
    };
  }
};

export const scoreCodeWithAI = async (codeSnippet) => {
  const persona = "You are a senior software architect and code analysis expert.";
  const task = `
Analyze the provided code snippet and score it on three metrics. The scores must be integers from 1 to 10.
1.  **Security**: Resistance to vulnerabilities (1=very insecure, 10=highly secure).
2.  **Performance**: Efficiency and resource usage (1=very slow, 10=highly performant).
3.  **Readability**: Ease of understanding and maintenance (1=very confusing, 10=very clear).

Your response MUST be a single, valid JSON object and nothing else.
The JSON object must contain exactly three keys: "securityScore", "performanceScore", and "readabilityScore", and their values must be integers.

Example of a perfect response:
\`\`\`json
{
  "securityScore": 8,
  "performanceScore": 7,
  "readabilityScore": 9
}
\`\`\`
`;

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
      body: JSON.stringify({ prompt, model: 'qwen2.5:7b' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch from the local LLM proxy');
    }

    return await response.json();
  } catch (error) {
    return {
      error: "Scoring Failed",
      securityScore: 0,
      performanceScore: 0,
      readabilityScore: 0
    };
  }
};