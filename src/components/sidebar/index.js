import { useContext, useState } from "react";
import { NotesContext } from "../../App";
import { FaPlus } from "react-icons/fa";
import "./style.css"

const colors = [
  "#FFF5DF",
  "#BCDEAF",
  "#A6DCE9",
  "#FEE5FD"
];

function Sidebar() {
  const { addNote } = useContext(NotesContext);

  const [selectedTheme, setSelectedTheme] = useState(colors[0]);

  return (
    <div className="sidebar">
      <button className="add-note-btn" onClick={() => addNote(selectedTheme)}>
        <FaPlus />
      </button>
      <div className="colors-input-list">
        {colors.map((color) => (
          <div key={color} className="color-input">  {/* Added key prop here */}
            <input
              type="radio"
              name="color-input"
              value={color}
              id={"color-" + color}
              checked={selectedTheme === color}
              onChange={(e) => setSelectedTheme(color)}
            />
            <label
              htmlFor={"color-" + color}
              style={{ background: color }}
            ></label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
