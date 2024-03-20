import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import "./grapes.css";
import customBlocks from './DraggableBlock';
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

    // Function to apply Prism.js syntax highlighting
    const applySyntaxHighlighting = () => {
      const codeBlocks = editorRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((codeBlock) => {
        Prism.highlightElement(codeBlock);
      });
    };

    // Call the function to apply syntax highlighting
    applySyntaxHighlighting();

    return () => editor.destroy();
  }, []);

  return <div ref={editorRef} />;
};

export default GrapeJsEditor;
