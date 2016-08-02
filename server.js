/* eslint no-console: 0 */
import fs from 'fs';
import path from 'path';
import webpack from  'webpack';
import config from './webpack.config.js';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import http from 'http';

import koa from  'koa';
import route from 'koa-route';
import koaStatic from  'koa-static';
import gzip from 'koa-gzip';
import bodyParser from 'koa-bodyparser';
import send from 'koa-send';
import session from 'koa-session';

const app = koa();
app.keys = ['red'];
app.use(session(app));
app.use(gzip());
app.use(bodyParser());

const isDeveloping = process.env.NODE_ENV.trim() !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // 静态文件
  app.use(koaStatic('dist'));
} else {
  app.use(koaStatic('dist'));
}

// http.createServer(app.callback()).listen(80);
http.createServer(app.callback()).listen(3000);
