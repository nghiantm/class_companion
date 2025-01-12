import { Avatar } from "@material-tailwind/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function TopBanner() {
    return (
        <div className={"absolute w-full bg-[#fdfdfd] border-l border-[#f0f0f0] py-3"}>
            <div className={"flex justify-end items-center mr-8"}>
                <NotificationsIcon className={"text-[#a0a0a0] mr-6"}/>

                <Avatar
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRPtvkGkDYnVSDqutl3CZtIqBN9ZNNUGReE2YtzgzeQ&s"}
                    alt={"stewie"}
                    size={"sm"}
                    className={"mr-1"}
                />
                <KeyboardArrowDownIcon className={"text-[#a0a0a0]"} fontSize={"sm"}/>
            </div>
        </div>
    )
}