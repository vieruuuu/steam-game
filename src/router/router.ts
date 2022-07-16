import { createRouter, createWebHistory } from "vue-router";
import { LoadingBar } from "quasar";

import routes from "./routes";

let LoadingBarTimeout: number;

function startLoading() {
  // 200ms delay so the loading bar doesn't spam
  LoadingBarTimeout = setTimeout(
    () => LoadingBar.start(),
    200
  ) as unknown as number;
}

function stopLoading() {
  if (LoadingBarTimeout) {
    clearTimeout(LoadingBarTimeout);
  }

  LoadingBar.stop();
}

export default async (app) => {
  const Router = createRouter({
    routes,
    history: createWebHistory(),
  });

  Router.beforeEach((to, from, next) => {
    stopLoading();
    startLoading();

    next();
  });

  Router.afterEach(stopLoading);

  app.use(Router);

  return Router;
};
