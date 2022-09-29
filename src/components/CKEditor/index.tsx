import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';


const Editor = (props: any) => {
  return (
    <CKEditor
      editor={ ClassicEditor }
      data={props.value}
      onChange={ (event: any, editor: any ) => {
        const data = editor.getData()
        props.onChange(data)
      } }
    />
  )
}

export default Editor;
