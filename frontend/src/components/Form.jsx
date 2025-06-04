import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./loadingIndicator";

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const name = method ==='login' ? 'Login' : 'Register'
    const oppositeRoute = method === 'login' ? '/register' : '/login';
    const oppositeText = method === 'login' ? "Don't have an account? Register" : "Already have an account? Login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        // Basic validation
        if (!username.trim()) {
            setError("Username is required");
            setLoading(false);
            return;
        }
        if (!password) {
            setError("Password is required");
            setLoading(false);
            return;
        }

        try {
            const res = await api.post(route, {
                username: username.trim(),
                password: password
            });
            
            if (method ==="login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")   
            }
            else {
                navigate("/login")
            }
        }
        catch (error) {
            console.error('Auth error:', error);
            setError(
                error.response?.data?.detail || 
                "An error occurred. Please try again."
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form-container">
                    <h1 className="form-title">{name}</h1>
                    
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <div className="input-group">
                        <FaUser className="input-icon" />
                        <input 
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                            placeholder="Username"
                            disabled={loading}
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input 
                            className="form-input"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                            placeholder="Password"
                            disabled={loading}
                        />
                        <button 
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {method === 'login' && (
                        <div className="form-options">
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    <button 
                        className="form-button" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <LoadingIndicator /> : name}
                    </button>

                    <div className="form-footer">
                        <Link to={oppositeRoute} className="switch-auth-link">
                            {oppositeText}
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;