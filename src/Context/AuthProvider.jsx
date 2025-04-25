import React, {createContext, useEffect, useState} from 'react';

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut, signInWithPopup,
    sendPasswordResetEmail,
    GoogleAuthProvider
} from "firebase/auth";
import { doc,getDoc , setDoc } from "firebase/firestore";
export const AuthProviderContext = createContext({})
import {auth, db, GoogleAuth} from "../Firebase-config/firebase.js";
import {useCookies} from "react-cookie";

function AuthProvider({children}) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [User, setUser] = useState(null)
    const ALLOWED_ROLE = ["admin", "developer"]
    const [Error, SetError]=useState(null)
    const [loading,setloading]=useState({
        email:false,
        google:false
    })



    const toggleLoading=(emailState,googleState)=>{
        setloading({
            email: emailState,
            google: googleState
        })
    }
    const IfUserExist=async (uid)=>{
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);
        return {data:docSnap.data(),isExist:docSnap.exists()};
    }
    const auth = getAuth();
    async function FetchUser() {

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && cookies.token) {
                setUser((await IfUserExist(user?.uid)).data)
            } else {
                removeCookie("token")
                setUser("")
            }
        });

        return () => {
            unsubscribe()
        }
    }

    useEffect(() => {
        FetchUser().then()
    }, [cookies])


    const Login = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        toggleLoading(true,false)
        try {
            const EmailResult =await signInWithEmailAndPassword(auth, email,password)
            const user = EmailResult.user

            if ((await IfUserExist(user?.uid)).isExist){
                setCookie("token",user?.refreshToken)
                console.log("permission access")
                SetError(null)
            }else {
                console.log("permission denied")
                SetError({
                    code:0,
                    message:"Invalid Credentials"
                })
            }
        }catch (error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            SetError({
                errorCode,
                errorMessage
            })
        }finally {
            toggleLoading(false,false)
        }
    }

    const Logout = () => {
        signOut(auth).then(() => {
            setUser(undefined)
            removeCookie("token")
        }).catch((error) => {
            alert(error.message)

        });
    }
//TODO PASS THE NEW PASSWORD AND CODE AND AUTH
    const ForgotPassword = () => {
        const actionCodeSettings = {
            url: 'http://localhost:5173/',
            handleCodeInApp: false
        };
        sendPasswordResetEmail(auth, "baldwinnicoa@gmail.com",actionCodeSettings)
            .then((res) => {
                console.log(res)
            alert("email send to baldwinnicoa@gmail.com")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorCode)
            });
    }

    const GoggleAuthentication = async () => {
        SetError(null)
        toggleLoading(false,true)
        try {
            const GOOGLE_AUTH_RESULT=await signInWithPopup(auth, GoogleAuth)
            const credential = GoogleAuthProvider.credentialFromResult(GOOGLE_AUTH_RESULT);
            const token = credential.accessToken;
            const user = GOOGLE_AUTH_RESULT.user;
            if ((await IfUserExist(user?.uid)).isExist){
                setCookie("token",user?.refreshToken)
                console.log(await IfUserExist(user?.uid))
                SetError(null)
            }else {
                console.log("permission denied")
                SetError({
                    code:0,
                    message:"Invalid Credentials"
                })
            }

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            console.log(errorCode)
            const credential = GoogleAuthProvider.credentialFromError(error);
            SetError({
                code:error.code,
                message:"Something went wrong"
            })
        }finally {
            toggleLoading(false,false)
        }
    }

    return (
        <AuthProviderContext.Provider value={{User,Error,loading, Login, Logout,ForgotPassword, GoggleAuthentication, ALLOWED_ROLE}}>
            {children}
        </AuthProviderContext.Provider>
    );
}

export default AuthProvider;