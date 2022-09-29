import { Field, Form, Formik, ErrorMessage } from 'formik';
import dynamic from 'next/dynamic';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import blogValidationSchema from 'src/validation/blog';
import { createBlog, editBlog, selectCreateBlogStatus, selectEditBlogStatus } from 'src/features/blog/blogSlice';
import { IBlog } from 'src/api/blog';

const Editor = dynamic(() => import('src/components/CKEditor'), { ssr: false });
const DragDropImage = dynamic(() => import('src/components/Dropzone'));

interface IEditAndCreateBlog {
  initValues?: IBlog;
}

function convertToInitialValues(initValues: IBlog) {
  return {
    title: initValues.title,
    content: initValues.content,
    image: initValues.image.url,
  };
}

const EditBlog = ({ initValues }: IEditAndCreateBlog) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(initValues?.id  ? selectEditBlogStatus  : selectCreateBlogStatus)
  return (
    <div className="w-100">
      <h1 className="mb-3">{initValues ? 'Edit' : 'Create New'} Blog</h1>
      <Formik
        initialValues={
          initValues
            ? convertToInitialValues(initValues)
            : {
                title: '',
                content: '',
                image: '',
              }
        }
        validationSchema={blogValidationSchema}
        validate={(values: any) => {
          const errors: {
            image?: string;
          } = {};
          if (!values.image) errors.image = 'The image is required';
          return errors;
        }}
        onSubmit={(values) => {
          const blog = new FormData();
          blog.append('blog[title]', values.title);
          blog.append('blog[content]', values.content);
          blog.append('blog[image]', values.image);
          if (initValues?.id)
            dispatch(editBlog({ id: initValues?.id, params: blog }));
          else dispatch(createBlog(blog));
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label className="font-weight-bold">Title: </label>
              <Field name="title" className="form-control" />
              <span className="text-danger">
                <ErrorMessage name="title" />
              </span>
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Image: </label>
              <DragDropImage
                fileData={values.image}
                setFieldValue={setFieldValue}
                disabled={false}
              />
              <span className="text-danger">
                <ErrorMessage name="image" />
              </span>
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Content: </label>
              <Editor
                value={values.content}
                onChange={(v: string) => setFieldValue('content', v)}
              />
              <span className="text-danger">
                <ErrorMessage name="content" />
              </span>
            </div>
            <div className="d-flex justify-content-end">
              <button disabled={status.loading} type="submit" className="btn btn-primary">
                {status.loading ? 'Submiting' : 'Submit'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default EditBlog;
