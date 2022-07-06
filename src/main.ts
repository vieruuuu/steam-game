import { createPinia } from "pinia";
import { createApp } from "vue";

import "./css/app.scss";

import App from "./App.vue";

// import initRouter from "./router";

const app = createApp(App);

(async () => {
  app.use(createPinia());

  // const router = await initRouter(app);

  const initFiles = import.meta.globEager("./init/*.ts");
  const initParameters = {
    app,
    // router,
  };

  const initFunctions = Object.entries(initFiles).map(
    ([, { default: initFunction }]) => initFunction(initParameters)
  );

  await Promise.all(initFunctions);

  app.mount("#app");
})();
