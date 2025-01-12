import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import BackpackIcon from '@mui/icons-material/Backpack';
import { logout } from "../firebase";
import logo from "../assets/book.png";
   
export function DefaultSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const isCompanion = currentPath === "/";
    const isArchive = currentPath === "/archive";
    const isPractice = currentPath === "/practice";

    const handleLogout = () => {
        logout();
        navigate("/sign-in")
    }

    return (
        <Card className="h-screen w-full p-4 shadow-lg shadow-blue-gray-900/5 bg-[#fdfdfd] rounded-none">
            <div className={"flex justify-center gap-2"}>
                <img src={logo} alt={"logo"} width={30}/>
                <p className="font-logo text-[#0d0d0d] text-2xl">Study Buddy</p>
            </div>

            <List className={"mt-2 flex flex-grow flex-col"}>
                <div className={"flex-grow"}>
                    <ListItem
                        className={`${isCompanion ? 'bg-[#f0f0f0] text-[#000000]' : 'text-[#a0a0a0]'}`}
                        onClick={() => navigate("/")}
                    >
                        <ListItemPrefix>
                            <SmartToyOutlinedIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        Companion
                    </ListItem>

                    <ListItem
                        className={`${isArchive ? 'bg-[#f0f0f0] text-[#000000]' : 'text-[#a0a0a0]'}`}
                        onClick={() => navigate("/archive")}
                    >
                        <ListItemPrefix>
                            <BackpackIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        Session's Archive
                    </ListItem>

                    {/*
                    <ListItem
                        className={`${isArchive ? 'bg-[#f0f0f0] text-[#000000]' : 'text-[#a0a0a0]'}`}
                        onClick={() => navigate("/archive")}
                    >
                        <ListItemPrefix>
                            <LocalLibraryIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        Practice
                    </ListItem>
                    */}
                </div>

                <ListItem
                    className={`text-[#a0a0a0]`}
                >
                    <ListItemPrefix>
                        <SettingsIcon className="h-5 w-5"/>
                    </ListItemPrefix>
                    Setting
                </ListItem>

                <ListItem
                    className={`text-[#a0a0a0]`}
                    onClick={handleLogout}
                >
                    <ListItemPrefix>
                        <PowerSettingsNewOutlinedIcon className="h-5 w-5"/>
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}