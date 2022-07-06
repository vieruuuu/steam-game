import {
  Quasar,
  QSeparator,
  QForm,
  QBtn,
  LocalStorage,
  LoadingBar,
  Loading,
  Notify,
  Dialog,
  QSpinnerPie,
} from "quasar";

import "./../css/roboto.scss";
import "@quasar/extras/material-icons/material-icons.css";

import "@quasar/extras/animate/fadeIn.css";
import "@quasar/extras/animate/fadeOut.css";

import "quasar/src/css/index.sass";

import { App } from "vue";

export default async ({ app }: { app: App }) => {
  app.use(Quasar, {
    plugins: { Dialog, Notify, Loading, LocalStorage, LoadingBar },
    components: { QSeparator, QForm, QBtn, QSpinnerPie },

    config: {
      loadingBar: {
        color: "light-blue",
      },
    },
  });
};
