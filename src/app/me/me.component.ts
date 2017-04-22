import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { routerTransition } from "../routing/app.routing.animations";
import { PhotoViewerService } from "../shared/components/photo-viewer/photo-viewer.service";
import { Router, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'ab-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
  animations: [ routerTransition() ],
  host: {'[@routerTransition]': ''}
})
export class MeComponent implements OnInit, OnDestroy {

  isMobileMenuOpen: boolean = false;
  private routerEvents: Subscription;

  constructor(
    public photoViewerService: PhotoViewerService,
    private router: Router,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.routerEvents = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(() => {
        this.renderer.setProperty(this.elementRef.nativeElement, 'scrollTop', 0);
      });
  }

  ngOnInit() {
  }

  onMobileMenuClicked(state) {
    this.isMobileMenuOpen = state;
  }

  onMobileMenuClosed(state) {
    this.isMobileMenuOpen = state;
  }

  ngOnDestroy() {
    if (this.routerEvents) {
      this.routerEvents.unsubscribe();
    }
  }
}
