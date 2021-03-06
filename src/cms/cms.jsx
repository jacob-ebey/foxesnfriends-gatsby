import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import ArticlePreviewTemplate from './templates/article-preview-template';
import HomePreviewTemplate from './templates/home-preview-template';

import '../components/global.scss';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('article', ArticlePreviewTemplate);
CMS.registerPreviewTemplate('index', HomePreviewTemplate);
