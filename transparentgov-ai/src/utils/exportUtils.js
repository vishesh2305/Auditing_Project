const generateMarkdown = (result, auditType, inputText) => {
  let markdown = `# Audit Report: ${auditType ? auditType.replace('-', ' ') : 'Untitled Audit'}\n\n`;

  if (result?.summary) {
    markdown += `## Summary\n${result.summary}\n\n`;
  }

  const findingsKey = Object.keys(result || {}).find(key => Array.isArray(result[key]));
  const findings = findingsKey ? result[findingsKey] : [];

  if (findings.length > 0) {
    markdown += `## Detailed Findings\n\n`;
    findings.forEach((item, index) => {
      const title = item?.title || item?.issue || item?.area || `Finding ${index + 1}`;
      const severity = item?.severity || 'N/A';
      markdown += `### ${title}\n\n`;
      markdown += `**Severity:** ${severity}\n\n`;

      Object.entries(item || {}).forEach(([key, value]) => {
        if (!['title', 'issue', 'area', 'severity'].includes(key)) {
          const label = key?.replace(/_/g, ' ') || 'Unnamed Field';
          const content = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
          markdown += `**${label}:**\n\`\`\`\n${content}\n\`\`\`\n\n`;
        }
      });

      markdown += '---\n\n';
    });
  } else {
    markdown += `## Detailed Findings\n\nNo specific findings reported.\n\n`;
  }

  if (inputText) {
    markdown += `## Original Input Audited\n\n\`\`\`\n${inputText}\n\`\`\`\n`;
  }

  return markdown;
};

export const exportToMarkdown = (result, auditType, inputText) => {
  const markdownContent = generateMarkdown(result, auditType, inputText);
  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `audit-report-${auditType || 'untitled'}-${Date.now()}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert('Code copied to clipboard !');
    },
    (err) => {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy code. See console for details.');
    }
  )
}