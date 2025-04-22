import { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { NotesContext } from "../../App";
import "./style.css"

function Note({ note }) {
    const { saveNote, deleteNote } = useContext(NotesContext);

    const [isEditMode, setIsEditMode] = useState(note.editmode);
    const [text, setText] = useState(note.text);
    const textareaRef = useRef(null);

    const handleSaveNote = () => {
        saveNote(note.id, text);
        setIsEditMode(false);
    };

    const getDateString = (timestamp) => {
        const temp = new Date(timestamp).toDateString().split(" ");
        return `${temp[2]} ${temp[1]} ${temp[3]}`;
    };

    const adjustTextareaHeight = () => {
        textareaRef.current.style.maxHeight = "1px";
        textareaRef.current.style.minHeight = "1px";
        textareaRef.current.style.height = "1px";

        textareaRef.current.style.minHeight =
            Math.max(textareaRef.current.scrollHeight, 100) + "px";
        textareaRef.current.style.height = null;
        textareaRef.current.style.maxHeight = null;
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [text]);

    useEffect(() => {
        window.addEventListener("resize", adjustTextareaHeight);
        return () => {
            window.removeEventListener("resize", adjustTextareaHeight);
        };
    }, []);

    return (
        <div className="note" style={{ background: note.theme }}>
            <textarea
                ref={textareaRef}
                value={text}  // Use value prop instead of children
                readOnly={!isEditMode}
                onChange={(e) => setText(e.target.value)}  // Update text state on change
            />
            <div className="footer">
                <p className="date">{getDateString(note.timestamp)}</p>
                {!isEditMode && (
                    <button onClick={() => setIsEditMode(true)}>
                        <FaEdit />
                    </button>
                )}
                {isEditMode && (
                    <button onClick={handleSaveNote}>
                        <FaSave />
                    </button>
                )}
                <button onClick={() => deleteNote(note.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default Note;