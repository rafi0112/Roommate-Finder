import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import Swal from 'sweetalert2';

const Register = () => {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        password: "", 
        photoURL: "" 
    });
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { createUser, setCurrentUser, signInGoogle } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Validate password in real-time if it's the password field
        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password) => {
        let error = "";
        
        if (password.length < 6) {
            error = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(password)) {
            error = "Must contain at least one uppercase letter";
        } else if (!/[a-z]/.test(password)) {
            error = "Must contain at least one lowercase letter";
        }
        
        setPasswordError(error);
        return error === "";
    };

    const handleRegister = e => {
        e.preventDefault();
        
        if (!validatePassword(formData.password)) {
            toast.error("Please fix password errors before submitting");
            return;
        }

        createUser(formData.email, formData.password)
            .then((res) => {
                const user = res.user;
                user.displayName = formData.name;
                user.photoURL = formData.photoURL;
                setCurrentUser(user);
                
                Swal.fire({
                    title: 'Account Created!',
                    html: `Welcome <b>${formData.name}</b>!<br>Your account has been successfully created.`,
                    icon: 'success',
                    confirmButtonText: 'Continue'
                }).then(() => {
                    navigate(location.state?.from || "/");
                });
            })
            .catch((error) => {
                let errorMessage = 'Registration failed. Please try again.';
                
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = 'This email is already registered';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Please enter a valid email address';
                        break;
                    case 'auth/weak-password':
                        errorMessage = 'Password should be at least 8 characters';
                        break;
                    default:
                        errorMessage = error.message;
                }

                Swal.fire({
                    title: 'Registration Failed',
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="text-gray-600 mt-2">Join us today!</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Optional)</label>
                        <input
                            type="text"
                            name="photoURL"
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className={`w-full px-4 py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
                            onChange={handleChange}
                            required
                        />
                        {passwordError && (
                            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                            <p>Password requirements:</p>
                            <ul className="list-disc list-inside">
                                <li className={formData.password.length >= 6 ? 'text-green-500' : ''}>At least 6 characters</li>
                                <li className={/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}>At least one uppercase letter</li>
                                <li className={/[a-z]/.test(formData.password) ? 'text-green-500' : ''}>At least one lowercase letter</li>
                            </ul>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
                    >
                        Register
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition duration-300 shadow-sm hover:shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                </button>

                <p className="text-center text-sm mt-6 text-gray-600">
                    Already have an account?{' '}
                    <NavLink 
                        to="/login" 
                        className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                    >
                        Sign in
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;