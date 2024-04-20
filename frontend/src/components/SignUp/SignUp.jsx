import { useEffect, useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../firebase";

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
        <div className="h-full flex flex-col justify-center">
            <div className="text-center p-8">
            <Typography variant="h3" color="blue-gray" className="mb-2 text-[#007348]">
                Sign Up
            </Typography>
            <div className="mx-auto max-w-[24rem] text-left">
                <div className="mb-6">
                    <label htmlFor="email">
                    <Typography
                        variant="small"
                        className="mb-2 block font-medium text-gray-900"
                    >
                        Your Email
                    </Typography>
                    </label>
                    <Input
                        id="email"
                        color="gray"
                        size="lg"
                        type="email"
                        name="email"
                        onChange={handleFieldChange}
                        placeholder="name@mail.com"
                        variant="standard"
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    />
                </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                        <Typography
                            variant="small"
                            className="mb-2 block font-medium text-gray-900"
                        >
                            Password
                        </Typography>
                        </label>
                        <Input
                        size="lg"
                        placeholder="********"
                        id="password"
                        name="password"
                        onChange={handleFieldChange}
                        variant="standard"
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                        type={passwordShown ? "text" : "password"}
                        icon={
                            <i onClick={togglePasswordVisiblity}>
                            {passwordShown ? (
                                <EyeIcon className="h-5 w-5" />
                            ) : (
                                <EyeSlashIcon className="h-5 w-5" />
                            )}
                            </i>
                        }
                        />
                    </div>
                    <Button 
                        color="gray" 
                        size="lg" 
                        className="mt-6 bg-[#007348]" 
                        onClick={handleSubmit}
                        fullWidth
                    >
                        sign up
                    </Button>

                    <Typography
                        variant="small"
                        color="gray"
                        className="mt-4 text-center font-normal"
                    >
                        Already registered?{" "}
                        <Link href={"/sign-in"} className="font-medium text-gray-900">
                        Sign in
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
        </div>
    );
}