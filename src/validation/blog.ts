import * as yup from 'yup'

const blogValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('The title is required'),
  content: yup
    .string()
    .trim()
    .required('The content is required'),
})

export default blogValidationSchema
