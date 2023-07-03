import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import DataFromJson from "./data/notes";
import Tools from "./Components/Tools";
import { v4 as uuidv4 } from "uuid";
import Split from "react-split";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SunEditor from "./Components/suneditor";

export default function App() {
	//get data from localStorage
	const dataFromLStorage = JSON.parse(localStorage.getItem("notes"));

	const [notes, setNotes] = useState(
		dataFromLStorage ? dataFromLStorage : DataFromJson
	);

	const [textAreaNote, setTextAreaNote] = useState(
		notes.length > 0 && notes[0].body
	);

	const [idNoteActive, setIdNoteActive] = useState(
		notes.length > 0 && notes[0].id
	);
	const [boolEditNameNotes, setBoolEditNameNotes] = useState(false);

	const [noteNameItem, setNoteNameItem] = useState(
		notes.length > 0 && notes[0].title
	);

	console.log("amir for test");
	// useEffect(() => {
	// 	console.log("test");
	// }, [idNoteActive]);

	// every time notes change: set notes to localStorage
	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	//every time note name changed: function saveNoteItemName execute
	useEffect(() => {
		saveNoteItemName(idNoteActive);
	}, [noteNameItem]);

	useEffect(() => {
		//this is change value of textarea in the notes state
		const newTextAreaValue = notes.map(item =>
			item.id === idNoteActive
				? { ...item, body: textAreaNote }
				: item
		);
		setNotes(newTextAreaValue);

		//when notes state change : set notes into localStorage
		localStorage.setItem("notes", JSON.stringify(newTextAreaValue));
	}, [textAreaNote]);

	//when noteName changed : this function save it
	function saveNoteItemName(id) {
		const saveNoteNameChange = notes.map(item =>
			item.id === id ? { ...item, title: noteNameItem } : item
		);
		setNotes(saveNoteNameChange);
	}

	//this function limited noteName character
	function noteItemNameCharacter(e) {
		e.target.value.length < 16 && setNoteNameItem(e.target.value);
	}

	//this function add new item to notes state
	function noteAddItem() {
		const newNote = {
			id: uuidv4(),
			title: `Note${notes.length + 1}`,
			body: "",
		};
		setNotes(prev => [...prev, newNote]);
	}
	//this function is for when note delete
	function noteItemDelete(id) {
		const newDeleteNotesItems = notes.filter(item => item.id !== id);
		setNotes(newDeleteNotesItems);
		if (id === idNoteActive) {
			setNoteNameItem("");
			setTextAreaNote("");
			setIdNoteActive("");
		}
	}
	//change note when click on the item
	function handleChangeItem(id) {
		const activeNote = notes.find(item => item.id === id);
		if (activeNote) {
			setIdNoteActive(activeNote.id);
			setTextAreaNote(activeNote.body);
			setNoteNameItem(activeNote.title);
		}
	}

	return (
		<div className="App background--items h-100">
			<div className="">
				<div className="">
					<Split
						className="wrap  p-0 w-100"
						sizes={[10, 15, 75]}
						minSize={100}
						expandToMin={false}
						gutterSize={8}
						gutterAlign="center"
						snapOffset={10}
						dragInterval={1}
						direction="horizontal"
						cursor="col-resize">
						<div className="col-1 text-center  p-0">
							<Tools />
						</div>
						<div className="col-1 px-0">
							<button
								onClick={() => noteAddItem()}
								type="button"
								className="list-group-item text-center text-white bg-primary active list-group-item-action"
								aria-current="true">
								<AddIcon></AddIcon>
							</button>
							<ul className="list-group text-center list-group-flush ">
								{notes.map(note => (
									<li
										key={note.id}
										className={`list-group-item d-flex  p-0  list-group-item-action ${
											idNoteActive ===
												note.id &&
											"active--note--item"
										}`}>
										<div className="width-available p-1">
											{boolEditNameNotes &&
											idNoteActive ===
												note.id ? (
												<div>
													<input
														className="form-control unFocus rounded-0"
														defaultValue={
															note.title
														}
														value={
															noteNameItem
														}
														onChange={e => {
															noteItemNameCharacter(
																e
															);
														}}></input>
													<div className="d-flex float-right">
														<button
															onClick={() => {
																saveNoteItemName(
																	note.id
																);
																setBoolEditNameNotes(
																	() =>
																		false
																);
															}}
															className="button--rename btn rounded-0 btn-sm btn-success">
															<CheckIcon></CheckIcon>
														</button>
													</div>
												</div>
											) : (
												<div
													onClick={() => {
														!boolEditNameNotes &&
															handleChangeItem(
																note.id
															);
													}}
													onDoubleClick={() => {
														!boolEditNameNotes &&
															setBoolEditNameNotes(
																perv =>
																	!perv
															);
													}}
													className="d-flex  text-left  justify-content-between">
													<div className="float-left text-leftt">
														{
															note.title
														}
													</div>
												</div>
											)}
										</div>
										{!boolEditNameNotes && (
											<div className="p-1">
												<div
													onClick={() =>
														noteItemDelete(
															note.id
														)
													}
													style={{
														float: "right",
													}}
													className="float-right noteItemDelete">
													<DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
												</div>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>
						<div className="col-10 pt-1 border">
							<div className="form-group ">
								<input
									onChange={e => {
										noteItemNameCharacter(
											e
										);
										saveNoteItemName(
											idNoteActive
										);
									}}
									value={noteNameItem}
									type="text"
									className="title-bar unFocus border-0 rounded-0 mb-2 mr-sm-2"
									id="inlineFormInputName2"
									placeholder="title"
								/>
								<SunEditor
									setTextAreaNote={
										setTextAreaNote
									}
									value={textAreaNote}
									onChange={e =>
										setTextAreaNote(
											e.target.value
										)
									}
								/>
							</div>
						</div>
					</Split>
				</div>
			</div>
		</div>
	);
}
