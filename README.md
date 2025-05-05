# rehype-wrapper

A simple [rehype](https://github.com/rehypejs/rehype) plugin that wraps the entire Markdown HTML output in a new container element. This is useful when you need to add custom styling, JavaScript functionality, or other attributes to the entire Markdown content as a unit.

## Installation

```bash
npm install rehype-wrapper
# or
yarn add rehype-wrapper
# or
pnpm add rehype-wrapper
```

## Usage

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeWrapper from 'rehype-wrapper';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeWrapper, {
    className: 'my-content',
    tagName: 'article',
    attributes: {
      id: 'content-wrapper',
      'data-generated': 'true'
    }
  })
  .use(rehypeStringify);

const markdown = '# Hello\n\nThis is a paragraph.';

processor.process(markdown)
  .then((file) => {
    console.log(file.toString());
    // <article class="my-content" id="content-wrapper" data-generated="true">
    //   <h1>Hello</h1>
    //   <p>This is a paragraph.</p>
    // </article>
  });
```

## Options

### `className`

Type: `string`  
Default: `'markdown'`

The CSS class name to apply to the wrapper element.

### `tagName`

Type: `string`  
Default: `'div'`

The HTML tag to use for the wrapper element. Can be any valid HTML element like `'div'`, `'section'`, `'article'`, `'main'`, etc.

### `attributes`

Type: `Record<string, string | number | boolean>`  
Default: `{}`

Additional HTML attributes to add to the wrapper element.

## Examples

### Basic usage with default options

```typescript
.use(rehypeWrapper)
```

Output:
```html
<div class="markdown">
  <!-- Markdown content -->
</div>
```

### Using a semantic HTML tag

```typescript
.use(rehypeWrapper, { tagName: 'section' })
```

Output:
```html
<section class="markdown">
  <!-- Markdown content -->
</section>
```

### Blog article with semantic HTML

```typescript
.use(rehypeWrapper, {
  tagName: 'article',
  className: 'blog-post',
  attributes: {
    'itemscope': true,
    'itemtype': 'http://schema.org/BlogPosting'
  }
})
```

Output:
```html
<article class="blog-post" itemscope itemtype="http://schema.org/BlogPosting">
  <!-- Markdown content -->
</article>
```

## Integration with frameworks

### Next.js with MDX

```typescript
// next.config.js
import rehypeWrapper from 'rehype-wrapper';

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [rehypeWrapper, { 
        tagName: 'article',
        className: 'prose lg:prose-xl dark:prose-invert' 
      }]
    ],
  },
});

export default withMDX(nextConfig);
```

### Gatsby

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        rehypePlugins: [
          [require('rehype-wrapper'), { 
            tagName: 'main',
            className: 'article-content' 
          }]
        ],
      },
    },
  ],
};
```

## License

MIT
