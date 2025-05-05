import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeWrapper from './index';

describe('rehype-wrapper', () => {
  const createProcessor = (options?: Parameters<typeof rehypeWrapper>[0]) => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeWrapper, options)
      .use(rehypeStringify);
  };

  const simpleMarkdown = '# Hello\n\nThis is a test.';

  test('wraps content with default tag (div) and class name', async () => {
    const processor = createProcessor();
    const result = await processor.process(simpleMarkdown);
    
    expect(result.toString()).toMatch(/<div class="markdown-wrapper">/);
    expect(result.toString()).toMatch(/<h1>Hello<\/h1>/);
    expect(result.toString()).toMatch(/<p>This is a test.<\/p>/);
    expect(result.toString()).toMatch(/<\/div>$/);
  });

  test('uses custom class name', async () => {
    const processor = createProcessor({ className: 'custom-wrapper' });
    const result = await processor.process(simpleMarkdown);
    
    expect(result.toString()).toMatch(/<div class="custom-wrapper">/);
  });

  test('uses custom tag name', async () => {
    const processor = createProcessor({ tagName: 'section' });
    const result = await processor.process(simpleMarkdown);
    
    expect(result.toString()).toMatch(/<section class="markdown-wrapper">/);
    expect(result.toString()).toMatch(/<\/section>$/);
  });

  test('uses custom tag name and class name together', async () => {
    const processor = createProcessor({ 
      tagName: 'article',
      className: 'content-article' 
    });
    const result = await processor.process(simpleMarkdown);
    
    expect(result.toString()).toMatch(/<article class="content-article">/);
    expect(result.toString()).toMatch(/<\/article>$/);
  });

  test('adds additional attributes', async () => {
    const processor = createProcessor({
      className: 'test-wrapper',
      tagName: 'main',
      attributes: {
        id: 'content',
        'data-test': 'true',
        'aria-label': 'Content'
      }
    });
    
    const result = await processor.process(simpleMarkdown);
    const html = result.toString();
    
    expect(html).toMatch(/<main class="test-wrapper" id="content" data-test="true" aria-label="Content">/);
    expect(html).toMatch(/<\/main>$/);
  });
});
