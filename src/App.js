import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Data from "./data/notes";
import Tools from "./Components/Tools";
import { v4 as uuidv4 } from "uuid";
import Split from "react-split";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SunEditor from "./Components/suneditor";
export default function App() {
  const data = JSON.parse(localStorage.getItem("notes"));
  const [notes, setNotes] = useState(data ? data : Data);
  const [textEreaNote, setTextEreaNote] = useState(
    notes.length > 0 && notes[0].body
  );

  const [idNoteActive, setIdNoteActive] = useState(
    notes.length > 0 && notes[0].id
  );
  const [boolEditNameNotes, setBoolEditNameNotes] = useState(false);
  const [noteNameItem, setNoteNameItem] = useState(
    notes.length > 0 && notes[0].title
  );



  
  
  useEffect(() => {
    console.log("testt");
  }, [idNoteActive]);
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });
  useEffect(() => {
    saveNoteItemName(idNoteActive);
  }, [noteNameItem]);
  useEffect(() => {
    notes.find(
      (item) => item.id === idNoteActive && (item.body = textEreaNote)
    );
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [textEreaNote]);

  function saveNoteItemName(id) {
    console.log(noteNameItem, "method");
    notes.find((item) => item.id === id && (item.title = noteNameItem));
  }

  // function CancelNameItemNote() {
  //   setBoolEditNameNotes((perv) => !perv);
  // }
  function noteItemName(e) {
    e.target.value.length < 16 && setNoteNameItem(e.target.value);
  }
  function noteAddItem() {
    setNotes((perv) => [
      ...perv,
      {
        id: uuidv4(),
        title: `Note${perv.length + 1}`,
        body: ""
      }
    ]);
  }
  function noteItemDelete(id) {
    setNotes((perv) => perv.filter((item) => item.id !== id));
    console.log(noteNameItem, "note name test");
    notes.find(
      (item) => item.id !== idNoteActive && console.log("find", idNoteActive),
      (setNoteNameItem(""), setTextEreaNote(""), setIdNoteActive(""))
    );
    console.log(noteNameItem, "note name test");
  }
  function handleText(id) {
    console.log("handle text test");
    notes.find(
      (item) =>
        item.id === id &&
        (setIdNoteActive(item.id),
        setTextEreaNote(item.body),
        setNoteNameItem(item.title))
    );
  }
  console.log(noteNameItem, "note name test out");
  return (
    <div className="App background--items h-100">
      <div className="">
        <div className="">
          <Split
            class="wrap  p-0 w-100"
            sizes={[10, 15, 75]}
            minSize={100}
            expandToMin={false}
            gutterSize={8}
            gutterAlign="center"
            snapOffset={10}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
          >
            <div className="col-1 text-center  p-0">
              <Tools />
            </div>
            <div className="col-1 px-0">
              <button
                onClick={() => noteAddItem()}
                type="button"
                class="list-group-item text-center text-white bg-primary active list-group-item-action"
                aria-current="true"
              >
                <AddIcon></AddIcon>
              </button>
              <ul class="list-group text-center list-group-flush ">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className={`list-group-item d-flex  p-0  list-group-item-action ${
                      idNoteActive === note.id && "active--note--item"
                    }`}
                  >
                    <div className="width-available p-1">
                      {boolEditNameNotes && idNoteActive === note.id ? (
                        <div>
                          <input
                            class="form-control unFocus rounded-0"
                            defaultValue={note.title}
                            value={noteNameItem}
                            onChange={(e) => {
                              noteItemName(e);
                            }}
                          ></input>
                          <div className="d-flex float-right">
                            <button
                              onClick={() => {
                                saveNoteItemName(note.id);
                                setBoolEditNameNotes(() => false);
                              }}
                              className="button--rename btn rounded-0 btn-sm btn-success"
                            >
                              <CheckIcon></CheckIcon>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            !boolEditNameNotes && handleText(note.id);
                          }}
                          onDoubleClick={() => {
                            !boolEditNameNotes &&
                              setBoolEditNameNotes((perv) => !perv);
                          }}
                          className="d-flex  text-left  justify-content-between"
                        >
                          <div className="float-left text-leftt">
                            {note.title}
                          </div>
                        </div>
                      )}
                    </div>
                    {!boolEditNameNotes && (
                      <div className="p-1">
                        <div
                          onClick={() => noteItemDelete(note.id)}
                          style={{ float: "right" }}
                          className="float-right noteItemDelete"
                        >
                          <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-10 pt-1 border">
              <div class="form-group ">
                <input
                  onChange={(e) => {
                    noteItemName(e);
                    saveNoteItemName(idNoteActive);
                  }}
                  value={noteNameItem}
                  type="text"
                  className="title-bar unFocus border-0 rounded-0 mb-2 mr-sm-2"
                  id="inlineFormInputName2"
                  placeholder="title"
                />
                <SunEditor
                  setTextEreaNote={setTextEreaNote}
                  value={textEreaNote}
                  onChange={(e) => setTextEreaNote(e.target.value)}
                />
              </div>
            </div>
          </Split>
        </div>
      </div>
    </div>
  );
}
