import { useState, createContext, useEffect } from 'react';
import app from '../firebase/firebase.config';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(false);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            console.log('Current User:', currentUser);
            setLoading(false);
            if(currentUser){
                axios.post('https://backend-car-doctor.vercel.app/jwt', loggedUser, { withCredentials: true})
                .then(res => console.log('token response: ',res.data));
            }
            else{
                axios.post('https://backend-car-doctor.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(res => console.log(res.data))
            }
        });

        return () => unSubscribe();

    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;
