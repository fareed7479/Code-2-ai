# Code-to-Diagram AI 🧩

An AI-powered tool that converts source code snippets into visual diagrams using Hugging Face Inference API and Mermaid.js.

## Features

- ✅ Supports multiple programming languages (Python & JavaScript initially)
- ✅ Generates UML class diagrams, flowcharts, and sequence diagrams
- ✅ Real-time preview with Mermaid.js rendering
- ✅ Export options: SVG, PNG, Markdown embed
- ✅ Clean, responsive UI with TailwindCSS
- ✅ Uses free Hugging Face Inference API with Mistral-7B model

## Tech Stack

- **Frontend**: React + TailwindCSS + Mermaid.js
- **Backend**: Node.js + Express
- **AI Engine**: Hugging Face Inference API (mistralai/Mistral-7B-Instruct-v0.2)
- **Code Editor**: Monaco Editor

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Hugging Face API key (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd code-to-diagram-ai
   npm run install-all
   ```
3. Set up environment variables:
   ```bash
   cp backend/.env.example backend/.env
   ```
   Add your Hugging Face API key to `backend/.env` as `HF_API_KEY=your_huggingface_token_here`

4. Start the development servers:
   ```bash
   npm run dev
   ```

### Usage

1. Open http://localhost:3000 in your browser
2. Paste your code snippet
3. Select programming language and diagram type
4. Click "Generate Diagram"
5. View the generated diagram and export as needed

## Project Structure

```
code-to-diagram-ai/
├── frontend/          # React application
├── backend/           # Express API server
├── shared/            # Shared utilities
└── README.md
```

## API Endpoints

- `POST /api/generate-diagram` - Generate diagram from code
- `POST /api/export/:format` - Export diagram in various formats

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
# Code-2-ai
