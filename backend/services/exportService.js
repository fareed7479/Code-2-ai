const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

/**
 * Export diagram in various formats (SVG, PNG, PDF)
 * @param {string} mermaidCode - Mermaid.js diagram code
 * @param {string} format - Export format ('svg', 'png', 'pdf')
 * @returns {Promise<Buffer|string>} - File content (base64 for PNG/PDF, SVG string for SVG)
 */
const exportDiagram = async (mermaidCode, format) => {
  try {
    mermaidCode = mermaidCode.trim();
    // Validate Mermaid syntax with basic check
    if (!validateMermaidSyntax(mermaidCode)) {
      throw new Error('Invalid Mermaid syntax: Missing diagram keyword');
    }

    switch (format) {
      case 'svg':
        return await exportWithCli(mermaidCode, 'svg');
      case 'png':
        return await exportWithCli(mermaidCode, 'png');
      case 'pdf':
        return await exportWithCli(mermaidCode, 'pdf');
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  } catch (error) {
    console.error('Export service error:', error);
    throw error;
  }
};

/**
 * Validate Mermaid syntax (basic check)
 */
const validateMermaidSyntax = (code) => {
  if (!code || typeof code !== 'string') return false;

  const validKeywords = [
    'graph', 
    'classDiagram',
    'sequenceDiagram',
    'flowchart',
    'stateDiagram',
    'erDiagram',
    'gantt'
  ];

  return validKeywords.some(keyword => code.includes(keyword));
};


/**
 * Export using mermaid-cli (mmdc)
 */
const exportWithCli = async (mermaidCode, format) => {
  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const inputFile = path.join(tempDir, `diagram-${Date.now()}.mmd`);
  const outputFile = path.join(tempDir, `diagram-${Date.now()}.${format}`);

  try {
    fs.writeFileSync(inputFile, mermaidCode);

    await execAsync(`npx mmdc -i ${inputFile} -o ${outputFile} -t neutral -b transparent`);

    const fileBuffer = fs.readFileSync(outputFile);

    // Clean up
    fs.unlinkSync(inputFile);
    fs.unlinkSync(outputFile);

    if (format === 'svg') {
      return fileBuffer.toString('utf8');
    } else {
      return fileBuffer.toString('base64'); // for PNG and PDF
    }
  } catch (error) {
    if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    throw error;
  }
};

/**
 * Clean up temp files on exit
 */
const cleanupTempFiles = () => {
  const tempDir = path.join(__dirname, '../temp');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
};

process.on('exit', cleanupTempFiles);
process.on('SIGINT', () => {
  cleanupTempFiles();
  process.exit(0);
});
process.on('SIGTERM', () => {
  cleanupTempFiles();
  process.exit(0);
});

module.exports = {
  exportDiagram,
  cleanupTempFiles
};
