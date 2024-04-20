import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function CompanionBar(  ) {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    const handleBack = () => {
        if (pathname.startsWith("/companion/")) {
            navigate("/");
        }
    }

    return (
        <div
            className={clsx(
                "sticky w-screen flex justify-between items-center px-8 h-16 bg-[#007348]"
            )}
        >
            <div className="grow">
                <Button 
                    onClick={handleBack}
                    className="bg-[#c99c39]"
                >
                    Back
                </Button>
            </div>

            <p className={clsx(
                "font-logo mt-1 text-xl text-[#ffffff]"
            )}>
                Class Companion
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
