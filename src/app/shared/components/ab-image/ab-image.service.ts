import { Injectable, Renderer2 } from '@angular/core';
import { AbImage } from "./ab-image.model";
import { Subject, Observable } from "rxjs";

interface QueuedElement<T> {
  id: number,
  observer: Subject<T>
}

interface QueuedImageElement extends QueuedElement<HTMLImageElement> {
  renderer: Renderer2,
  imageModel: AbImage
}

interface LoadingQueueElement {
  priority: number
}

interface LoadingQueueImageElement extends LoadingQueueElement {
  element: QueuedImageElement
}

@Injectable()
export class AbImageService {

  private autoIncrementId = 1;
  private loadingQueue: LoadingQueueImageElement[] = [];
  private inProcessElements: QueuedImageElement[] = [];
  private maxQueuedElementsNumber = 3;
  private defaultPriority = 1;

  load(renderer: Renderer2, imageModel: AbImage, priority?: number): Observable<HTMLImageElement> {
    let loadingObserver = new Subject<HTMLImageElement>();
    let loadingElement: LoadingQueueImageElement = {
      priority: priority || this.defaultPriority,
      element: {
        id: this.autoIncrementId++,
        renderer, imageModel,
        observer: loadingObserver
      }
    };
    this._enqueue( loadingElement );
    return loadingObserver.asObservable();
  }

  private _enqueue(loadingElement: LoadingQueueImageElement) {
    this.loadingQueue.push( loadingElement );
    if (this.inProcessElements.length < this.maxQueuedElementsNumber) {
      return this._loadNext();
    }
  }

  private _loadNext() {
    this._sortByPriority( this.loadingQueue );

    let { priority, element } = this.loadingQueue.shift();
    this.inProcessElements.push( element );
    let { renderer, imageModel, observer } = element;

    let image: HTMLImageElement = renderer.createElement('img');
    renderer.listen(image, 'load', () => {
      observer.next( image );
      this._removeInProcessElement( element );
      this._tryLoadNext();
    });
    renderer.setAttribute(image, 'src', imageModel.originalSrc);
  }

  private _tryLoadNext() {
    if (this.inProcessElements.length < this.maxQueuedElementsNumber
      && this.loadingQueue.length > 0) {
      this._loadNext();
    }
  }

  private _sortByPriority(elements: LoadingQueueImageElement[]) {
    return elements.sort((a, b) => b.priority - a.priority);
  }

  private _removeInProcessElement(targetElement: QueuedImageElement): void {
    this.inProcessElements.splice(
      this.inProcessElements.findIndex((element: QueuedImageElement) => {
        return element.id === targetElement.id;
      }), 1
    );
  }
}
