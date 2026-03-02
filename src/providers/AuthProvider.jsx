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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            


            // If user exists, fetch their extra info from MongoDB
            if (currentUser?.email) {
                axios.get(`http://localhost:5000/users/${currentUser.email}`)
                    .then(res => {
                        setDbUser(res.data);
                        setLoading(false);
                    });
            } else {
                setDbUser(null);
                setLoading(false);
            }

            //jwt token handling
            if (currentUser) {
                const userInfo = {
                    email: currentUser.email
                }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                        else {
                            localStorage.removeItem('access-token');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
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