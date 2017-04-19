export interface AbImage {
  originalSrc: string;
  thumbnailSrc?: string;
  title?: string;
}

export class AbImageModel implements AbImage {
  constructor(
    public originalSrc: string,
    public thumbnailSrc: string = '',
    public title: string = ''
  ) {}
}