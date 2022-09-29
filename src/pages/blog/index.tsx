import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
const ListBlog = dynamic(() => import('../../components/ListBlog'));
const Layout = dynamic(() => import('../../components/Layout'))

const BlogPage: NextPage = () => {
  return (
    <Layout title="List Blog">
      <ListBlog/>
    </Layout>
  )
};

export default BlogPage;
