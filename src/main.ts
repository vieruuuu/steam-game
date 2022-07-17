import { createPinia } from "pinia";
import { createApp, App as AppT } from "vue";
import { Router } from "vue-router";

import "./css/app.scss";

import App from "./App.vue";

import initRouter from "./router/router";

const app = createApp(App);

type initFunctionParamsT = {
  app: AppT;
  router: Router;
};

(async () => {
  app.use(createPinia());

  const router = await initRouter(app);

  const initFiles: Record<
    string,
    { default: (params: initFunctionParamsT) => void }
  > = import.meta.glob("./init/*.ts", {
    eager: true,
  });

  const initParameters: initFunctionParamsT = {
    app,
    router,
  };

  const initFunctions = Object.entries(initFiles).map(
    ([, { default: initFunction }]) => initFunction(initParameters)
  );

  await Promise.all(initFunctions);

  app.mount("#app");
})();
