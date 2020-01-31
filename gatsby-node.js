/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const stocks = require('yahoo-stock-prices');
const NewsAPI = require('newsapi');
const _ = require('lodash');
const hasher = require('node-object-hash');

const hashSortCoerce = hasher({ sort: true, coerce: true });

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const topHeadlines = newsapi.v2.topHeadlines().then((headlinesResult) => {
  if (headlinesResult.status !== 'ok' || !headlinesResult.articles) {
    return Promise.reject(new Error('could not load real news headlines'));
  }

  const articles = _.uniq(headlinesResult.articles, 'url').filter((a) => !!a.urlToImage && !!a.content).map((article) => {
    const parts = article.url.split('/');
    const lastPath = path.parse(parts[parts.length - 1]).name;

    const slug = `/article/e/${lastPath}-${hashSortCoerce.hash(article)}`;

    return {
      ...article,
      slug,
      urlToImage: article.urlToImage.replace('http://', 'https://'),
    };
  });
  return Promise.resolve(articles);
});

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  await Promise.all([
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

    topHeadlines.then((realArticles) => {
      realArticles.forEach((article) => {
        createPage({
          path: article.slug,
          tags: article.title.split(' '),
          component: path.resolve('src/templates/external-article.jsx'),
          context: {
            article,
          },
        });
      });
    }),
  ]);
};

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
    schema.buildObjectType({
      name: 'RealArticleSource',
      fields: {
        name: 'String!',
      },
    }),
    schema.buildObjectType({
      name: 'RealArticle',
      fields: {
        source: {
          type: 'RealArticleSource!',
        },
        slug: {
          type: 'String!',
        },
        url: {
          type: 'String!',
        },
        urlToImage: {
          type: 'String',
        },
        title: {
          type: 'String!',
        },
        description: {
          type: 'String',
        },
        author: {
          type: 'String',
        },
        publishedAt: {
          type: 'Date!',
        },
        content: {
          type: 'String!',
        },
      },
    }),
  ]);
};

exports.createResolvers = ({ createResolvers }) => {
  const stocksResult = Promise.all([
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
  ]);

  createResolvers({
    Query: {
      realArticles: {
        type: '[RealArticle!]!',
        resolve: () => topHeadlines.then((headlines) => _.shuffle(headlines)),
      },
      stocks: {
        type: 'StocksData!',
        resolve: () => stocksResult.then(([apple, microsoft, facebook]) => ({
          apple,
          microsoft,
          facebook,
        })),
      },
    },
  });
};
