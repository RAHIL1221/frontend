import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(NoteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [eImageFile, setEImageFile] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updateNote = (currentNote) => {
        setIsModalOpen(true);
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
        setEImageFile(null)
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag, eImageFile)
        setIsModalOpen(false);
        props.showAlert("Updated Successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* Edit Modal (Custom) */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal glass" style={{background: 'var(--bg-color)'}}>
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
                        <h2 className="page-title" style={{fontSize: '1.5rem', marginBottom: '1rem'}}>Edit Note</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required rows={3}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eimage" className="form-label">New Image (Optional)</label>
                                <input type="file" className="form-control" id="eimage" name="eimage" accept="image/*" onChange={(e) => setEImageFile(e.target.files[0])} style={{padding: '0.5rem'}} />
                            </div>
                        </form>
                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem'}}>
                            <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{marginTop: '2rem'}}>
                <h2 className="page-title">Your Notes</h2>
                <div className="notes-grid">
                    {notes.length === 0 && (
                        <div style={{gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem'}}>
                            No notes to display. Create one above!
                        </div>
                    )}
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
