import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import DiagramViewer from './components/DiagramViewer';
import ControlPanel from './components/ControlPanel';
import Header from './components/Header';
import { Code2, Brain, Download } from 'lucide-react';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [diagramType, setDiagramType] = useState('class');
  const [mermaidCode, setMermaidCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateDiagram = async () => {
    if (!code.trim()) {
      setError('Please enter some code first');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-diagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          diagramType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate diagram');
      }

      const data = await response.json();
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      setError(err.message || 'Failed to generate diagram');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async (format) => {
    if (!mermaidCode) return;

    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mermaidCode,
          format,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `diagram.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      setError('Failed to export diagram');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Code Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Code Input
              </h2>
              <ControlPanel
                language={language}
                setLanguage={setLanguage}
                diagramType={diagramType}
                setDiagramType={setDiagramType}
                onGenerate={handleGenerateDiagram}
                isGenerating={isGenerating}
              />
              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
              />
            </div>
          </div>

          {/* Right Panel - Diagram Output */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-Generated Diagram
              </h2>
              {mermaidCode && (
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => handleExport('svg')}
                    className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export SVG
                  </button>
                  <button
                    onClick={() => handleExport('png')}
                    className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export PNG
                  </button>
                </div>
              )}
              <DiagramViewer mermaidCode={mermaidCode} />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
