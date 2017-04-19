import { Injectable, Renderer2 } from '@angular/core';
import { AbImage } from "./ab-image.model";
import { Subject, Observable } from "rxjs";

@Injectable()
export class AbImageService {

  private loadingQueue: [ Renderer2, AbImage, Subject<HTMLImageElement> ][] = [];
  private inProcess = false;

  constructor(
  ) { }

  loadEnqueue(renderer: Renderer2, abImage: AbImage): Observable<HTMLImageElement> {
    let loadingObserver = new Subject<HTMLImageElement>();
    this._enqueue(renderer, abImage, loadingObserver);
    return loadingObserver.asObservable();
  }

  private _enqueue(renderer: Renderer2, abImage: AbImage, observer: Subject<any>) {
    this.loadingQueue.push([ renderer, abImage, observer ]);
    if (!this.inProcess) {
      return this._loadNext();
    }
  }

  private _loadNext() {
    this.inProcess = true;
    let [ renderer, abImage, shiftedObserver ] = this.loadingQueue.shift();
    let image: HTMLImageElement = renderer.createElement('img');
    renderer.listen(image, 'load', () => {
      shiftedObserver.next( image );
      console.log('Loaded image', image);
      this.inProcess = false;
      this._tryLoadNext();
    });
    renderer.setAttribute(image, 'src', abImage.originalSrc);
  }

  private _tryLoadNext() {
    if (!this.inProcess && this.loadingQueue.length > 0) {
      this._loadNext();
    }
  }
}
