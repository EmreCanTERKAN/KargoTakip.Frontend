import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: "",
    loadComponent: () => import("./layout/layout.component"),
    children : [
      {
        path: "",
        loadComponent: () => import("./pages/home/home.component")
      },      {
        path: "kargolarim",
        loadComponent: () => import("./pages/kargolarim/kargolarim.component")
      }
    ]
  }
];
