import { Component, OnInit, Input } from '@angular/core';
import {
  PortfolioItem,
  PortfolioItemPhoto
} from "../../../../shared/components/portfolio-item/portfolio-item.interface";
import { PhotoViewerService } from "../../../../shared/components/photo-viewer/photo-viewer.service";
import { Observable } from "rxjs";

@Component({
  selector: 'ab-portfolio-item-photos',
  templateUrl: './portfolio-item-photos.component.html',
  styleUrls: ['./portfolio-item-photos.component.scss']
})
export class PortfolioItemPhotosComponent implements OnInit {

  @Input() item: PortfolioItem;

  constructor(
    private photoViewerService: PhotoViewerService
  ) { }

  ngOnInit() {
  }

  openPhoto(index: number, photo: PortfolioItemPhoto | any) {
    if (photo) {
      // todo
    }
    index = index || 0;
    this.photoViewerService.setPhotos(this.item.photos || []);
    this.photoViewerService.openPhotoViewer();
    Observable.of(index)
      .delay(100)
      .subscribe((index: number) => {
        this.photoViewerService.setPhotoNumber(index + 1);
      });
  }
}
