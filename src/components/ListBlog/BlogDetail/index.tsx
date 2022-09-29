import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getDetailBlog, selectDetailBlog, resetDataDetailBlog } from 'src/features/blog/blogSlice';
import Link from 'next/link';
const BlogDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectDetailBlog);
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(getDetailBlog(+id));
    }
    return () => {
      dispatch(resetDataDetailBlog())
    }
  }, [dispatch, id]);
  return (
    <div className={`w-100 ${status.loading && 'loading-skeleton'}`}>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">{data?.title}</h1>
        <Link href={`/blog/edit/${data.id}`}>
          <a>
            <h4>
              <i className="bi bi-pencil text-danger" />
            </h4>
          </a>
        </Link>
      </div>
      <Image
        width={1200}
        height={600}
        src={data?.image?.url || '/blur.png'}
        loading="lazy"
        placeholder="blur"
        alt="blog_image"
        blurDataURL="/blur.png"
      />
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
  );
};
export default BlogDetail;
