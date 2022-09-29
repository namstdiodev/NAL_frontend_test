import dynamic from 'next/dynamic'
const BlogPage = dynamic(() => import("./blog"));


export default BlogPage;
