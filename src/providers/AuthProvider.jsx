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
        // Clear the token immediately when the user clicks logout
        localStorage.removeItem('access-token');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                // 1. Fetch User Data from MongoDB
                // Make sure the URL matches your backend route precisely
                axios.get(`https://eduflow-server-ten.vercel.app/users/${currentUser.email}`)
                    .then(res => {
                        setDbUser(res.data);
                        // CRITICAL: Only stop loading after we have the data
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error("Error fetching user data:", err);
                        setLoading(false);
                    });

                // 2. JWT handling (Runs in background)
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);

                            // AUTO LOGOUT LOGIC (1 Hour)
                            const payload = JSON.parse(atob(res.data.token.split('.')[1]));
                            const timeLeft = (payload.exp * 1000) - Date.now();
                            setTimeout(() => { logOut(); }, timeLeft);
                        }
                    });
            } else {
                setDbUser(null);
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        setLoading,
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