import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeWrapper from '.';

describe('rehype-wrapper', () => {
  const createProcessor = (options?: Parameters<typeof rehypeWrapper>[0]) => {
    return unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeWrapper, options)
      .use(rehypeStringify);
  };

  const simpleMarkdown = '# Hello\n\nThis is a test.';

  test('wraps content with default class name', async () => {
    const processor = createProcessor();
    const result = await processor.process(simpleMarkdown);
    
    expect(result.toString()).toMatch(/<div class="markdown">/);
    expect(result.toString()).toMatch(/<h1>Hello<\/h1>/);
    expect(result.toString()).toMatch(/<p>This is a test.<\/p>/);
    expect(result.toString()).toMatch(/<\/div>$/);
  });

  test('uses custom class name', async () => {
    const processor = createProcessor({ className: 'custom-wrapper' });
    const result = await processor.process(simpleMarkdown);
    
    expect(result.toString()).toMatch(/<div class="custom-wrapper">/);
  });

  test('adds additional attributes', async () => {
    const processor = createProcessor({
      className: 'test-wrapper',
      attributes: {
        id: 'content',
        'data-test': 'true',
        'aria-label': 'Content'
      }
    });
    
    const result = await processor.process(simpleMarkdown);
    const html = result.toString();
    
    expect(html).toMatch(/<div class="test-wrapper" id="content" data-test="true" aria-label="Content">/);
  });
});
