// GrapeJsEditor.js
import React, { useEffect, useRef } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import "./grapes.css";
import customBlocks from './DraggableBlock';
const type = 'link';
export default class ComponentLink extends ComponentText {
  get defaults() {
    return {
      ...super.defaults,
      type,
      tagName: 'a',
      traits: ['title', 'href', 'target'],
    };
  }
  static isComponent(el, opts = {}) {
    let result;
    if (el.tagName.toLowerCase() === 'a') {
      const textTags = opts.textTags || [];
      result = { type, editable: false };
      const children = el.childNodes;
      const len = children.length;
      if (!len) delete result.editable;
      Array.prototype.forEach.call(children, child => {
        const { tagName } = child;
        if (
          (child.nodeType == 3 && child.textContent.trim() !== '') ||
          (tagName && textTags.indexOf(tagName.toLowerCase()) >= 0)
        ) {
          delete result.editable;
        }
      });
    }
    return result;
  }
}



const GrapeJsEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      // Other GrapeJS configurations...
    });

    // Register custom blocks with the Block Manager
    customBlocks.forEach(block => {
      console.log('Block attributes:', block.attributes);
      console.log('Block styles:', block.styles);
      editor.BlockManager.add(block.id, {
        label: block.label,
        content: block.content,
        attributes: block.attributes || {}, // Ensure default empty object if attributes are not provided
        category: 'Structure', // Specify the category for the blocks
        // Optionally, you can define styles for the block
        styles: block.styles,
      });
    });

    return () => editor.destroy();
  }, []);

  return <div ref={editorRef} />;
};

export default GrapeJsEditor;
