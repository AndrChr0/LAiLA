import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ChevronUp, ChevronDown, File, Copy, Check } from "lucide-react";

function SyntaxHighlighterComponent({
  codeString = "<h1>title</h1>",
  language = "html",
  filePath = "path/to/file",
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [copied, setCopied] = useState(false);

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

  // copy contents
  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='rounded-lg overflow-hidden border border-gray-200 shadow-md my-4'>
      <div className='flex justify-between items-center bg-gray-800 text-gray-200 px-4 py-3'>
        <div className='flex items-center space-x-2'>
          <File size={16} className='text-gray-400' />
          <span className='font-mono text-base truncate max-w-xs md:max-w-md'>
            {filePath}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <button
            className='p-1.5 hover:bg-gray-700 rounded-md transition-colors'
            onClick={copyToClipboard}
            aria-label='Copy code'
            title='Copy code'
          >
            {copied ? (
              <Check size={16} className='text-green-400' />
            ) : (
              <Copy size={16} className='text-gray-400 hover:text-white' />
            )}
          </button>
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
        } overflow-hidden`}
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

          <div className='absolute bottom-2 right-2 bg-gray-800 text-xs text-gray-400 px-2 py-1 rounded-md opacity-70'>
            {highlightLanguage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SyntaxHighlighterComponent;
