import appAxios from '../config';
import IBlog from './type';
export const API_BLOG = {
  GET_LIST_BLOG: `/blogs`,
  GET_DETAIL_BLOG: (id: number) => `/blogs/${id}`,
  CREATE_BLOG: `/blogs`,
  EDIT_BLOG: (id: number) => `/blogs/${id}`,
};

export default class COMMUNITY_API {
  static getListBlogs = (params: any) =>
    appAxios.get<IBlog>(API_BLOG.GET_LIST_BLOG, params);

  static getDetailBlog = (id: number) =>
    appAxios.get<IBlog>(API_BLOG.GET_DETAIL_BLOG(id));

  static createBlog = (body?: any) => appAxios.post(API_BLOG.CREATE_BLOG, body);

  static editBlog = (id: number) => (body?: any) =>
    appAxios.put(API_BLOG.EDIT_BLOG(id), body);
}
