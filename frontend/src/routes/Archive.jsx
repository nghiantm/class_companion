import { Grid } from "@mui/material";
import { DefaultSidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { generateQuizAsync, getAllSessionsAsync } from "../redux/actions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import MyLoading from "../components/MyLoading";
import ArchiveCard from "../components/Archive/ArchiveCard";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Textarea, Typography } from "@material-tailwind/react";
import TopBanner from "../components/TopBanner";

export default function Archive() {
    const [user, loading, error] = useAuthState(auth);
    const sessions = useSelector((state) => state.archive.sessions);
    const name = useSelector((state) => state.archive.name);
    const summary = useSelector((state) => state.archive.summary);
    const transcript = useSelector((state) => state.archive.transcript);
    const summaryLoading = useSelector((state) => state.archive.summaryLoading);
    const quizLoading = useSelector((state) => state.archive.quizLoading);
    const quiz = useSelector((state) => state.archive.quiz);
    const dispatch = useDispatch();
    const [openSummary, setOpenSummary] = useState(false);
    const handleOpen = () => setOpenSummary(!openSummary);

    useEffect(() => {
        if (user) {
            dispatch(getAllSessionsAsync(user.email));
        }
    }, [user])

    useEffect(() => {
        if (transcript && name) {
            dispatch(generateQuizAsync(transcript))
        }
    }, [name])

    return sessions && sessions.length ? (
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
                                description={
                                    session.description.length < 55 
                                        ? (session.description)
                                        : (session.description.substring(0, 55) + "...")
                                }
                                handleSummaryClick={handleOpen}
                                email={user.email}
                            />
                        )
                    })
                }
                </div>

                <Dialog size="xl" className="max-h-5/6" open={openSummary} handler={handleOpen} >
                    <DialogHeader>Session's Name: {name}</DialogHeader>
                    <DialogBody>
                        {
                            summaryLoading && quizLoading
                                ? <MyLoading />
                                : (
                                    <Grid container spacing={4}>
                                        <Grid item xs={6}>
                                            <Typography className="font-bold text-lg">Summary</Typography>
                                            <Textarea 
                                                rows={12}
                                                disabled
                                                value={summary}
                                                className="rounded-xl text-[#000000] text-xl"
                                            />

                                            <Typography className="font-bold text-lg">Transcript</Typography>
                                            <Textarea 
                                                rows={4}
                                                disabled
                                                value={transcript}
                                                className="rounded-xl text-[#000000] text-xl"
                                            />
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Typography className="font-bold text-lg">Some questions to consider</Typography>
                                            {
                                                quiz ? (
                                                    <Typography className="mt-2 whitespace-pre-line text-lg text-[#000]">
                                                        {quiz}
                                                    </Typography>
                                                ) : <MyLoading />
                                            }
                                        </Grid>
                                    </Grid>
                                )
                        }
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={handleOpen}>
                            Close
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Grid>
        </Grid>
    ) : (
        <>
            {
                sessions && sessions.length === 0 ? (
                    <Grid container>
                        <Grid item xs={3}>
                            <DefaultSidebar />
                        </Grid>

                        <Grid item xs={9}>
                            <Typography className="text-2xl font-bold mt-4">No sessions found!</Typography>
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
                )}
        </>
    )
}