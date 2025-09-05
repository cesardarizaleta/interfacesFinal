const express = require('express');

const usersRouter = require('./user_router');
const colorsRouter = require('./color_router');
const fontsRouter = require('./font_router');
const authRouter = require('./auth_router');
const profileRouter = require('./profile_router');
const adminRouter = require('./admin_router');


function routerApi(app){
  // Diagnostic logs to help identify which import is not a router
  const util = require('util');
  const routers = {
    usersRouter,
    colorsRouter,
    fontsRouter,
    authRouter,
    profileRouter,
    adminRouter
  };
  const paths = {
    usersRouter: './user_router',
    colorsRouter: './color_router',
    fontsRouter: './font_router',
    authRouter: './auth_router',
    profileRouter: './profile_router',
    adminRouter: './admin_router'
  };
  Object.entries(routers).forEach(([name, mod]) => {
    try {
      const resolved = require.resolve(paths[name]);
      const cacheEntry = require.cache[resolved];
  console.log(`[routes] ${name}: cacheExports=${util.inspect(cacheEntry && cacheEntry.exports, {depth:2})}`);
      console.log(`[routes] ${name}: resolved=${resolved}`);
      console.log(`[routes] ${name}: cacheFilename=${cacheEntry && cacheEntry.filename}`);
      console.log(`[routes] ${name}: typeof=${typeof mod}, isFunction=${typeof mod === 'function'}, hasStack=${!!(mod && mod.stack)}, hasHandle=${!!(mod && mod.handle)}, keys=${util.inspect(Object.keys(mod || {}))}`);
    } catch (e) {
      console.log(`[routes] ${name}: error inspecting module:`, e.message);
    }
  });

  app.use('/api/users', usersRouter);
  app.use('/api/colors', colorsRouter);
  app.use('/api/fonts', fontsRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/admin', adminRouter);


}

module.exports = routerApi;
