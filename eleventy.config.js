const { getPosts, getProjects } = require("./config/collections/index.js");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
function configureMarkdownIt() {
  // Reference: https://github.com/markdown-it/markdown-it-container/issues/23
  return require("markdown-it")({ html: true })
    .use(require("markdown-it-attrs"))
    .use(require("markdown-it-container"), "dynamic", {
      validate: function () {
        return true;
      },
      render: function (tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          return '<div class="' + token.info.trim() + '">';
        } else {
          return "</div>";
        }
      },
    });
}

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addCollection("posts", getPosts);
  eleventyConfig.addCollection("projects", getProjects);
  ["src/assets/fonts/", "src/assets/images/", "src/assets/css/"].forEach(
    (path) => eleventyConfig.addPassthroughCopy(path)
  );
  eleventyConfig.addPassthroughCopy({
    "src/assets/images/favicon/*": "/",
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/staticroot/*": "/",
  });
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setLibrary("md", configureMarkdownIt());
  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
    pathPrefix: "/",
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      layouts: "_layouts",
    },
  };
};
