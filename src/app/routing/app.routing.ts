import { Routes } from "@angular/router";
import { MainComponent } from "../main/main.component";
import { MeComponent } from "../me/me.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { routes as meRoutes } from "../me/me.routing";
import { routes as adminRoutes } from "../admin/admin.routing";
import { AdminComponent } from "../admin/admin.component";

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      meta: {
        useTitleSuffix: false,
        titleSuffix: ''
      }
    }
  },
  { path: 'me', component: MeComponent, children: meRoutes },
  { path: 'admin', component: AdminComponent, children: adminRoutes },
  { path: '**', component: NotFoundComponent }
];