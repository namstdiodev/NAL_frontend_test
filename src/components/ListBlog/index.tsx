/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import Image from 'next/image';
import { getListBlog, selectListBlog } from 'src/features/blog/blogSlice';
import { IBlog, IBlogQuery } from 'src/api/blog';
import { isMappable } from 'src/utils/helper';
import useDebounce from 'src/hooks/useDebounce';
import { format } from 'date-fns'
import { BLOG_SORT_OPTION, BLOG_SORT_DIRECTION_OPTION } from 'src/constant/blog';
import { htmlToPlainText } from 'src/utils/helper';
import Link from 'next/link';

const Paginate = dynamic(() => import('../Paginate'));

const ListBlog = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectListBlog);

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const handlePaginateChange = (query: IBlogQuery) => {
    dispatch(getListBlog({ ...status.query, ...query }));
  };
  useEffect(() => {
    dispatch(getListBlog({ ...status.query, search: debouncedValue }));
  }, [dispatch, debouncedValue]);

  return (
    <div className="w-100">
      <h1 className="mb-5">The Blog</h1>
      <div>
        <div className="form-row">
          <div className="col-md-4 mt-1">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              className="form-control"
              placeholder="Search blog by title or content"
            />{' '}
          </div>
          <div className="col-md-4 mt-1">
            <select
              onChange={(e) =>
                dispatch(
                  getListBlog({
                    ...status.query,
                    sort_by: e.target.value,
                    page: 1,
                  }),
                )
              }
              className="custom-select"
              id="inputGroupSelect01"
            >
              {BLOG_SORT_OPTION.map((option) => (
                <option
                  selected={option.value == status.query.sort_by}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>{' '}
          </div>
          <div className="col-md-2 mt-1">
            <select
              onChange={(e) =>
                dispatch(
                  getListBlog({
                    ...status.query,
                    sort_direction: e.target.value
                  }),
                )
              }
              className="custom-select"
              id="inputGroupSelect01"
            >
              {BLOG_SORT_DIRECTION_OPTION.map((option) => (
                <option
                  selected={option.value == status.query.sort_direction}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>{' '}
          </div>
        </div>
      </div>
      {status.loading ? (
        <ul className="list-unstyled">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
            <li
              key={index}
              className="media blog py-4 border-bottom loading-skeleton"
            >
              <div className="media-body mr-5">
                <h4 className=" placeholder mt-0 mb-1">loading-skeleton</h4>
                <p>loading-skeleton</p>
              </div>
              <img src="/blur.png" className="placeholder" alt="blog_image" />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul className="list-unstyled">
            {isMappable(data.result) &&
              data.result.map((blog: IBlog) => (
                <li key={blog.id} className="media blog py-4 border-bottom">
                  <div className="media-body w-75 pr-2">
                    <Link href={`/blog/${blog.id}`}>
                      <a>
                        <h4 className="cursor-pointer mt-0 mb-1">
                          {blog?.title}
                        </h4>
                        <em className='text-secondary' style={{ fontSize: '14px' }}>{format(new Date(blog?.created_at), 'HH:mm yyyy-MM-dd')}</em>
                      </a>
                    </Link>
                    
                    <Link href={`/blog/${blog.id}`}>
                      <a>
                        <p>{htmlToPlainText(blog?.content)}</p>
                      </a>
                    </Link>
                  </div>
                  <Link href={`/blog/${blog.id}`}>
                    <a>
                      <Image
                        width={112}
                        height={112}
                        src={blog?.image?.url}
                        loading="lazy"
                        placeholder="blur"
                        alt="blog_image"
                        blurDataURL="/blur.png"
                      />{' '}
                    </a>
                  </Link>
                </li>
              ))}
          </ul>
          {data.paginate.total > 1 && (
            <Paginate
              paginate={data.paginate}
              hanleChange={handlePaginateChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ListBlog;
