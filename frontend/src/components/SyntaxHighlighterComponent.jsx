import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ChevronUp, ChevronDown, File, Copy, Check } from "lucide-react";

function SyntaxHighlighterComponent({
  open = false,
  codeString = "<h1>title</h1>",
  language = "html",
  filePath = "path/to/file",
}) {
  const [isCollapsed, setIsCollapsed] = useState(open);

  const languageMap = {
    js: "javascript",
    html: "htmlbars",
    css: "css",
    py: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    cs: "csharp",
    php: "php",
    sql: "sql",
    md: "markdown",
  };

  const highlightLanguage = languageMap[language] || "plaintext";

  return (
    <div className='overflow-hidden border border-gray-200 rounded-lg shadow-md'>
      <div className='flex items-center justify-between px-4 py-3 text-gray-200 bg-gray-800'>
        <div className='flex items-center space-x-2'>
          <File size={16} className='text-gray-400' />
          <span className='font-mono text-base truncate '>
            {filePath}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
     
          <button
            className='p-1.5 hover:bg-gray-700 rounded-md transition-colors'
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand code" : "Collapse code"}
            title={isCollapsed ? "Expand code" : "Collapse code"}
          >
            {isCollapsed ? (
              <ChevronDown
                size={16}
                className='text-gray-400 hover:text-white'
              />
            ) : (
              <ChevronUp size={16} className='text-gray-400 hover:text-white' />
            )}
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "max-h-0" : "max-h-screen"
        } overflow-scroll`}
      >
        <div className='relative'>
          <SyntaxHighlighter
            showLineNumbers={highlightLanguage !== "plaintext"}
            wrapLongLines = {language = 'plaintext'}
            language={highlightLanguage}
            style={vs2015}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              borderRadius: 0,
            }}
          >
            {codeString}
          </SyntaxHighlighter>

          <div className='absolute px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded-md bottom-2 right-2 opacity-70'>
            {highlightLanguage == 'htmlbars' ? 'HTML' : highlightLanguage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyntaxHighlighterComponent;
