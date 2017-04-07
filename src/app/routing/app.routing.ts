import { Routes } from "@angular/router";
import { MainComponent } from "../main/main.component";
import { MeComponent } from "../me/me.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { routes as meRoutes } from "../me/me.routing";

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'me', component: MeComponent, children: meRoutes },
  { path: '**', component: NotFoundComponent }
];