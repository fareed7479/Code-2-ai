const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate Mermaid diagram code from source code using GPT-4
 * @param {string} code - The source code to analyze
 * @param {string} language - Programming language of the code
 * @param {string} diagramType - Type of diagram to generate (class, flowchart, sequence, etc.)
 * @returns {Promise<string>} - Mermaid.js diagram code
 */
const generateDiagram = async (code, language, diagramType) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = createPrompt(code, language, diagramType);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert software architect and diagram specialist. Your task is to analyze source code and generate accurate Mermaid.js diagram code.

IMPORTANT RULES:
1. Return ONLY the Mermaid.js code, no explanations, no markdown formatting, no additional text
2. Ensure the Mermaid syntax is 100% valid and can be rendered directly
3. Focus on the most important structural elements
4. Keep the diagram clean and readable
5. Use appropriate Mermaid syntax for the requested diagram type

Common Mermaid diagram types:
- classDiagram: for UML class diagrams
- flowchart: for control flow and logic
- sequenceDiagram: for method interactions
- stateDiagram: for state transitions
- erDiagram: for entity-relationship diagrams
- gantt: for project timelines

Example response for class diagram:
classDiagram
    class Animal {
        +speak()
    }
    class Dog {
        +speak()
    }
    Animal <|-- Dog`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.3,
      top_p: 1,
    });

    const mermaidCode = response.choices[0]?.message?.content?.trim();
    
    if (!mermaidCode) {
      throw new Error('Empty response from OpenAI');
    }

    // Clean up the response - remove any markdown code blocks
    const cleanedCode = mermaidCode
      .replace(/```mermaid\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();

    console.log('Generated Mermaid code:', cleanedCode);
    return cleanedCode;

  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

/**
 * Create the prompt for GPT-4 based on code, language, and diagram type
 */
const createPrompt = (code, language, diagramType) => {
  const diagramTypeInstructions = {
    class: `Generate a UML class diagram showing classes, their attributes, methods, and relationships (inheritance, associations, dependencies). Focus on the class structure and hierarchy.`,
    flowchart: `Generate a flowchart showing the control flow and program logic. Include decision points, processes, start/end points, and the flow of execution.`,
    sequence: `Generate a sequence diagram showing method interactions and message passing between objects. Include lifelines, messages, and timing.`,
    state: `Generate a state diagram showing state transitions and behavior. Include states, transitions, and events.`,
    er: `Generate an entity-relationship diagram showing database entities, their attributes, and relationships.`,
    gantt: `Generate a Gantt chart showing project timeline, tasks, and dependencies.`
  };

  const instruction = diagramTypeInstructions[diagramType] || `Generate a ${diagramType} diagram for this code.`;

  return `
Analyze the following ${language} code and generate a ${diagramType} diagram using Mermaid.js syntax.

${instruction}

Code:
${code}

Generate ONLY the Mermaid.js code without any additional explanation or text.`;
};

/**
 * Validate if the generated Mermaid code is syntactically correct
 * This is a basic validation - actual parsing would require mermaid.parse()
 */
const validateMermaidSyntax = (mermaidCode) => {
  if (!mermaidCode) return false;
  
  // Basic validation - check if it starts with a valid diagram type
  const validStarts = [
    'classDiagram',
    'flowchart',
    'sequenceDiagram',
    'stateDiagram',
    'erDiagram',
    'gantt'
  ];

  const firstLine = mermaidCode.split('\n')[0].trim();
  return validStarts.some(start => firstLine.startsWith(start));
};

module.exports = {
  generateDiagram,
  validateMermaidSyntax
};
