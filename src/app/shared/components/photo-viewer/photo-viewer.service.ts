import { Injectable } from '@angular/core';
import { PortfolioItemPhoto } from "../portfolio-item/portfolio-item.interface";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Router, NavigationStart } from "@angular/router";

@Injectable()
export class PhotoViewerService {

  photo$: Observable<PortfolioItemPhoto>;
  photos$ = new BehaviorSubject<PortfolioItemPhoto[]>([]);
  photoNumber$ = new Subject<number>();
  isOpen$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
  ) {
    this.photo$ = this.photoNumber$
      .combineLatest(
        this.photos$,
        (photoNumber, photos) => photos[ photoNumber - 1 ]
      );

    let event = this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(() => {
        event.unsubscribe();
        this.closePhotoViewer();
      });
  }

  setPhotoNumber(photoNumber: number) {
    this.photoNumber$.next(photoNumber);
  }

  setPhotos(photos: PortfolioItemPhoto[]) {
    this.photos$.next(photos);
  }

  closePhotoViewer() {
    this.isOpen$.next(false);
  }

  openPhotoViewer() {
    this.isOpen$.next(true);
  }
}
