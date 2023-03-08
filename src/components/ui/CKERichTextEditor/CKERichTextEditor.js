import React, {useRef, useState} from "react";

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button} from "@mui/material";


export default function CKERichTextEditor({initialValue}) {
    const [content, setContent] = useState(initialValue ? initialValue : '');


    const saveChanges = () => {
        console.log('Content: ', content)
        console.log('Save the data!')
    }

    return (
        <>
            <CKEditor className={'dark:bg-gray-700'}
                      editor={ClassicEditor}
                      data={content}
                      onReady={editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {
                          const data = editor.getData();
                          setContent(data)
                      }}
                      onBlur={() => saveChanges()}
            />
        </>

    )
}
