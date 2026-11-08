import { useState, useEffect } from "react";
import { supabase } from "./SupabaseClient";
import Auth from './Components/Auth';
import Notes from './Components/Notes';
import PasswordReset from './Components/PasswordReset';
import UpdatePassword from './Components/UpdatePassword';
import Landing from './Components/Landing';
import {useToast} from './ToastContext';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(true);
  const {showToast} = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);

        const hash = window.location.hash;
        if (hash && hash.substring(1).includes('type=recovery')) {
          setView('update');
          setLoading(false);
          return;
        }

        const { data } = await supabase.auth.getSession();
        console.log("Initial session check:", data.session ? "Session exist" : "No session");

        if (data.session) {
          setSession(data.session);
        }
      } catch (error) {
        console.error("Session check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const { data: {subscription} } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);

      switch (event) {
        case 'SIGNED_IN':
          console.log("User signed in");
          setSession(session);
          showToast("Successfully signed in!", "success");
          break;

        case 'SIGNED_OUT':
          console.log("User signed out");
          setSession(null);
          showToast("Successfully signed out!", "info");

          setTimeout(() => {
            window.location.href = '/';
          }, 800);
          break;

        case 'PASSWORD_RECOVERY':
          console.log("Password recovery");
          setView('update');
          break;

        default:
          break;
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [showToast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const navigateToView = (newView) => {
    setView(newView);
  };

  const renderCurrentView = () => {
    if (loading) {
      return <div className="loading-container">Loading...</div>;
    }

    if (!session) {
      switch (view) {
        case 'auth':
          return <Auth setView={navigateToView} />
        case 'reset':
          return <PasswordReset setView={navigateToView} />
        case 'update':
          return <UpdatePassword setView={navigateToView} />
        case 'landing':
        default:
          return <Landing setView={navigateToView} />
      }
    }

    if (view === 'update') {
      return <UpdatePassword />;
    }

    return <Notes user={session.user} onSignOut={handleSignOut} />
  };

  return(
    <div className="container">
      {renderCurrentView()}
    </div>
  );
}

export default App;