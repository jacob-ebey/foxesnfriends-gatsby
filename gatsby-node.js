/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const stocks = require('yahoo-stock-prices');

exports.createPages = ({ actions: { createPage }, graphql }) => Promise.all([
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
      errors.forEach((e) => {
        // eslint-disable-next-line no-console
        console.error(e.toString());
      });
      return Promise.reject(errors);
    }

    data.articles.edges.forEach((edge) => {
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`,
        ),
        // Additional data can be passed via context
        context: {
          id: edge.node.id,
          tags: edge.node.frontmatter.tags,
        },
      });
    });

    return Promise.resolve();
  }),
]);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // Convert image paths for gatsby images

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes([
    schema.buildObjectType({
      name: 'StocksData',
      fields: {
        apple: {
          type: 'Float',
        },
        microsoft: {
          type: 'Float',
        },
        facebook: {
          type: 'Float',
        },
      },
    }),
  ]);
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      stocks: {
        type: 'StocksData!',
        resolve: () => Promise.all([
          new Promise((resolve, reject) => {
            stocks.getCurrentPrice('AAPL', (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          }),
          new Promise((resolve, reject) => {
            stocks.getCurrentPrice('MSFT', (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          }),
          new Promise((resolve, reject) => {
            stocks.getCurrentPrice('FB', (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve(data);
              }
            });
          }),
        ]).then(([apple, microsoft, facebook]) => ({
          apple,
          microsoft,
          facebook,
        })),
      },
    },
  });
};
