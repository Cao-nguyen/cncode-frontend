import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/monokai.css";
import hljs from "highlight.js";
import "./QuillEditor.scss";

const cloudinaryUpload = async (file) => {
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_PRESET;

    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();

    const today = new Date();
    const folderPath = `/uploads/img/${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folderPath);

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        return data.secure_url;
    } else {
        throw new Error("Image upload failed.");
    }
};

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image", "video"],
            [{ align: [] }],
            ["blockquote"],
            ["code-block"],
        ],
        handlers: {
            image: function () {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                    const file = input.files[0];
                    if (file) {
                        try {
                            console.log("Uploading image to Cloudinary...");
                            const imageUrl = await cloudinaryUpload(file);
                            const range = this.quill.getSelection();
                            if (range) {
                                this.quill.insertEmbed(range.index, "image", imageUrl);
                            } else {
                                this.quill.insertEmbed(this.quill.getLength() - 1, "image", imageUrl);
                            }
                        } catch (error) {
                            console.error("Image upload failed:", error);
                            alert("Image upload failed. Please try again.");
                        }
                    }
                };
            },
        },
    },
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
    },
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "image",
    "video",
    "align",
    "blockquote",
    "code-block",
];

const QuillEditor = ({ value, onChange }) => {
    return (
        <div className="quill-editor">
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                theme="snow"
            />
        </div>
    );
};

export default QuillEditor;
