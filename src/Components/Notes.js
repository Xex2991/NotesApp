import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../SupabaseClient';
import DeleteAccountModal from './DeleteAccountModal';
import { useToast } from '../ToastContext';

function Notes({ user, onSignOut }) { 
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editing, setEditing] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToast } = useToast();

  // Fetch notes from Supabase
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id) // Add user_id filter to ensure we only get the current user's notes
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
      showToast("Failed to load notes.", "error");
    } finally {
      setLoading(false);
    }
  }, [user.id, showToast]);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Create a new note
  const createNote = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      showToast("Please fill in both title and content.", "error");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([
          { 
            title: title.trim(),
            content: content.trim(),
            user_id: user.id
          }
        ])
        .select();
      
      if (error) throw error;
      
      setNotes([data[0], ...notes]);
      setTitle('');
      setContent('');
      showToast("Note created successfully!", "success");
    } catch (error) {
      console.error('Error creating note:', error.message);
      showToast("Failed to create note.", "error");
    }
  };

  const startEdit = (note) => {
    setEditing(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle('');
    setContent('');
  };

  const updateNote = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      showToast("Please fill in both title and content.", "error");
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .update({ 
          title: title.trim(), 
          content: content.trim(), 
          updated_at: new Date().toISOString()
        })
        .eq('id', editing)
        .eq('user_id', user.id) // Ensure user can only update their own notes
        .select();
      
      if (error) throw error;
      
      setNotes(notes.map(note => note.id === editing ? data[0] : note));
      setEditing(null);
      setTitle('');
      setContent('');
      showToast("Note updated successfully!", "success");
    } catch (error) {
      console.error('Error updating note:', error.message);
      showToast("Failed to update note.", "error");
    }
  };

  const deleteNote = async (id) => {
    // Confirmation prompt
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    
    if (!confirmDelete) {
      return; // User canceled the deletion
    }
    
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id); // Ensure user can only delete their own notes
      
      if (error) throw error;
      
      setNotes(notes.filter(note => note.id !== id));
      showToast("Note deleted successfully!", "info");
    } catch (error) {
      console.error('Error deleting note:', error.message);
      showToast("Failed to delete note.", "error");
    }
  };

  const handleSignOut = () => {
    console.log("Sign out button clicked");
    onSignOut();
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleAccountDeleted = () => {
    setIsDeleteModalOpen(false);
    // The DeleteAccountModal already handles sign out, so we don't need to do anything else here
    // The auth state change will be handled by App.js
  };
  
  return(
    <div className="notes-container">
      <div className="header">
        <h1>My Notes</h1>
        <div className="user-menu">
          <span className="user-email">{user.email}</span>
          <button 
            onClick={() => setIsDeleteModalOpen(true)} 
            className="delete-account-button"
            type="button"
          >
            Delete Account
          </button>
          <button 
            onClick={handleSignOut} 
            className="sign-out-button"
            type="button"
          >
            Sign Out
          </button>
        </div>
      </div>

      <form onSubmit={editing ? updateNote : createNote} className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
        />
        
        <div className="form-buttons">
          <button type="submit">
            {editing ? 'Update Note' : 'Add Note'}
          </button>
          
          {editing && (
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="loading-notes">
          <p>Loading notes...</p>
        </div>
      ) : (
        <div className="notes-list">
          {notes.length === 0 ? (
            <div className="no-notes">
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                
                <div className="note-actions">
                  <button 
                    type="button"
                    onClick={() => startEdit(note)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    className="delete-note-button"
                  >
                    Delete
                  </button>
                </div>                
                <p className="note-date">
                  {new Date(note.created_at || note.updated_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
      
      {/* Only render modal when explicitly opened */}
      {isDeleteModalOpen && (
        <DeleteAccountModal 
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onAccountDeleted={handleAccountDeleted}
        />
      )}
    </div>
  );
}

export default Notes;