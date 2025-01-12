import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import SignInField from "./SignInField";
import { Grid } from "@mui/material";
import logo from '../../assets/book.png';
import ImageBox from "./ImageBox.jsx";

export default function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user] = useAuthState(auth);
    const [passwordShown, setPasswordShown] = useState(false);
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
        logInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className="h-screen bg-[#fdfdfd]">
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
                    <form className="h-full flex flex-col justify-center">
                        <SignInField
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