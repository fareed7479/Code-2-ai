# Getting Started with Code-to-Diagram AI

## Quick Setup Guide

### Prerequisites
- Node.js (v16 or higher)
- Hugging Face API account and API key (free tier available)
- Git (optional)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If using Git
   git clone <repository-url>
   cd code-to-diagram-ai
   ```

2. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies  
   cd ../frontend && npm install
   ```

3. **Configure Environment Variables**
   ```bash
   # Copy the example environment file
   cd ../backend
   cp .env.example .env
   
   # Edit .env file and add your Hugging Face API key
   # HF_API_KEY=your_huggingface_token_here
   ```

4. **Start the Development Servers**
   ```bash
   # From the project root
   npm run dev
   ```
   
   This will start:
   - Backend server on http://localhost:5000
   - Frontend React app on http://localhost:3000

### Testing the Application

1. **Open your browser** and go to http://localhost:3000

2. **Try the sample code:**
   - Copy the code from `examples/sample-code.py`
   - Paste it into the code editor
   - Select "Python" as the language
   - Select "Class Diagram" as the diagram type
   - Click "Generate Diagram"

3. **View the results:**
   - The AI will analyze your code
   - A UML class diagram will be generated using Mermaid.js
   - You can export the diagram as SVG or PNG

### API Key Setup

1. **Get a Hugging Face API Key:**
   - Visit https://huggingface.co/settings/tokens
   - Create a new token with "read" permissions
   - Copy the token to your clipboard

2. **Configure the application:**
   - Open `backend/.env` file
   - Replace `your_huggingface_token_here` with your actual API token
   - Save the file

### Troubleshooting

**Common Issues:**

1. **"Hugging Face API key not configured"**
   - Make sure you've set the HF_API_KEY in backend/.env
   - Restart the backend server after changing the .env file

2. **"Failed to generate diagram"**
   - Check your internet connection
   - Verify your Hugging Face API key is valid
   - The model might be loading - wait a moment and try again

3. **Frontend won't start**
   - Make sure you've installed frontend dependencies: `cd frontend && npm install`

4. **Backend won't start**
   - Check if port 5000 is available
   - Verify backend dependencies: `cd backend && npm install`

### Development Commands

```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend  
npm run dev:frontend

# Build for production
npm run build

# Start production server
npm start
```

### Sample Code Examples

The project includes sample code files in the `examples/` directory:

- `sample-code.py` - Python class hierarchy for UML testing
- `sample-code.js` - JavaScript functions for flowchart testing

### Next Steps

1. **Explore different diagram types:**
   - Class diagrams for object-oriented code
   - Flowcharts for procedural logic
   - Sequence diagrams for method interactions

2. **Try different programming languages:**
   - Python, JavaScript, Java, C++, and more

3. **Export your diagrams:**
   - SVG for web use
   - PNG for sharing
   - PDF for documentation (coming soon)

### Support

If you encounter issues:
1. Check the browser console for errors
2. Check the backend server logs
3. Verify your Hugging Face API key is working
4. Ensure all dependencies are installed

Enjoy transforming your code into beautiful diagrams! 🎨
