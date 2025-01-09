import express from 'express';
const app = express();

import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';

import expressLayouts from 'express-ejs-layouts';

import 'express-async-errors';

// import middlewares and routes
import router from './apps/routes.js';

const isDev = !!process.argv.find((v) => v === 'NODE_ENV=development');

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// static files
app.use('/assets', express.static(path.join(import.meta.dirname, 'public/assets')));
app.use('/', express.static(path.join(import.meta.dirname, 'public')));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, 'views'));
app.set('layout', 'layouts/default');
app.use(expressLayouts);

let manifest = {};
if (!isDev) {
  try {
    manifest = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'public/assets/manifest.json'), 'utf-8'));
  } catch (err) {
    console.log(err);
    console.error('No manifest file found');
  }
}

// Helper function to get asset URLs
function getAssetUrl(filename) {
  if (isDev) {
    return `http://localhost:5173/${filename}`;
  }
  return `/assets/${manifest[filename].file}`;
}

app.use((req, res, next) => {
  res.locals.getAssetUrl = getAssetUrl;
  res.locals.isDev = isDev;
  next();
});

// routes
app.use('/', router);


// start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
});
