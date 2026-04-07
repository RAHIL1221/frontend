import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/NoteContext"

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirmDelete = () => {
        deleteNote(note._id);
        setShowConfirm(false);
        props.showAlert("Deleted Successfully", "success");
    };

    return (
        <>
        <div className="note-card glass">
            {note.image && (
                <img 
                    src={`https://backend-jh3b.onrender.com/uploads/${note.image}`} 
                    alt={note.title} 
                    className="note-image"
                />
            )}
            <div className="note-header">
                <h5 className="note-title">{note.title}</h5>
            </div>
            <p className="note-desc">{note.description}</p>
            <div className="note-footer">
                <span className="note-tag">{note.tag}</span>
                <div className="note-actions">
                    <button className="icon-btn edit" onClick={() => { updateNote(note) }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button className="icon-btn delete" onClick={() => setShowConfirm(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showConfirm && (
            <div className="modal-overlay">
                <div className="modal" style={{textAlign: 'center', maxWidth: '400px'}}>
                    <button className="modal-close" onClick={() => setShowConfirm(false)}>×</button>
                    <div style={{marginBottom: '1rem', color: 'var(--danger)'}}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    </div>
                    <h3 className="section-title" style={{marginBottom: '0.5rem'}}>Delete Note</h3>
                    <p className="note-desc" style={{marginBottom: '1.5rem'}}>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
                    
                    <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                        <button className="btn btn-outline" style={{width: '120px'}} onClick={() => setShowConfirm(false)}>Cancel</button>
                        <button className="btn btn-danger" style={{width: '120px', backgroundColor: 'var(--danger)', color: 'white'}} onClick={handleConfirmDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default NoteItem
