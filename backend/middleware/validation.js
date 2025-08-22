/**
 * Validation middleware for API requests
 */

const validateDiagramRequest = (req, res, next) => {
  const { code, language, diagramType } = req.body;

  // Check required fields
  if (!code) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'Code is required'
    });
  }

  if (!language) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'Language is required'
    });
  }

  if (!diagramType) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'Diagram type is required'
    });
  }

  // Validate code length
  if (typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid code',
      message: 'Code must be a non-empty string'
    });
  }

  if (code.length > 10000) {
    return res.status(400).json({
      error: 'Code too long',
      message: 'Code must be less than 10,000 characters'
    });
  }

  // Validate language
  const validLanguages = [
    'python', 'javascript', 'typescript', 'java', 'cpp', 
    'csharp', 'go', 'ruby', 'php', 'swift', 'kotlin', 'rust'
  ];

  if (!validLanguages.includes(language)) {
    return res.status(400).json({
      error: 'Invalid language',
      message: `Supported languages: ${validLanguages.join(', ')}`
    });
  }

  // Validate diagram type
  const validDiagramTypes = [
    'class', 'flowchart', 'sequence', 'state', 'er', 'gantt'
  ];

  if (!validDiagramTypes.includes(diagramType)) {
    return res.status(400).json({
      error: 'Invalid diagram type',
      message: `Supported diagram types: ${validDiagramTypes.join(', ')}`
    });
  }

  next();
};

const validateExportRequest = (req, res, next) => {
  const { mermaidCode, format } = req.body;

  // Check required fields
  if (!mermaidCode) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'Mermaid code is required'
    });
  }

  if (!format) {
    return res.status(400).json({
      error: 'Missing required field',
      message: 'Export format is required'
    });
  }

  // Validate mermaid code
  if (typeof mermaidCode !== 'string' || mermaidCode.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Mermaid code',
      message: 'Mermaid code must be a non-empty string'
    });
  }

  if (mermaidCode.length > 5000) {
    return res.status(400).json({
      error: 'Mermaid code too long',
      message: 'Mermaid code must be less than 5,000 characters'
    });
  }

  // Validate format
  const validFormats = ['svg', 'png', 'pdf'];
  if (!validFormats.includes(format)) {
    return res.status(400).json({
      error: 'Invalid export format',
      message: `Supported formats: ${validFormats.join(', ')}`
    });
  }

  next();
};

module.exports = {
  validateDiagramRequest,
  validateExportRequest
};
