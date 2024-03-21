import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import "./grapes.css";
import customBlocks from './DraggableBlock';
import { Controlled as CodeMirror } from 'react-codemirror2'; // Import Controlled component from react-codemirror2
import 'codemirror/lib/codemirror.css'; // Import CodeMirror styles
import 'codemirror/theme/material.css'; // Import a CodeMirror theme of your choice
import 'codemirror/mode/javascript/javascript'; // Import the JavaScript mode
import Prism from 'prismjs'; // Import Prism.js
import 'prismjs/themes/prism.css'; // Import Prism.js theme CSS file

const GrapeJsEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      // Other GrapeJS configurations...
    });

    // Register custom blocks with the Block Manager
    customBlocks.forEach(block => {
      editor.BlockManager.add(block.id, {
        label: block.label,
        content: block.content,
        attributes: block.attributes || {}, // Ensure default empty object if attributes are not provided
        category: 'Structure', // Specify the category for the blocks
        styles: block.styles, // Optionally, you can define styles for the block
        tagName: block.tagName,
        type: block.type,
        components: block.components,
      });
    });

    // Function to replace pre elements with CodeMirror instances and apply syntax highlighting
    const replacePreWithCodeMirror = () => {
      const codeBlocks = editorRef.current.querySelectorAll('pre');
      codeBlocks.forEach((codeBlock) => {
        const codeMirrorInstance = CodeMirror.fromTextArea(codeBlock, {
          mode: 'javascript',
          theme: 'material', // Change the theme as desired
          lineNumbers: true,
        });

        // Apply Prism.js syntax highlighting to CodeMirror instance
        Prism.highlightElement(codeMirrorInstance.getWrapperElement());
      });
    };

    // Call the function to replace pre elements with CodeMirror instances
    replacePreWithCodeMirror();

    return () => editor.destroy();
  }, []);

  return <div ref={editorRef} />;
};

export default GrapeJsEditor;
