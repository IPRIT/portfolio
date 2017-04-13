import { AbImage } from "../../../shared/components/ab-image/ab-image.model";

export interface PortfolioItem {
  uid?: string,
  title?: string,
  subTitle?: string,
  shortDescription?: string,
  description?: string,
  photos?: PortfolioItemPhoto[],
  technologies?: Technology[],
  sourceLinks?: PortfolioSourceLink[],
  style?: PortfolioItemStyle,
  createdAtMs?: number,
  [prop: string]: any
}

export interface PortfolioItemPhoto extends AbImage {
  imageName?: string,
  [prop: string]: any
}

export interface Technology {
  uid: string,
  name?: string,
  description?: string,
  photo?: PortfolioItemPhoto,
  [prop: string]: any
}

export interface PortfolioSourceLink {
  title: string,
  description: string,
  href: string
}

export interface PortfolioItemStyle {
  color: string,
  backgroundPhoto: PortfolioItemPhoto,
  backgroundOverlayGradient?: string,
  backgroundPhotoPosition?: string,
  backgroundPhotoSize?: string,
  backgroundOverlayColor?: string
}
