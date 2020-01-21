module.exports = {
  siteMetadata: {
    title: "Foxes n Friends",
    description:
      "Breaking News Updates | Latest News Headlines | Photos & News Videos"
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `roboto`,
          `source sans pro\:300,400,700,900` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sass",
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     path: `${__dirname}/src/img`,
    //     name: "images"
    //   }
    // },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads"
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048
            }
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static"
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      // options: {
      //   modulePath: `${__dirname}/src/cms/cms.js`
      // }
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["/all.sass"] // applies purging only on the bulma css file
      }
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify" // make sure to keep it last in the array
  ]
};
