import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaginate } from 'src/api/config/type';
import { RootState } from 'src/app/store';
import { IBlog, IEditBlogPayload, IBlogQuery } from 'src/api/blog';

interface IList<T> {
  result: T[];
  paginate: IPaginate;
}

interface IBlogSlice {
  getListBlog: {
    data: IList<IBlog>;
    status: {
      loading: boolean;
      error: any;
      query: any;
    };
  };
  getDetailBlog: {
    data: IBlog;
    status: {
      loading: boolean;
      error: any;
    };
  };
  createBlog: {
    status: {
      loading: boolean;
      error: any;
    };
  };
  editBlog: {
    status: {
      loading: boolean;
      error: any;
    };
  };
}

const INIT_LIST = {
  result: [],
  paginate: {
    page: 1,
    offset: 10,
    total: 1,
  },
};
export const initialState: IBlogSlice = {
  getListBlog: {
    data: { ...INIT_LIST },
    status: {
      loading: false,
      error: {},
      query: {
        page: 1,
        offset: 10,
        sort_by: 'created_at',
        sort_direction: 'asc'
      },
    },
  },
  getDetailBlog: {
    data: {
      comments_count: '',
      content: '',
      title: '',
      id: -1,
      created_at: '',
      updated_at: '',
      image: {
        url: '',
      },
    },
    status: {
      loading: false,
      error: {},
    },
  },
  createBlog: {
    status: {
      loading: false,
      error: {},
    },
  },
  editBlog: {
    status: {
      loading: false,
      error: {},
    },
  },
};
export const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {
    // Get list blog
    getListBlog: (state, action: PayloadAction<IBlogQuery>) => {
      state.getListBlog.status.loading = true;
      state.getListBlog.status.query = {
        ...state.getListBlog.status.query,
        ...action.payload,
      };
    },
    successGetListBlog: (state, action) => {
      state.getListBlog.data = {
        result: action.payload.data.items,
        paginate: action.payload.paginate.pagination,
      };
      state.getListBlog.status.loading = false;
    },
    failGetListBlog: (state, action) => {
      (state.getListBlog.status.error = action.payload),
        (state.getListBlog.status.loading = false);
    },

    // Get detail blog
    getDetailBlog: (state, action: PayloadAction<number>) => {
      state.getDetailBlog.status.loading = !!action.payload;
    },
    successGetDetailBlog: (state, action) => {
      state.getDetailBlog.data = action.payload.data;
      state.getDetailBlog.status.loading = false;
    },
    failGetDetailBlog: (state, action) => {
      (state.getDetailBlog.status.error = action.payload),
        (state.getDetailBlog.status.loading = false);
    },
    resetDataDetailBlog: (state) => {
      state.getDetailBlog.data =  {
        comments_count: '',
        content: '',
        title: '',
        id: -1,
        created_at: '',
        updated_at: '',
        image: {
          url: '',
        },
      }
    },
    // Create blog
    createBlog: (state, action: PayloadAction<FormData>) => {
      state.createBlog.status.loading = !!action.payload;
    },
    successCreateBlog: (state) => {
      state.createBlog.status.loading = false;
    },
    failCreateBlog: (state, action) => {
      (state.createBlog.status.error = action.payload),
        (state.createBlog.status.loading = false);
    },

    //Edit blog
    editBlog: (state, action: PayloadAction<IEditBlogPayload>) => {
      state.editBlog.status.loading = !!action.payload;
    },
    successEditBlog: (state) => {
      state.editBlog.status.loading = false;
    },
    failEditBlog: (state, action) => {
      (state.editBlog.status.error = action.payload),
        (state.editBlog.status.loading = false);
    },
  },
});

export const {
  getListBlog,
  successGetListBlog,
  failGetListBlog,

  getDetailBlog,
  successGetDetailBlog,
  failGetDetailBlog,
  resetDataDetailBlog,

  createBlog,
  successCreateBlog,
  failCreateBlog,

  editBlog,
  successEditBlog,
  failEditBlog
} = blogSlice.actions;

export const selectListBlog = (state: RootState) => state.blog.getListBlog;

export const selectDetailBlog = (state: RootState) => state.blog.getDetailBlog;

export const selectCreateBlogStatus = (state: RootState) => state.blog.createBlog.status

export const selectEditBlogStatus = (state: RootState) => state.blog.editBlog.status


export default blogSlice.reducer;
