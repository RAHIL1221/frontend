import React, { useContext, useState } from 'react';
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const [imageFile, setImageFile] = useState(null)

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag, imageFile);
        setNote({ title: "", description: "", tag: "" })
        setImageFile(null);
        props.showAlert("Added Successfully", "success");
        // Reset file input manually by resetting form
        document.getElementById("add-note-form").reset();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="card" style={{padding: '2.5rem'}}>
            <h2 className="section-title">Record a New Note</h2>
            <form id="add-note-form" style={{ marginTop: '1.5rem' }}>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required rows={3}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} required />
                </div>
                <div className="form-group">
                    <label htmlFor="image" className="form-label">Attach Image (Optional)</label>
                    <input type="file" className="form-control" id="image" name="image" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{padding: '0.5rem'}} />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;
