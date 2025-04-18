import React, { useState, useEffect } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "./Exam.scss";

function Exam({ value, onChange }) {
  const [markdown, setMarkdown] = useState(value || "");
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setMarkdown(value || "");
  }, [value]);

  const insertMarkdown = (markdownText, selection = "") => {
    const textarea = document.querySelector("textarea");
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const selectedText = markdown.slice(startPos, endPos);
    const newText =
      markdown.slice(0, startPos) +
      markdownText.replace("{}", selectedText || selection) +
      markdown.slice(endPos);

    setMarkdown(newText);
    onChange(newText);

    setTimeout(() => {
      textarea.selectionStart = startPos + markdownText.indexOf("{}");
      textarea.selectionEnd =
        textarea.selectionStart + (selectedText.length || selection.length);
      textarea.focus();
    }, 0);
  };

  const handleKeyDown = (event) => {
    const textarea = event.target;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      insertMarkdown("**{}**");
    } else if (event.ctrlKey && event.key === "i") {
      event.preventDefault();
      insertMarkdown("*{}*");
    } else if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
      insertMarkdown("<u>{}</u>");
    } else if (event.ctrlKey && event.key === "q") {
      event.preventDefault();
      insertMarkdown("> {}");
    } else if (event.ctrlKey && event.key === "k") {
      event.preventDefault();
      insertMarkdown("[{}](Link)");
    } else if (event.ctrlKey && event.key === "o") {
      event.preventDefault();
      insertMarkdown(
        "| {} | Header 2 |\n| -------- | -------- |\n| Row 1    | Row 2    |"
      );
    } else if (event.key === "Tab") {
      event.preventDefault();
      const newText = `${markdown.substring(
        0,
        startPos
      )}    ${markdown.substring(endPos)}`;
      setMarkdown(newText);
      setTimeout(
        () => textarea.setSelectionRange(startPos + 4, startPos + 4),
        0
      );
    } else if (event.ctrlKey && event.key === "^") {
      event.preventDefault();
      insertMarkdown("<sup>{}</sup>");
    } else if (event.ctrlKey && event.key === "_") {
      event.preventDefault();
      insertMarkdown("<sub>{}</sub>");
    }
  };

  const handleInputChange = (event) => {
    const newMarkdown = event.target.value;
    setMarkdown(newMarkdown);
    onChange(newMarkdown);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [markdown]);

  const togglePreview = () => {
    setIsPreview((prev) => !prev);
  };

  return (
    <div className="editor-text-exam">
      <div className="toolbar">
        <i
          className="fa-solid fa-bold"
          title="Ctrl+B"
          onClick={() => insertMarkdown("**{}**")}
        />
        <i
          className="fa-solid fa-italic"
          title="Ctrl+I"
          onClick={() => insertMarkdown("*{}*")}
        />
        <i
          className="fa-solid fa-underline"
          title="Ctrl+U"
          onClick={() => insertMarkdown("<u>{}</u>")}
        />
        <i
          className="fa-solid fa-superscript"
          title="Ctrl+^"
          onClick={() => insertMarkdown("<sup>{}</sup>")}
        />
        <i
          className="fa-solid fa-subscript"
          title="Ctrl+_"
          onClick={() => insertMarkdown("<sub>{}</sub>")}
        />
        <i
          className="fa-solid fa-quote-left"
          title="Ctrl+Q"
          onClick={() => insertMarkdown("> {}")}
        />
        <i
          className="fa-solid fa-link"
          title="Ctrl+K"
          onClick={() => insertMarkdown("[{}](Link)")}
        />
        <i
          className="fa-solid fa-table"
          title="Ctrl+T"
          onClick={() =>
            insertMarkdown(
              "| {} | Header 2 |\n| -------- | -------- |\n| Row 1    | Row 2    |"
            )
          }
        />
        <i
          className="fa-solid fa-code"
          title="Ctrl+Shift+C"
          onClick={() => insertMarkdown("```language\n{}\n```")}
        />
        <i
          className="fa-solid fa-align-left"
          title="Center Align"
          onClick={() => insertMarkdown('<div class="al-left">{}</div>')}
        />
        <i
          className="fa-solid fa-align-center"
          title="Center Align"
          onClick={() => insertMarkdown('<div class="al-center">{}</div>')}
        />
        <i
          className="fa-solid fa-align-right"
          title="Center Align"
          onClick={() => insertMarkdown('<div class="al-right">{}</div>')}
        />
        <i
          className="fa-solid fa-align-justify"
          title="Center Align"
          onClick={() => insertMarkdown('<div class="al-justify">{}</div>')}
        />
        <i
          className="fa-solid fa-eye"
          title="Bản xem trước"
          onClick={togglePreview}
        />
      </div>

      <div
        className="editor-container"
        style={{ display: isPreview ? "none" : "block" }}
      >
        <textarea
          value={markdown}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div
        className="preview"
        style={{ display: isPreview ? "block" : "none" }}
        dangerouslySetInnerHTML={{
          __html: marked(markdown.replace(/\n/g, "  \n")),
        }}
      />
    </div>
  );
}

export default Exam;
