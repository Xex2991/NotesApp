import { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isRecoveryMode, setIsRecoveryMode] = useState(false);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.includes('type=recovery')) {
            setIsRecoveryMode(true);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event ==='PASSWORD_RECOVERY') {
                setIsRecoveryMode(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Password do not match');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const { data, error } = await supabase.auth.updateUser({
                password:password
            });

            if (error) throw error;

            console.log('Password updated:', data);
            setMessage('Password updated successfully! You can now sign in with your new password.');
            setPassword('');
            setConfirmPassword('');

            await supabase.auth.signOut();

            if (isRecoveryMode && window.history.replaceState) {
                window.history.replaceState(null, null, window.location.pathname);
            }
        } catch (error) {
            console.error('Update error:',  error);
            setError(error.message);
        } finally{
            setLoading(false);
        }

    };
    
    return(
        <div className="auth-container">
            <h1>Update Password</h1>

            {isRecoveryMode && !message &&  (
                <p className="message" >Please enter your new password below.</p>
            )}

            {message && <p className="message-success">{message}</p>}
            {error && <p className="message-error">{error}</p>}

            <form onSubmit={handleUpdatePassword}>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input 
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="6"
                        autoComplete="new-password"/>
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>

            {message && (
                <p className="mt-4">
                    <button
                        onClick={() => {
                            supabase.auth.signOut();
                            window.location.href = '/';
                        }}
                        className="link-button"
                    >
                        return to Sign In
                    </button>
                </p>
            )}
        </div>
    );
}

export default UpdatePassword;