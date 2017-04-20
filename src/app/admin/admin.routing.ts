import { Routes } from "@angular/router";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { AdminTechnologiesPageComponent } from "./admin-technologies-page/admin-technologies-page.component";

export const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'technologies', component: AdminTechnologiesPageComponent }
];