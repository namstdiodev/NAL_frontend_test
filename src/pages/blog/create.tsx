import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';
import Layout from 'src/components/Layout';
const CreateBlog = dynamic(() => import('src/components/ListBlog/CreateBlog'));
const CreateBlogPage: NextPage = () => {
  return (
    <Layout title="Create Blog">
      <CreateBlog />
    </Layout>
  );
};
export default CreateBlogPage;
