import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCE = ({ initialValue, onChange }) => {
    return (
        <Editor
            apiKey={process.env.REACT_APP_TINY_API}
            initialValue={initialValue}
            init={{
                height: 400,
                menubar: false,
                plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={onChange}
        />
    );
};

export default TinyMCE;