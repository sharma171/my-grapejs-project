import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import "./grapes.css";
import customBlocks from './DraggableBlock';

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

    // Call the function to replace pre elements with CodeMirror instances
    replacePreWithCodeMirror();

    return () => editor.destroy();
  }, []);


  return <div ref={editorRef} />;
};

export default GrapeJsEditor;
