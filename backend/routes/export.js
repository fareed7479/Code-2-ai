const express = require('express');
const { exportDiagram } = require('../services/exportService');
const { validateExportRequest } = require('../middleware/validation');

const router = express.Router();

/**
 * @route   POST /api/export
 * @desc    Export diagram in various formats (SVG, PNG, PDF)
 * @access  Public
 * @body    { mermaidCode: string, format: string }
 */
router.post('/export', validateExportRequest, async (req, res) => {
  try {
    const { mermaidCode, format } = req.body;

    console.log('Export request received:', {
      format,
      mermaidCodeLength: mermaidCode.length
    });

    const result = await exportDiagram(mermaidCode, format);

    if (!result) {
      return res.status(500).json({
        error: 'Export failed',
        message: 'Failed to generate export file'
      });
    }

    // Set appropriate headers based on format
    const contentType = getContentType(format);
    const filename = `diagram.${format}`;

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Send the file
    if (format === 'svg') {
      res.send(result);
    } else {
      res.send(Buffer.from(result, 'base64'));
    }

  } catch (error) {
    console.error('Export error:', error);

    if (error.message.includes('Invalid Mermaid syntax')) {
      return res.status(400).json({
        error: 'Invalid diagram',
        message: 'The Mermaid code contains syntax errors and cannot be exported'
      });
    }

    res.status(500).json({
      error: 'Export failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to export diagram'
    });
  }
});

/**
 * @route   GET /api/export/formats
 * @desc    Get available export formats
 * @access  Public
 */
router.get('/export/formats', (req, res) => {
  const formats = [
    { 
      value: 'svg', 
      label: 'SVG', 
      description: 'Scalable Vector Graphics - Best for web and editing',
      mimeType: 'image/svg+xml'
    },
    { 
      value: 'png', 
      label: 'PNG', 
      description: 'Portable Network Graphics - Best for sharing and embedding',
      mimeType: 'image/png'
    },
    { 
      value: 'pdf', 
      label: 'PDF', 
      description: 'Portable Document Format - Best for printing and documentation',
      mimeType: 'application/pdf'
    }
  ];

  res.json(formats);
});

/**
 * Helper function to get content type for different formats
 */
function getContentType(format) {
  const contentTypes = {
    svg: 'image/svg+xml',
    png: 'image/png',
    pdf: 'application/pdf'
  };

  return contentTypes[format] || 'application/octet-stream';
}

module.exports = router;
