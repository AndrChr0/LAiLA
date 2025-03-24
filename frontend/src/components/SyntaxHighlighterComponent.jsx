import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function SyntaxHighlighterComponent() {
  const codeString = "(num) => num + 1";
  console.log(SyntaxHighlighter.supportedLanguages);
  return (
    <div className='w-1/2'>
      <SyntaxHighlighter language='javascript' style={docco}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

export default SyntaxHighlighterComponent;
