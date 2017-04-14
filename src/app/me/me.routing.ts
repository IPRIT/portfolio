import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioItemPageComponent } from "./portfolio/portfolio-item-page/portfolio-item-page.component";

export const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'portfolio/:id', component: PortfolioItemPageComponent }
];