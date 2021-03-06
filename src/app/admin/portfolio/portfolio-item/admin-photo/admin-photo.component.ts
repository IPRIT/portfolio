import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';
import { PortfolioItemPhoto } from "../../../../shared/components/portfolio-item/portfolio-item.interface";
import { FirebaseApp } from "angularfire2";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'ab-admin-photo',
  templateUrl: './admin-photo.component.html',
  styleUrls: ['./admin-photo.component.scss']
})
export class AdminPhotoComponent implements OnInit {

  @Input() photo: PortfolioItemPhoto;
  @Output() photoDeleted = new EventEmitter();

  storageRef: firebase.storage.Reference;
  imagesPath: string = 'images';

  constructor(
    @Inject(FirebaseApp) public firebaseApp: any
  ) {
    this.storageRef = (firebaseApp as firebase.app.App).storage().ref();
  }

  ngOnInit() {
  }

  handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.target.disabled = true;
    let file = evt.target.files[0];

    let metadata = {
      'contentType': file.type
    };

    this.storageRef.child(
      this.buildChildImagePath(`_${Math.random().toString(16).replace('.', '')}${file.name}`)
    ).put(file, metadata).then((snapshot: firebase.storage.UploadTaskSnapshot) => {
      let url = snapshot.downloadURL;
      this.photo.originalSrc = url;
      this.photo.imageName = snapshot.metadata.name;

      let ref: firebase.storage.Reference = this.storageRef.child(
        this.buildChildImagePath(`thumbnail${this.photo.imageName}`)
      );

      let thumbnailSpy = Observable.interval(1000)
        .switchMap(function () {
          return Observable.fromPromise(<Promise<any>>ref.getDownloadURL());
        })
        .retry(30)
        .take(1)
        .subscribe(url => {
          this.photo.thumbnailSrc = url;
        });
      console.log('File available at', url, snapshot.metadata);
    }).catch(function(error) {
      console.error('Upload failed:', error);
    });
  }

  removePhoto() {
    if (this.photo.originalSrc) {
      this.storageRef.child( this.buildChildImagePath(this.photo.imageName) ).delete();
    }
    if (this.photo.thumbnailSrc) {
      this.storageRef.child( this.buildChildImagePath(`thumbnail${this.photo.imageName}`) ).delete();
    }
    this.photoDeleted.emit( this.photo );
    this.photo.thumbnailSrc = this.photo.originalSrc = this.photo.imageName = '';
  }

  buildChildImagePath(imageName) {
    return `${this.imagesPath}/${imageName}`;
  }
}
