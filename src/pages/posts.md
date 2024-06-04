---
layout: main.njk
title: Posts
eleventyNavigation:
  key: Posts
  order: 4
eleventyImport:
  collections: ["posts"]
---

# {{ title }}

### Here are some recent posts from the life of a emigrant freelancer

<div class="postlist">

<ul>
{%- for entry in collections.posts %}
<li{% if entry.url == page.url %} class="highlighted"{% endif %}>
    <a href="{{ entry.url }}">{{ entry.data.title }}</a>
    <div>{{ entry.data.description }}</div>
</li>
{%- endfor %}
</ul>
</div>
