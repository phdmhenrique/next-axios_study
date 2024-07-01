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

export interface CommentsProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface TodosProps {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UsersProps {
  id: number;
  name: string;
  email: string;
  username: string;
}
