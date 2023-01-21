import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Authenticated routes
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'UserFeed',
        path: '/feed/:id',
        component: () => import('src/pages/UserFeed.vue'),
      },
    ],
  },

  // Public routes
  {
    path: '',
    component: () => import('src/layouts/SimpleLayout.vue'),
    children: [
      {
        name: 'HomePage',
        path: '',
        component: () => import('src/pages/HomePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'ErrorNotFound',
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
