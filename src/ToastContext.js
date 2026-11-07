import React, {createContext, useState, useContext} from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    const clearToast = () => {
        setToast(null);
    };

    return(
        <ToastContext.Provider value={{ toast, showToast, clearToast }}>
            {children}

            {/* render Toast if it exists */}
            {toast && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        minWidth: '250px',
                        padding: '16px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        color: 'white',
                        fontWeight: '500',
                        backgroundColor:
                            toast.type === 'success' ? '#4CAF50' :
                            toast.type === 'error' ? '#F44336' :
                            toast.type === 'info' ? '#2196F3' : '#4CAF50',
                        zIndex: 9999,
                        animation: 'fadeIn 0.3s, fadeOut 0.3s 2.7s',
                    }}
                >
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}