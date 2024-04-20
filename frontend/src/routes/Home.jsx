import { Grid } from "@mui/material";
import { DefaultSidebar } from "../components/Sidebar";
import Create from "../components/Home/Create";

export default function Home() {
    return (
        <Grid container>
            <Grid item xs={3}>
                <DefaultSidebar />
            </Grid>

            <Grid item xs={9} className="flex justify-center items-center bg-[#f0f0f0]">
                <Create />
            </Grid>
        </Grid>
    )
}