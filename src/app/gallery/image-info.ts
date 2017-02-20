export interface AlbumNameTitlePair {
  name: string;
  title: string;
}

export interface ImageInfo {
  title: string;
  date: number;
  description: string;
  url: string;
  containingAlbums: AlbumNameTitlePair[];
  featured: boolean;
}
