---
title: Eliminate Redundant Space at CJK Line Breaks in Hexo
date: 2024-06-21
tag: [hexo, cjk, markdown, render]
permalink: hexo-cjk/
---

What a longstanding issue in the history of web! Traditionally, when rendering
HTML, a soft line break would be treated as a space. This makes sense for
European languages consist of words, but not for CJK languages -- there are no
spaces in CJK languages!

## Solution

Here are three links that lead to the solution to this issue in Hexo:

- hexo.io/news/2019/12/15/hexo-renderer-markdown-it-4
- github.com/hexojs/hexo-renderer-markdown-it
- github.com/markdown-it/markdown-it-cjk-breaks

You just need to follow two steps:

1. Replace default `marked` renderer with `markdown-it`

   ```sh
   npm r --save hexo-renderer-marked
   npm i --save hexo-renderer-markdown-it
   ```

2. Enable the CJK breaks plugin:

   ```yaml
   markdown:
     plugin: [markdown-it-cjk-breaks]
   ```

<!-- more -->

With the `cjk-breaks` plugin enabled, redundant spaces are eliminated.
~~However, you might notice redundant **line breaks** at certain places between
CJK and English characters (where spaces are inserted in source code,) which can
be even more visually distracting.~~

{% note warning no-icon %}

It turns out this issue is due to a slight difference in the YAML schema between
`marked` and `markdown-it`. When switching to `markdown-it`, the `breaks` key
should be placed under `render`.

```yaml
markdown:
  render:
    breaks: false
```

{% endnote %}

{% note warning %}

As a side note, the
[hexo-filter-fix-cjk-spacing](https://www.npmjs.com/package/hexo-filter-fix-cjk-spacing)
plugin suggested by some posts isn't functioning in my environment.

{% endnote %}

## More on `markdown-it`

Markdown-it is considered faster than Marked. Additionally, the current
`hexo-renderer-marked@6.3.0` has two deprecated dependencies:

```npm
npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead
```

Another reason to migrate is Markdown-it's support for various advanced syntax
through several plugins, including `markdown-it-emoji`, which would be a great
alternative to `hexo-filter-emoji`.

## Conclusion

By following these steps, you can ensure your CJK text is displayed correctly
without unnecessary spaces or line breaks, all while benefiting from a faster
and more flexible Markdown renderer. Happy blogging!

## Sample Text: _Da Xue_ ("The Great Learning")

> 大学之道，在明明德，在亲民，在止于至善。知止而后有定；定而后能静；静而后能安；
> 安而后能虑；虑而后能得。物有本末，事有终始。知所先后，则近道矣。古之欲明明德于
> 天下者，先治其国；欲治其国者，先齐其家；欲齐其家者，先修其身；欲修其身者，先正
> 其心；欲正其心者，先诚其意；欲诚其意者，先致其知；致知在格物。物格而后知至；知
> 至而后意诚；意诚而后心正；心正而后身修；身修而后家齐；家齐而后国治；国治而后天
> 下平。自天子以至于庶人，壹是皆以修身为本。其本乱而末治者，否矣。其所厚者薄，而
> 其所薄者厚，未之有也。此谓知本，此谓知之至也。
