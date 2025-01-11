import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-cshtml.min.js';
import 'prismjs/components/prism-css.min.js';
import axios from 'axios';
import './Editor.scss';

function Editor({ value, onChange }) {
    const [markdown, setMarkdown] = useState(value || '');
    const [isPreview, setIsPreview] = useState(false); // Trạng thái cho preview

    useEffect(() => {
        setMarkdown(value || '');
    }, [value]);

    const insertMarkdown = (markdownText, selection = '') => {
        const textarea = document.querySelector('textarea');
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        const selectedText = markdown.slice(startPos, endPos);

        const newText = markdown.slice(0, startPos) + markdownText.replace('{}', selectedText || selection) + markdown.slice(endPos);

        setMarkdown(newText);
        onChange(newText); // Cập nhật dữ liệu trong parent component

        setTimeout(() => {
            textarea.selectionStart = startPos + markdownText.indexOf('{}');
            textarea.selectionEnd = textarea.selectionStart + (selectedText.length || selection.length);
            textarea.focus();
        }, 0);
    };

    const handleKeyDown = (event) => {
        const textarea = event.target;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;

        if (event.ctrlKey && event.key === 'b') {
            event.preventDefault();
            insertMarkdown('**{}**');
        } else if (event.ctrlKey && event.key === 'i') {
            event.preventDefault();
            insertMarkdown('*{}*');
        } else if (event.ctrlKey && event.key === 'u') {
            event.preventDefault();
            insertMarkdown('<u>{}</u>');
        } else if (event.ctrlKey && event.key === 'q') {
            event.preventDefault();
            insertMarkdown('> {}');
        } else if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            insertMarkdown('[{}](Link)');
        } else if (event.ctrlKey && event.key === 'o') {
            event.preventDefault();
            insertMarkdown('| {} | Header 2 |\n| -------- | -------- |\n| Row 1    | Row 2    |');
        } else if (event.key === 'Tab') {
            event.preventDefault();
            const newText = `${markdown.substring(0, startPos)}    ${markdown.substring(endPos)}`;
            setMarkdown(newText);
            setTimeout(() => textarea.setSelectionRange(startPos + 4, startPos + 4), 0);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
        const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_PRESET;
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);

            // Lấy ngày tháng năm hiện tại
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const folder = `uploads/img/${day}-${month}-${year}`;
            formData.append('folder', folder);

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
                insertMarkdown(`![Image](${response.data.secure_url})`);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    useEffect(() => {
        Prism.highlightAll();
    }, [markdown]);

    const togglePreview = () => {
        setIsPreview((prev) => !prev); // Chuyển chế độ giữa preview và editor
    };

    return (
        <div className="editor-text">
            <div className="toolbar">
                {/* Các biểu tượng điều khiển như trước */}
                <i className="fa-solid fa-bold" title="Ctrl+B" onClick={() => insertMarkdown('**{}**')} />
                <i className="fa-solid fa-italic" title="Ctrl+I" onClick={() => insertMarkdown('*{}*')} />
                <i className="fa-solid fa-underline" title="Ctrl+U" onClick={() => insertMarkdown('<u>{}</u>')} />
                <i className="fa-solid fa-superscript" title="Ctrl+Shift+Up" onClick={() => insertMarkdown('<sup>{}</sup>')} />
                <i className="fa-solid fa-subscript" title="Ctrl+Shift+Down" onClick={() => insertMarkdown('<sub>{}</sub>')} />
                <i className="fa-solid fa-quote-left" title="Ctrl+Q" onClick={() => insertMarkdown('> {}')} />
                <i className="fa-solid fa-link" title="Ctrl+K" onClick={() => insertMarkdown('[{}](Link)')} />
                <i className="fa-solid fa-table" title="Ctrl+T" onClick={() => insertMarkdown('| {} | Header 2 |\n| -------- | -------- |\n| Row 1    | Row 2    |')} />
                <label htmlFor="image-upload" className="image-upload-label">
                    <i className="fa-solid fa-image" title="Upload Image" />
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="image-upload-input"
                />
                <i className="fa-solid fa-code" title="Ctrl+Shift+C" onClick={() => insertMarkdown('```\n{}\n```')} />
                <i className="fa-solid fa-align-left" title="Center Align" onClick={() => insertMarkdown('<div class="al-left">{}</div>')} />
                <i className="fa-solid fa-align-center" title="Center Align" onClick={() => insertMarkdown('<div class="al-center">{}</div>')} />
                <i className="fa-solid fa-align-right" title="Center Align" onClick={() => insertMarkdown('<div class="al-right">{}</div>')} />
                <i className="fa-solid fa-align-justify" title="Center Align" onClick={() => insertMarkdown('<div class="al-justify">{}</div>')} />
                <i className="fa-solid fa-eye" title="Bản xem trước" onClick={togglePreview} />
            </div>

            <div className="editor-container" style={{ display: isPreview ? 'none' : 'block' }}>
                <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div
                className="preview"
                style={{ display: isPreview ? 'block' : 'none' }}
                dangerouslySetInnerHTML={{
                    __html: marked(markdown.replace(/\n/g, '  \n'))
                }}
            />
        </div>
    );
}

export default Editor;