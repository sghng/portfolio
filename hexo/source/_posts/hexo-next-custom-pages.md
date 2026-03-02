---
title:
  "Hexo + NexT Tips: Simplified Custom Pages Config that Doesn't Break Things"
date: 2024-06-21
tag: [blog, website, hexo, next, yaml, ssg]
description:
  A simplified configuration for regular custom pages, and custom pages with
  single level header tabs.
permalink: hexo-next-custom-pages/
---

## Regular custom pages

[NexT documentation](https://theme-next.js.org/docs/theme-settings/custom-pages)
suggests creating a directory for each page and putting the content in the
`index.md` file under it:

```yaml
# _config.next.yml
menu:
  page: /page/
```

The directory structure looks like:

```txt
.
└── hexo-site/
    ├── source/
    │   ├── _posts/
    │   │   └── ...
    │   └── page/
    │       └── index.md
    └── ...
```

With this setting, both leading and trailing slashes in `_config.next/yml` are
**optional**.

A more elegant way to achieve the same behavior is:

<!-- more -->

```txt
.
└── hexo-site/
    ├── source/
    │   ├── _posts/
    │   │   └── ...
    │   └── page.md
    └── ...
```

There's no need for subdirectory and `index.md`; simply put `page.md` under the
`source` directory. The configuration in `_config.next.yml` stays the same.

## Custom pages with header tabs

[NexT Docs](https://theme-next.js.org/docs/) achieves a two-level header tabs
style with the following configuration:

```yml
# _config.next.yml
menu:
  home: / || fa fa-bell
  Docs:
    default: /docs/ || fa fa-book
    Getting Started:
      default: /getting-started/ || fa fa-flag
      Installation: /installation.html || fa fa-download
      Deployment: /deployment.html || fa fa-upload
      # ...
    Theme Settings:
      default: /theme-settings/ || fa fa-star
      # ...
    # ...
```

The directory structure looks like this:

```txt
.
└── theme-next-docs/
    ├── source/
    │   ├── _posts/
    │   │   └── ...
    │   └── docs/
    │       ├── getting-started/
    │       │   ├── index.md
    │       │   ├── installation.md
    │       │   ├── deployment.md
    │       │   └── ...
    │       ├── theme-settings/
    │       │   └── ...
    │       └── ...
    └── ...
```

Apparently the authors used path of generated `.html` files in the `public`
directory to access the tabs. The annoyance of having several subdirectories
with only `index.md` inside arises again when we only need a single level of
header tabs. A more elegant configuration is as follows:

```yml
# _config.next.yml
menu:
  home: / || fa fa-bell
  Docs:
    default: /docs/
    Getting Started: getting-started || fa fa-flag
    Theme Settings: theme-settings || fa fa-star
    # ...
```

The directory structure looks like this:

```txt
.
└── theme-next-docs/
    ├── source/
    │   ├── _posts/
    │   │   └── ...
    │   └── docs/
    │       ├── index.md
    │       ├── getting-started.md
    │       ├── theme-settings.md
    │       └── ...
    └── ...
```

{% note warning %} Suffix the path with `.html` is still needed if you want to
keep the header on top! {% endnote %}

Note that in this scenario, both leading and trailing slashes are **needed** in
the `default:` path for the header tabs to be loaded.
