const express = require('express');

const usersRouter = require('./user_router');
const colorsRouter = require('./color_router');
const fontsRouter = require('./font_router');
const authRouter = require('./auth_router');
const profileRouter = require('./profile_router');
const adminRouter = require('./admin_router');
const galleryRouter = require('./gallery_router');


function routerApi(app){
  // Mount API routes
  app.use('/api/users', usersRouter);
  app.use('/api/colors', colorsRouter);
  app.use('/api/fonts', fontsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api/gallery', galleryRouter);
}

module.exports = routerApi;
