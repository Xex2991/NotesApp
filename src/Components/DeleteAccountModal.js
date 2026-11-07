import { useState } from 'react';
import { supabase } from '../SupabaseClient';

function DeleteAccountModal({ isOpen, onClose, onAccountDeleted }) {
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleDeleteAccount = async () => {
    if (confirmText !== 'delete my account') {
      setError('Please type "delete my account" to confirm.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      
      if (!userId) {
        throw new Error('Unable to identify current user');
      }
      
      const { error: notesError } = await supabase
        .from('notes')
        .delete()
        .eq('user_id', userId);
      
      if (notesError) {
        console.error('Error deleting notes:', notesError);
        throw new Error(`Failed to delete notes: ${notesError.message}`);
      }
      
      await supabase.auth.signOut();
      
      onAccountDeleted();

    } catch (error) {
      console.error('Delete account error:', error);
      setError(error.message || 'Failed to delete account data. Please contact support.');
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setConfirmText('');
      setError('');
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Delete Account Data</h2>
          <button 
            className="close-button" 
            onClick={handleClose}
            aria-label="Close"
            disabled={loading}
          >
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <p className="warning-text">
            Warning: This action cannot be undone. All your notes will be permanently deleted.
          </p>
          
          <p className="message">
            Note: This will delete all your notes and sign you out. Your account will remain,
            but all your data will be gone.
          </p>
          
          <p>To confirm, please type <strong>delete my account</strong> below:</p>
          
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="delete my account"
            className="confirm-input"
            disabled={loading}
            autoComplete="off"
          />
          
          {error && <p className="message error">{error}</p>}
        </div>
        
        <div className="modal-footer">
          <button 
            className="cancel-button" 
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
          
          <button 
            className="delete-button"
            onClick={handleDeleteAccount}
            disabled={loading || confirmText !== 'delete my account'}
          >
            {loading ? 'Deleting...' : 'Delete All Data'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;