import { Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioItemPageComponent } from "./portfolio/portfolio-item-page/portfolio-item-page.component";
import { ContactComponent } from "./contact/contact.component";

export const routes: Routes = [{
  path: 'about',
  component: AboutComponent,
  data: {
    meta: {
      title: 'About',
      description: 'About Alex Belov',
      robots: 'all',
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
      robots: 'all',
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
      useTitleSuffix: false,
      robots: 'all'
    }
  }
}, {
  path: 'contact',
  component: ContactComponent,
  data: {
    meta: {
      title: 'Contact me',
      description: 'Alex Belov\'s Contacts',
      robots: 'noindex',
      'twitter:description': 'Alex Belov\'s Contacts',
      'theme-color': '#efd837'
    }
  }
}];