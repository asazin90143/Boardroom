import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
    const { signInWithGoogle, loading } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Failed to sign in:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="grid-pattern"></div>
                <div className="floating-notes">
                    <div className="floating-note note-1">📝</div>
                    <div className="floating-note note-2">📌</div>
                    <div className="floating-note note-3">💡</div>
                    <div className="floating-note note-4">🎯</div>
                    <div className="floating-note note-5">✨</div>
                </div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-logo">
                        <div className="logo-icon">📋</div>
                        <h1 className="logo-text">Boardroom</h1>
                    </div>

                    <p className="login-tagline">
                        Your digital canvas for creative organization.<br />
                        <span className="tagline-highlight">Free-form. Collaborative. Beautiful.</span>
                    </p>

                    <div className="login-features">
                        <div className="feature-item">
                            <span className="feature-icon">🎨</span>
                            <span className="feature-text">Free-form placement</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📌</span>
                            <span className="feature-text">Sticky notes & images</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📜</span>
                            <span className="feature-text">Complete history log</span>
                        </div>
                    </div>

                    <button
                        className="google-signin-btn"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <FcGoogle className="google-icon" />
                        <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
                    </button>

                    <p className="login-footer">
                        By signing in, you agree to our Terms of Service
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
