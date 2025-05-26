import { useContext, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from 'sweetalert2';
import { useTheme } from "../contexts/ThemeContext";

const Login = () => {
    const { signInGoogle, login, setCurrentUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login(formData.email, formData.password)
            .then(res => {
                const user = res.user;
                setCurrentUser(user);
                Swal.fire({
                    title: 'Login Successful!',
                    text: `Welcome back, ${user.email}`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                navigate(location.state?.from || "/");
            })
            .catch(err => {
                let errorMessage = 'Login failed. Please try again.';
                
                if (err.code === 'auth/invalid-credential') {
                    errorMessage = 'Invalid email or password';
                } else if (err.code === 'auth/too-many-requests') {
                    errorMessage = 'Account temporarily locked. Try again later.';
                } else if (err.code === 'auth/user-not-found') {
                    errorMessage = 'No account found with this email';
                }

                Swal.fire({
                    title: 'Login Failed',
                    text: errorMessage,
                    icon: 'error'
                });
            });
    };

    const handleGoogleLogin = async () => {
        signInGoogle()
            .then(res => {
                const user = res.user;
                setCurrentUser(user);
                Swal.fire({
                    title: 'Success!',
                    text: `Welcome ${user.displayName || 'User'}`,
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate(location.state?.from || "/");
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error',
                    text: err.message || 'Google sign-in failed',
                    icon: 'error'
                });
            });
    };

    return (
        <div className={`flex flex-col items-center justify-center min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
            <div className={`p-8 rounded-xl shadow-2xl w-full max-w-md ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center mb-8">
                    <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Welcome Back</h2>
                    <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sign in to continue</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            placeholder="your@email.com" 
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            placeholder="••••••••" 
                            className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition ${theme === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'}`}
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
                
                <div className="flex items-center my-6">
                    <div className={`flex-grow border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                    <span className={`mx-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>or</span>
                    <div className={`flex-grow border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                </div>
                
                <button 
                    onClick={handleGoogleLogin} 
                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-medium border hover:bg-gray-50 transition duration-300 shadow-sm hover:shadow-md ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-700 border-gray-300'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign in with Google
                </button>
                
                <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Don't have an account?{' '}
                    <NavLink 
                        to="/register" 
                        className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                    >
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;