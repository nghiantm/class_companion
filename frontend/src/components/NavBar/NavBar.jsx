import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { clearName } from "../../redux/slices/companionSlice";

function CompanionBar(  ) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pathname = location.pathname;

    const handleBack = () => {
        if (pathname.startsWith("/companion/")) {
            dispatch(clearName());
            navigate("/");
        }
    }

    return (
        <div
            className={clsx(
                "sticky w-screen flex justify-between items-center px-8 h-16 bg-[#080325]"
            )}
        >
            <div className="grow">
                <Button 
                    onClick={handleBack}
                    className="bg-[#4F46E5]"
                >
                    Back
                </Button>
            </div>

            <p className={clsx(
                "font-inter italic mt-1 text-xl text-[#ffffff]"
            )}>
                Study Buddy
            </p>
        </div>
    )
}

export default function NavBar() {
    const location = useLocation();
    const pathname = location.pathname;
    const shouldRenderNavBar = 
        pathname.startsWith('/companion/');
    
    return (shouldRenderNavBar) ? (
        <>
            <CompanionBar />
        </>
    ) : null;
}
