---
title: Dual-domain Cloudflare Setup for GitHub Pages with HTTPS
date: 2024-06-21
tag: [blog, website, cloudflare, network, dns]
permalink: dual-domain/
---

## Background

I have two domains registered:

- `sghuang.com`, with my initials for English and Chinese first names and last
  name.
- `guanchao.pro`, with my first name in Chinese.

Since my portfolio is oriented towards English speakers (for now,) I want to
point the secondary domain to the primary one while ensuring URLs with paths can
still be accessed. The primary domain is used for
[this website](https://sghuang.com) hosted on GitHub Pages.

[Cloudflare](https://cloudflare.com) is used as the nameserver and provides
simple proxy features.

<!-- more -->

## Desired Behaviors

For the secondary domain:

- `feiyue.guanchao.pro` redirects to an external URL (with a specific path).
- `example.guanchao.pro/path` forwards to `example.sghuang.com/path`. Note that
  `example` could be `www`. In particular, `notes.guanchao.pro/note` should be
  correctly handled to access the canonical Obsidian publication.
- Similarly, `guanchao.pro/path` is also forwarded.

For the primary domain:

- All services need to be accessed with either `http://` or `https://` or no
  schema.
- The domain should be accessible both with and without the `www.` prefix.
- Obsidian vault accessible at `notes.sghuang.com`
- GitHub Pages website accessible at `sghuang.com`

## GitHub Pages with HTTPS

Simply adding A DNS records pointing to the GitHub Pages servers isn't perfect.
The problems are:

- On GitHub Pages: "Your site is live at `http://sghuang.com`", `Enforce HTTPS`
  option can't be checked.
- If `Full (strict)` mode (instead of `Full`) is set for SSL/TLS encryption on
  Cloudflare, certificate errors will prevent users from accessing the website.

{% fa_css %}

The solution is inspired by
[{% fa_inline reddit fab %} a comment on Reddit](https://reddit.com/r/CloudFlare/comments/11tin1m/comment/jclftsa/).
The problem is caused by Cloudflare's proxy settings:

- GitHub Pages needs time to create certificates for the newly created site,
- which is prevented by Cloudflare as a proxy layer.
- Therefore, certificate can't be verified with `Full (strict)` encryption mode.

The solution is fairly simple:

- Turn off proxy (orange cloud in DNS records setting) while setting up TLS
  certificates.
- Remove custom domain from GitHub Pages setting.
- Add the custom domain again. Now GitHub Pages should display the progress of
  certificate provisioning.
- At this point, the `Enforce HTTPS` option can be checked but will be
  automatically unchecked with a red cross displayed.
- Wait for a while and check the box again.
- The website should be accessible under `Full (strict)` security setting.

## Secondary Domain Configuration

### DNS Records

| Type  |   Name   |       Content       |
| :---: | :------: | :-----------------: |
|   A   | `feiyue` |     `192.0.2.1`     |
| CNAME |   `@`    |    `sghuang.com`    |
| CNAME |  `www`   |    `sghuang.com`    |
| CNAME | `notes`  | `notes.sghuang.com` |

The A record resolves to an internal IP address conventionally used as a "dead
end". We need this record to be present for the subsequent forwarding rules to
be applied; otherwise, a "server not found" error will prevent users from
accessing this URL in the first place.

The CNAME records with name `@` and `www` ensure both `guanchao.pro` and
`www.guanchao.pro` are resolved to `sghuang.com`.

The final CNAME record is straightforward.

### Rules

A _redirect rule_ is set to redirect `feiyue.guanchao.pro` to an external page.

```txt
When...
Hostname equals feiyue.guanchao.pro

Then... URL redirect
Type=Static URL=... Status code=301
Preserve query string=checked
```

A _page rule_ is set to ensure two domain names can be used interchangeably,
i.e., both subdomains and paths are preserved:

```txt
URL         = *guanchao.pro/*
setting     = Forwarding URL
status code = 301
destination = https://$1sghuang.com/$2
```

## Primary Domain Configuration

| Type  |  Name   |           Content           |
| :---: | :-----: | :-------------------------: |
|   A   |   `@`   |      `185.199.108.153`      |
|   A   |   `@`   |      `185.199.109.153`      |
|   A   |   `@`   |      `185.199.110.153`      |
|   A   |   `@`   |      `185.199.111.153`      |
| CNAME |  `www`  |        `sghuang.com`        |
| CNAME | `notes` | `publish-main.obsidian.com` |

`Always Use HTTPS` page rules are applied to the following URLs to enforce
HTTPS:

- `http://sghuang.com/*`
- `http://notes.sghuang.com/*`

Additionally, `www.sghuang.com/*` is forwarded to `https://sghuang.com/$1` to
avoid some certificates problems when accessing the `www` URL.
