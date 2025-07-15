---
title: 11ty WebC Starter
description: A simple example of using WebC templates for all the things
changeFreq: yearly
layout: base.webc
---

# 11ty WebC Starter

This starter project focuses on using webc with 11ty, no CSS or client-side JS.

## Posts
<!--- Use WebC inside of Markdown --->
<ul>
  <li webc:for="post of collections.post">
    <a :href="post.url" @text="post.data.title"></a>
  </li>
</ul>

Source [@dwk/11ty-webc-starter](https://github.com/davidwkeith/11ty-webc-starter)
