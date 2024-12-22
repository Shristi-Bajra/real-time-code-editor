import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/theme/darcula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

const Editor = () => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      const textarea = document.getElementById("realtimeEditor");
      editorInstance.current = Codemirror.fromTextArea(textarea, {
        mode: { name: "javascript", json: true },
        theme: "darcula",
        autoCloseTag: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });
    }
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;

// Aternate

// import React, { useEffect } from "react";
// import Codemirror from "codemirror";
// import 'codemirror/theme/darcula.css'
// import 'codemirror/mode/javascript/javascript'
// import 'codemirror/addon/edit/closetag'
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/lib/codemirror.css'

// const Editor = () => {
//   useEffect(() => {
//     async function init() {
//       Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
//         mode: { name: "javascript", json: true },
//         theme: 'dracula',
//         autoCloseTag: true,
//         autoCloseBrackets: true,
//         lineNumbers: true,
//       });
//     }
//     init();
//   }, []);
//   return <textarea id="realtimeEditor"></textarea>;
// };

// export default Editor;
