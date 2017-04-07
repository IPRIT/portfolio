export class AbImageModel {
  constructor(
    public originalSrc: string,
    public thumbnailSrc: string,
    public title: string = 'Image'
  ) {}
}