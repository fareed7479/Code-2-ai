// Gemini Inference API service - Replaces Hugging Face service
// Uses Gemini 2.5 Pro model for code-to-diagram generation

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

/**
 * Generate Mermaid diagram code from source code using Gemini API
 * @param {string} code - The source code to analyze
 * @param {string} language - Programming language of the code
 * @param {string} diagramType - Type of diagram to generate (class, flowchart, sequence, etc.)
 * @returns {Promise<string>} - Mermaid.js diagram code
 */
const generateDiagram = async (code, language, diagramType) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = createPrompt(code, language, diagramType);

    console.log('Generated prompt:', prompt);
    console.log('Sending request to Gemini API...');

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();

    const textResponse =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

    console.log(result);

    if (!textResponse) {
      throw new Error('Unexpected response format or empty text from Gemini API');
    }

    // Clean up the response - remove markdown code blocks and extra text
    let mermaidCode = textResponse
      .replace(/```mermaid\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^.*?(classDiagram|flowchart|sequenceDiagram|stateDiagram|erDiagram|gantt)/s, '$1')
      .trim();

    console.log('Generated Mermaid code:', mermaidCode);
    return mermaidCode;

  } catch (error) {
    console.error('Gemini API error:', error);

    // Handle specific Gemini errors
    if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      throw new Error('Invalid Gemini API key. Please check your configuration.');
    }

    throw error;
  }
};

/**
 * Create the prompt for Gemini based on code, language, and diagram type
 */
const createPrompt = (code, language, diagramType) => {
  const diagramTypeInstructions = {
    class: `Generate a UML class diagram showing classes, their attributes, methods, and relationships (inheritance, associations, dependencies). Focus on the class structure and hierarchy.`,
    flowchart: `Generate a flowchart showing the control flow and program logic. Include decision points, processes, start/end points, and the flow of execution.`,
    sequence: `Generate a sequence diagram showing method interactions and message passing between objects. Include lifelines, messages, and timing.`,
    state: `Generate a state diagram showing state transitions and behavior. Include states, transitions, and events.`,
    er: `Generate an entity-relationship diagram showing database entities, their attributes, and relationships.`,
    gantt: `Generate a Gantt chart showing project timeline, tasks, and dependencies.`,
  };

  const instruction = diagramTypeInstructions[diagramType] || `Generate a ${diagramType} diagram for this code.`;

  return `
Analyze the following ${language} code and generate a ${diagramType} diagram using Mermaid.js syntax.

${instruction}

Code:
${code}

Generate ONLY the Mermaid.js code without any additional explanation or text.
  `;
};

/**
 * Validate if the generated Mermaid code is syntactically correct
 * This is a basic validation - actual parsing would require mermaid.parse()
 */
const validateMermaidSyntax = (mermaidCode) => {
  if (!mermaidCode) return false;

  const validStarts = [
    'classDiagram',
    'flowchart',
    'sequenceDiagram',
    'stateDiagram',
    'erDiagram',
    'gantt',
  ];

  const firstLine = mermaidCode.split('\n')[0].trim();
  return validStarts.some(start => firstLine.startsWith(start));
};

module.exports = {
  generateDiagram,
  validateMermaidSyntax,
};
