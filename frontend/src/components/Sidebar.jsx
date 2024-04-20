import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    ShoppingBagIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { logout } from "../firebase";
   
export function DefaultSidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const isCompanion = currentPath === "/";
    const isArchive = currentPath === "/archive";
    const isPractice = currentPath === "/practice";

    const handleLogout = (e) => {
        logout();
        navigate("/sign-in")
    }

    return (
        <Card className="h-screen w-full p-4 shadow-xl shadow-blue-gray-900/5 bg-[#007348] rounded-none">
        <div className="mb-2 p-4">
            <Typography variant="h5" color="white" className="font-logo">
            Class Companion
            </Typography>
        </div>
        <List>
            <ListItem 
                className={`${isCompanion ? 'bg-[#ffffff]' : 'text-[#ffffff]'}`}
                onClick={() => navigate("/")}
            >
                <ListItemPrefix>
                    <SmartToyOutlinedIcon className="h-5 w-5"/>
                </ListItemPrefix>
                Companion
            </ListItem>

            <ListItem 
                className={`${isArchive ? 'bg-[#ffffff]' : 'text-[#ffffff]'}`}
                onClick={() => navigate("/archive")}
            >
                <ListItemPrefix>
                    <SmartToyOutlinedIcon className="h-5 w-5"/>
                </ListItemPrefix>
                Session's Archive
            </ListItem>

            <ListItem 
                className={`${isPractice ? 'bg-[#ffffff]' : 'text-[#ffffff]'}`}
                onClick={() => navigate("/practice")}
            >
                <ListItemPrefix>
                    <ModelTrainingIcon className="h-5 w-5" />
                </ListItemPrefix>
                Practice
            </ListItem>
            
            <ListItem
                className={`text-[#ffffff]`}
                onClick={handleLogout}
            >
                <ListItemPrefix>
                    <PowerSettingsNewOutlinedIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
            </ListItem>
        </List>
        </Card>
    );
}