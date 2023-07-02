import React, { useRef } from "react";
import SunEditor, { buttonList, font } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import "suneditor/dist/css/suneditor.min.css";
import suneditor from "suneditor";
import katex from "katex";
import plugins from "suneditor/src/plugins";
const MyComponent = ({ value, setTextEreaNote, defaultValue }) => {
  function setAreaText() {
    console.log("done");
    const value = document.querySelector("[name='myArea']").value;
    setTextEreaNote(value);
    console.log(value);
  }
  /**
   * @type {React.MutableRefObject<SunEditor>} get type definitions for editor
   */
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  return (
    <div>
      <SunEditor
        lang="en"
        setOptions={{
          katex: katex,
          plugins: plugins,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript"
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video", "audio", "math"], // You must add the 'katex' library at options to use the 'math' plugin. // You must add the "imageGalleryUrl".

            /** ['imageGallery'] */

            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["save"],
            ["dir", "dir_ltr", "dir_rtl"]
            /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
          ]
        }}
        setAllPlugins={true}
        getSunEditorInstance={getSunEditorInstance}
        showToolbar={true}
        height="100%"
        onChange={() => setAreaText()}
        setContents={value}
        name="myArea"
        // onChange={(e) => setTextEreaNote(e.target.value)}
        autoFocus={true}
        placeholder="Please type here..."
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default MyComponent;
