import { Grid } from "@mui/material";
import { DefaultSidebar } from "../components/Sidebar";
import { useEffect } from "react";

export default function Archive() {
    useEffect(() => {

    }, [])

    return (
        <Grid container>
            <Grid item xs={3}>
                <DefaultSidebar />
            </Grid>

            <Grid item xs={9}>
                123
            </Grid>
        </Grid>
    )
}