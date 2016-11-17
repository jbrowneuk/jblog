export class AlbumNameTitlePair {
  name: string;
  title: string;
}

export class ImageData {
  title: string;
  date: number;
  description: string;
  url: string;
  containingAlbums: AlbumNameTitlePair[];
  featured: boolean;
}
