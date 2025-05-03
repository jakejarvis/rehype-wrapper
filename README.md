# rehype-wrapper

A simple [rehype](https://github.com/rehypejs/rehype) plugin that wraps the entire Markdown HTML output in a new div element. This is useful when you need to add custom styling, JavaScript functionality, or other attributes to the entire Markdown content as a unit.

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
    // <div class="my-content" id="content-wrapper" data-generated="true">
    //   <h1>Hello</h1>
    //   <p>This is a paragraph.</p>
    // </div>
  });
```

## Options

### `className`

Type: `string`  
Default: `'markdown'`

The CSS class name to apply to the wrapper div.

### `attributes`

Type: `Record<string, string | number | boolean>`  
Default: `{}`

Additional HTML attributes to add to the wrapper div.

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
      [rehypeWrapper, { className: 'prose lg:prose-xl dark:prose-invert' }]
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
          [require('rehype-wrapper'), { className: 'article-content' }]
        ],
      },
    },
  ],
};
```

## License

MIT
