import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioItemPageComponent } from "./portfolio/portfolio-item-page/portfolio-item-page.component";

export const routes: Routes = [{
  path: 'about',
  component: AboutComponent,
  data: {
    meta: {
      title: 'About',
      description: 'About Alex Belov',
      'twitter:description': 'About Alex Belov',
      'theme-color': '#01579b'
    }
  }
}, {
  path: 'portfolio',
  component: PortfolioComponent,
  data: {
    meta: {
      title: 'Portfolio',
      description: 'Alex Belov\'s Portfolio',
      'twitter:description': 'Alex Belov\'s Portfolio',
      'theme-color': '#ef4b5b'
    }
  }
}, {
  path: 'portfolio/:id',
  component: PortfolioItemPageComponent,
  data: {
    meta: {
      titleSuffix: '',
      useTitleSuffix: false
    }
  }
}];