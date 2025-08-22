const express = require('express');
const { generateDiagram } = require('../services/huggingfaceService'); // Switched from OpenAI to Hugging Face
const { validateDiagramRequest } = require('../middleware/validation');

const router = express.Router();

/**
 * @route   POST /api/generate-diagram
 * @desc    Generate Mermaid diagram from code using Hugging Face AI
 * @access  Public
 * @body    { code: string, language: string, diagramType: string }
 */
router.post('/generate-diagram', validateDiagramRequest, async (req, res) => {
  try {
    const { code, language, diagramType } = req.body;

    console.log('Generating diagram for:', {
      language,
      diagramType,
      codeLength: code.length
    });

    const mermaidCode = await generateDiagram(code, language, diagramType);

    if (!mermaidCode) {
      return res.status(500).json({
        error: 'Failed to generate diagram',
        message: 'The AI service returned an empty response'
      });
    }

    res.json({
      success: true,
      mermaidCode,
      message: 'Diagram generated successfully'
    });

  } catch (error) {
    console.error('Diagram generation error:', error);

    // Handle Hugging Face specific errors
    if (error.message.includes('Invalid Hugging Face API key') || error.message.includes('401')) {
      return res.status(401).json({
        error: 'Authentication failed',
        message: 'Invalid Hugging Face API key. Please check your configuration.'
      });
    }

    if (error.message.includes('rate limit') || error.message.includes('quota') || error.message.includes('429')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Hugging Face API rate limit reached. Please try again later.'
      });
    }

    if (error.message.includes('loading') || error.message.includes('Model')) {
      return res.status(503).json({
        error: 'Service temporarily unavailable',
        message: 'Hugging Face model is loading. Please try again in a few moments.'
      });
    }

    if (error.code === 'ENOTFOUND') {
      return res.status(503).json({
        error: 'Service unavailable',
        message: 'Cannot connect to Hugging Face API. Please check your internet connection.'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to generate diagram'
    });
  }
});

/**
 * @route   GET /api/diagram-types
 * @desc    Get available diagram types
 * @access  Public
 */
router.get('/diagram-types', (req, res) => {
  const diagramTypes = [
    { value: 'class', label: 'Class Diagram', description: 'UML class relationships and structure' },
    { value: 'flowchart', label: 'Flowchart', description: 'Control flow and program logic' },
    { value: 'sequence', label: 'Sequence Diagram', description: 'Method interactions and timing' },
    { value: 'state', label: 'State Diagram', description: 'State transitions and behavior' },
    { value: 'er', label: 'ER Diagram', description: 'Entity-relationship database modeling' },
    { value: 'gantt', label: 'Gantt Chart', description: 'Project timeline and dependencies' }
  ];

  res.json(diagramTypes);
});

/**
 * @route   GET /api/languages
 * @desc    Get supported programming languages
 * @access  Public
 */
router.get('/languages', (req, res) => {
  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'rust', label: 'Rust' }
  ];

  res.json(languages);
});

module.exports = router;
