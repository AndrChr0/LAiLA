import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

function SyntaxHighlighterComponent({
  codeString = "<h1> title</h1>",
  language = "htmlbars",
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  console.log(SyntaxHighlighter.supportedLanguages); // showes all supported languages

  // TODO
  // add filepath to collapsed button/section
  // determin language based on file extension

  return (
    <div>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Show" : "Hide"}
      </button>
      {!isCollapsed && (
        <SyntaxHighlighter language={language} style={vs2015}>
          {codeString}
        </SyntaxHighlighter>
      )}
    </div>
  );
}

export default SyntaxHighlighterComponent;
