import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getDetailBlog, selectDetailBlog } from 'src/features/blog/blogSlice';
import { NextPage } from 'next';
const EditBlog = dynamic(() => import('src/components/ListBlog/CreateBlog'));
const Layout = dynamic(() => import('src/components/Layout'));

const EditBlogPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectDetailBlog);
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(getDetailBlog(+id));
    }
  }, [dispatch, id]);
  return <Layout>{data.id >= 0 && <EditBlog initValues={data} />}</Layout>;
};
export default EditBlogPage;
