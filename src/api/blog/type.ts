interface IBlog {
  comments_count: string;
  content: string;
  title: string;
  id: number;
  created_at: string;
  updated_at: string;
  image: {
    url: string;
  };
}

export type IEditBlogPayload  = {
  id: number,
  params: FormData
}

export type IBlogQuery = {
  page?: number,
  offset?: number,
  search?: number,
  sort_by?: string,
  sort_direction?: string
}

export default IBlog;
