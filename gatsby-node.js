const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ actions: { createPage }, graphql }) => {
  return Promise.all([
    graphql(`
      {
        articles: allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "article-page" } } }
          sort: { fields: frontmatter___date, order: DESC }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                tags
              }
            }
          }
        }
      }
    `).then(({ data, errors }) => {
      if (errors) {
        errors.forEach(e => console.error(e.toString()));
        return Promise.reject(result.errors);
      }

      data.articles.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug,
          tags: edge.node.frontmatter.tags,
          component: path.resolve(
            `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
          ),
          // additional data can be passed via context
          context: {
            id: edge.node.id,
            tags: edge.node.frontmatter.tags
          },
        })
      });
    })
  ]);
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
