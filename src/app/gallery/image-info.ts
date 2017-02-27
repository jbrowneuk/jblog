export interface AlbumNameTitlePair {
  name: string;
  title: string;
}

export interface ImageInfo {
  id: number;
  title: string;
  date: number;
  description: string;
  thumbnail: string;
  src: string;
  containingAlbums: AlbumNameTitlePair[];
  featured: boolean;
}
