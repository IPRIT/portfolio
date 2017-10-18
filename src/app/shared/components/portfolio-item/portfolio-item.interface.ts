import { AbImage } from "../ab-image/ab-image.model";

export interface PortfolioItem {
  uid?: string,
  title?: string,
  subTitle?: string,
  shortDescription?: string,
  description?: string,
  demoUrl: string,
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
  uid?: string,
  name?: string,
  description?: string,
  photo?: PortfolioItemPhoto,
  link?: string,
  [prop: string]: any
}

export interface PortfolioSourceLink {
  title: string,
  description?: string,
  href: string,
  linkType: string
}

export interface PortfolioItemStyle {
  color?: string,
  backgroundPhoto?: PortfolioItemPhoto,
  backgroundPhotoForPage?: PortfolioItemPhoto,
  backgroundOverlayGradient?: string,
  backgroundPhotoPositionForPage?: string,
  backgroundPhotoSizeForPage?: string,
  titleLineColor?: string,
  headerImage?: PortfolioItemPhoto,
  headerClass?: string,
  themeColor: string
}
