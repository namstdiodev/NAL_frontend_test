import { NextPage } from 'next';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('src/components/Layout'));
const BlogDetail = dynamic(() => import('src/components/ListBlog/BlogDetail'));

const BlogDetailPage: NextPage = () => {
  return (
    <Layout title='Blog Detail'>
      <BlogDetail />
    </Layout>
  );
};
export default BlogDetailPage;
