import React, { createContext, use, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const axiosPublic = useAxiosPublic(); 

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const [dbUser, setDbUser] = useState(null);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);

        if (currentUser) {
            const userInfo = { email: currentUser.email };
            
            // 1. Get Token and save to LocalStorage
            const tokenRes = await axiosPublic.post('/jwt', userInfo);
            if (tokenRes.data.token) {
                localStorage.setItem('access-token', tokenRes.data.token);
                
                // 2. ONLY AFTER token is saved, get DB user
                const dbRes = await axios.get(`http://localhost:5000/users/${currentUser.email}`);
                setDbUser(dbRes.data);
            }
        } else {
            localStorage.removeItem('access-token');
            setDbUser(null);
        }
        setLoading(false);
    });
    return () => unsubscribe();
}, []);


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        dbUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;