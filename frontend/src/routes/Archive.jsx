import { Grid } from "@mui/material";
import { DefaultSidebar } from "../components/Sidebar";
import { useEffect } from "react";
import { getAllSessionsAsync } from "../redux/actions/companionAction";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

export default function Archive() {
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getAllSessionsAsync(user.email));
        }
    }, [user])

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