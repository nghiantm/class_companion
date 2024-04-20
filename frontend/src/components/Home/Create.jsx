import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { initSessionAsync } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
   
export default function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxName = useSelector((state) => state.companion.name);
    const [user, loading, error] = useAuthState(auth); 
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    
    const handleSubmit = () => {
        const formatedName = formatText(name);
        const email = user.email;
        dispatch(initSessionAsync(email, formatedName, desc));
    }

    useEffect(() => {
        if (reduxName) {
            navigate(`/companion/${reduxName}`);
        }
    }, [reduxName])

    return (
        <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
                Create a companion session
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Lecture's Name
                    </Typography>

                    <Input
                        size="lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="CS-164 Week 1"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        required
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        containerProps={{
                            className: "bg-[#fff] rounded-md"
                        }}
                    />
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                        Descriptions
                    </Typography>

                    <Input
                        size="lg"
                        placeholder="Recursion"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        containerProps={{
                            className: "bg-[#fff] rounded-md"
                        }}
                    />
                    
                </div>
                
                <Button className="mt-6 bg-[#007348]" fullWidth onClick={handleSubmit}>
                    Create
                </Button>
            </form>
        </Card>
    );
}

function formatText(text) {
    // Convert the text to lowercase
    const lowercaseText = text.toLowerCase();
    
    // Replace all spaces with underscores
    const formattedText = lowercaseText.replace(/\s+/g, '_');
    
    return formattedText;
}