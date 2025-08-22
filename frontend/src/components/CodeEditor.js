import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, language }) => {
  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const getLanguageForEditor = (lang) => {
    const languageMap = {
      python: 'python',
      javascript: 'javascript',
      java: 'java',
      cpp: 'cpp',
      csharp: 'csharp',
      typescript: 'typescript',
      go: 'go',
      ruby: 'ruby',
      php: 'php',
    };
    return languageMap[language] || 'plaintext';
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Editor
        height="400px"
        language={getLanguageForEditor(language)}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          scrollbar: {
            useShadows: false,
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
        theme="vs-light"
      />
    </div>
  );
};

export default CodeEditor;
