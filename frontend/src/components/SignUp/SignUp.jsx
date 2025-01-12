import { useEffect, useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import {Grid, Link} from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../firebase";
import SignUpField from "./SignUpField.jsx";
import ImageBox from "../SignIn/ImageBox.jsx";
import logo from "../../assets/book.png";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    const handleFieldChange = (event) => {
        event.preventDefault();
        switch (event.target.id) {
            case 'email':
                setEmail(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerWithEmailAndPassword(email, password);
    }
    
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className="h-screen">
        <Grid container className="h-full">
            <Grid item xs={6} className="h-full flex justify-end items-center overflow-hidden">
                <ImageBox />
            </Grid>

            <Grid item xs={6} className={"relative"}>
                <div className="absolute left-1/2 mt-4">
                    <div className={"relative flex -left-1/2 gap-2"}>
                        <img src={logo} alt={"logo"} width={30}/>
                        <p className="font-logo text-2xl">Study Buddy</p>
                    </div>
                </div>

                <form className={"h-full flex flex-col justify-center"}>
                    <SignUpField
                        passwordShown={passwordShown}
                        togglePasswordVisiblity={togglePasswordVisiblity}
                        handleFieldChange={handleFieldChange}
                        handleSubmit={handleSubmit}
                    />
                </form>
            </Grid>
        </Grid>
        </div>
    );
}