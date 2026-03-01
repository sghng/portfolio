---
title: Fixing External Image Loading Issues in Hexo with `referrer` Tag
date: 2024-06-22
tag: [hexo, web, html]
permalink: hexo-ext-img/
---

When migrating older posts to new website system, the images stored in my
[Gitee](https://gitee.com) repo were not loading. Interestingly, these images
were accessible directly through the browser. My first thought was that the
loading process was timing out since Gitee's servers are in China. However, this
didn't make sense as the images loaded in a reasonable amount of time in
browser.

After an unsuccessful search in English, I switched to searching in Chinese.
This instantly led to the solution. There's a large [Hexo](https://hexo.io)
community in China and a specific Chinese term for this type of image storage,
"figure bed" (图床), which helped me find the solution efficiently

<!-- more -->

## A Quick Solution

My solution is inspired by these two blog posts:

- [Hexo博客不显示图床图片的解决方法](https://vgtiger.com/2021/05/20/Hexo博客不显示图床图片的解决方法/)
- [解决Hexo博客不能显示图床图片问题](https://hj24.life/posts/解决hexo博客不能显示图床图片问题/)

Follow these steps to diagnose the issue:

1. Serve Hexo site locally and view it in browser.
2. Open Console, which needs developer features of browser enabled.
3. Visit the post with the unloaded images.
4. Check the console for errors, which will look like this:

```txt
Failed to load resource: the server responded with a status of 403 (Forbidden)
```

This error is likely caused by anti-scraper settings on certain websites. To
resolve for this, include the following meta tag in the `<head>` of HTML file:

```html
<meta name="referrer" content="no-referrer" />
```

This tag prevents the browser from sending referrer information when accessing
external URLs. So, when the browser tries to fetch images from Gitee, Gitee
doesn’t recognize it as a non-user request.

Under my environment, adding this line to the beginning of Markdown file didn't
work out. However, with the theme injection feature provided by NexT, we can
achieve this by creating a custom file like this:

```njk
{# ./source/_date/head.njk #}
<meta name="referrer" content="no-referrer" />
```

The content of this file will be appended to the original `head.njk` template of
the them.

## Impacts on SEO

Given the built-in SEO configurations of the
[NexT theme](https://theme-next.js.org) relate to the `referrer` tag, it's
natural to wonder if altering this default value could negatively impact your
site's SEO performance.

The exact effect of setting `no-referrer` is unclear. However, there's a
potential for reduced tracking of traffic driven by links from your site, which
could affect how search engines evaluate your website's role on the internet.

## Not a Real Problem

But let's reconsider. if the `referrer` tag is used to track where users come
from, why would a request be forbidden simply because the referrer is a website?
It's possible that users clicked a link from another website, which doesn't
indicate scraping.

The issue might stem from serving the site locally for testing purposes. The
outgoing requests for images are referred by localhost:4000, which can seem
suspicious.

To test this hypothesis without deploying, create a tunnel. I used VSCode to
forward this port to a URL like `https://xxxxxxxx-4000.use.devtunnels.ms/`.
After reverting the previous changes and accessing the post again through this
tunneled address, the images loaded successfully!
