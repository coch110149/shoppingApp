import { useEffect, useState } from "react"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


import { IonButton, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from "@ionic/react";

const AuthPage = ({user}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authMode, setAuthMode] = useState('login');
    const auth = getAuth();


    const handleAuthModeChange = (mode: string | undefined) => {
        if (mode) {
            setAuthMode(mode);
        }
    };

    const handleLogin = async () => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.error(error)
        }
    };

    const handleRegister = async () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    console.log(error)
                });
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{authMode === 'login' ? 'Login' : 'Register'}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonSegment value={authMode} onIonChange={e => handleAuthModeChange(e.detail.value)}>
                    <IonSegmentButton value="login">
                        <IonLabel>Login</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="register">
                        <IonLabel>Register</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <IonInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onIonChange={e => setEmail(e.detail.value!)}
                />
                <IonInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onIonChange={e => setPassword(e.detail.value!)}
                />

                <IonButton expand="full" onClick={authMode === 'login' ? handleLogin : handleRegister}>
                    {authMode === 'login' ? "Login" : "Register"}
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AuthPage;
