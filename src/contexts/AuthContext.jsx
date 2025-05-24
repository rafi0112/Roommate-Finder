import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

  //checking
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth,(currentUser)=>
        {
        setCurrentUser(currentUser);
        setLoading(false)
        });
        return ()=>{
        unsubscribe();
        }

    },[])

   //register
    const createUser = (email,password) =>{
        // console.log("reached authprovidder")
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

  //login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //login google
    const googleProvider = new GoogleAuthProvider();
    const signInGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


  //logout
    const logout = ()=>{
        return signOut(auth);
    }


    const value = {
        setCurrentUser,
        currentUser,
        createUser,
        login,
        signInGoogle,
        logout,
        loading,
        setLoading
    };

  return (
    <AuthContext value={value}>
      { children}
    </AuthContext>
  );

};

export default AuthProvider;