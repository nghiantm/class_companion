import { Grid } from "@mui/material";
import { DefaultSidebar } from "../components/Sidebar";
import Create from "../components/Home/Create";
import TopBanner from "../components/TopBanner.jsx";

export default function Home() {
    return (
        <Grid container className={"h-full bg-[#f0f0f0]"}>
            <Grid item xs={3} className={""}>
                <DefaultSidebar />
            </Grid>

            <Grid item xs={9} className="relative">
                <TopBanner />
                <div className={"h-full flex justify-center items-center"}>
                    <Create />
                </div>
            </Grid>
        </Grid>
    )
}