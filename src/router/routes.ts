import DefaultLayout from "@/layouts/Default.vue";
import Home from "@/pages/Home.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [{ path: "", component: Home }],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error404.vue"),
  },
];

export default routes;
