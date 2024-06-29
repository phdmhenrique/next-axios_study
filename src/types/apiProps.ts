export interface AlbumsProps {
  userId: number;
  id: number;
  title: string;
}

export interface PhotosProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface PostsProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}
