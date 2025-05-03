import type { Plugin } from 'unified';
import type { Parent } from 'unist';
import type { Element } from 'hast';

/**
 * Options for the rehype-wrapper plugin
 */
interface RehypeWrapperOptions {
  /** CSS class name for the wrapper div */
  className?: string;
  /** Additional attributes to add to the wrapper div */
  attributes?: Record<string, string | number | boolean>;
}

/**
 * A rehype plugin that wraps the entire markdown HTML in a new div
 * 
 * @param options - Configuration options
 * @returns The rehype transformer
 */
const rehypeWrapper: Plugin<[RehypeWrapperOptions?], Parent> = (options = {}) => {
  const className = options.className || 'markdown';
  const attributes = options.attributes || {};
  
  return (tree: Parent) => {
    // Get the children from the original tree
    const children = [...tree.children];
    
    // Create attributes for the wrapper element
    const wrapperAttributes: Record<string, string | number | boolean | string[]> = {
      className,
      ...attributes
    };
    
    // Create the wrapper element
    const wrapper: Element = {
      type: 'element',
      tagName: 'div',
      properties: wrapperAttributes,
      children: children as Element["children"],
      position: tree.position
    };
    
    // Replace the tree's children with the wrapper
    tree.children = [wrapper];
    
    return tree;
  };
};

export default rehypeWrapper;
