import { Grid } from "@mui/material";
import { DefaultSidebar } from "../components/Sidebar";
import { useEffect } from "react";
import { getAllSessionsAsync } from "../redux/actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import MyLoading from "../components/MyLoading";
import ArchiveCard from "../components/Archive/ArchiveCard";

export default function Archive() {
    const [user, loading, error] = useAuthState(auth);
    const sessions = useSelector((state) => state.archive.sessions);
    console.log(sessions);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            dispatch(getAllSessionsAsync(user.email));
        }
    }, [user])

    return sessions.length ? (
        <Grid container>
            <Grid item xs={3}>
                <DefaultSidebar />
            </Grid>

            <Grid item xs={9} className="bg-[#f0f0f0]">
                <div className="flex flex-wrap">
                {
                    sessions.map((session, index) => {
                        return (
                            <ArchiveCard 
                                key={index} 
                                name={session.name}
                                description={session.description.substring(0, 55) + "..."}
                            />
                        )
                    })
                }
                </div>
            </Grid>
        </Grid>
    ) : (
        <Grid container>
            <Grid item xs={3}>
                <DefaultSidebar />
            </Grid>

            <Grid item xs={9}>
                <MyLoading />
            </Grid>
        </Grid>
    )
}