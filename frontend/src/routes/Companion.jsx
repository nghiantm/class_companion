import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Textarea, Typography } from "@material-tailwind/react";
import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { generateQuestionAsync, generateSummaryAsync } from "../redux/actions";
import { clearName, clearQuestions, clearSummary } from "../redux/slices/companionSlice";
import { demoText } from "../utils/prompt";
import { updateSession } from "../apis/apiClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Companion() {
    const [user, loading, error] = useAuthState(auth);
    const { sessionName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const description = useSelector((state) => state.companion.description);
    const questions = useSelector((state) => state.companion.questions);
    const summary = useSelector((state) => state.companion.summary);
    const questionLoading = useSelector((state) => state.companion.questionLoading);
    const summaryLoading = useSelector((state) => state.companion.summaryLoading);

    const [transcription, setTranscription] = useState('');
    const [openSubmit, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpen = () => setOpen(!openSubmit);
    const handleOpenDelete = () => setOpenDelete(!openDelete);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        alert("Browser doesn't support speech recognition");
    }

    useEffect(() => {
        if (listening) {
            setTranscription(transcript);
        }
    }, [transcript, listening])

    const handleStopListening = () => {
        setTranscription(transcript);
        SpeechRecognition.stopListening();
        resetTranscript();
    }

    const handlePauseListening = () => {
        setTranscription(transcript);
        SpeechRecognition.stopListening();
    }

    const handleStartListening = () => {
        SpeechRecognition.startListening({
            language: "en-US",
            continuous: true
        });
    }

    const handleSubmit = async () => {
        await updateSession(
            user.email,
            sessionName,
            description,
            summary,
            transcription
        )
        handleOpen();
        handleStopListening();
        setTranscription("");
        dispatch(clearQuestions());
        dispatch(clearSummary());
        dispatch(clearName());
        navigate("/archive");
    }

    const handleReset = () => {
        handleStopListening();
        setTranscription("");
        dispatch(clearQuestions());
        dispatch(clearSummary());
        handleOpenDelete();
    }

    const handleIdea = () => {
        dispatch(generateQuestionAsync(transcription));
        dispatch(generateSummaryAsync(transcription));
    }

    const handleDemo = () => {
        handleStopListening();
        setTranscription("");
        dispatch(clearQuestions());
        dispatch(clearSummary());
        setTranscription(demoText());
    }

    return (
        <Grid container spacing={4} className="px-16 py-4">
            <Grid item xs={12} sm={6}>
                <Typography className="font-bold">Ask these questions!</Typography>
                <Textarea
                    rows={13}
                    disabled
                    variant="static"
                    placeholder="Awaiting questions"
                    value={
                        questionLoading ? "Loading" : questions
                    }
                    fullWidth
                    className="text-[#000] rounded-xl p-4 text-[#000000] text-xl"
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography className="font-bold">Here's your current summary</Typography>
                <Textarea
                    rows={13}
                    disabled
                    variant="static"
                    placeholder="Awaiting summary"
                    value={
                        summaryLoading ? "Loading" : summary
                    }
                    fullWidth
                    className="text-[#000] rounded-xl p-4 text-[#000000] text-xl"
                />
            </Grid>

            <Grid item xs={12} className="flex gap-8 justify-center">
                <Button
                    onClick={handleOpenDelete}
                    className={`bg-[#c95438] rounded-xl`}
                >
                    <DeleteForeverIcon />
                </Button>
                <Button
                    onClick={listening ? handlePauseListening : handleStartListening}
                    className={`${listening ? 'bg-red-500' : ''} rounded-xl`}
                >
                    <KeyboardVoiceIcon/>
                </Button>
                <Button className="rounded-xl bg-[#007348]" onClick={handleIdea}>
                    <TipsAndUpdatesIcon />
                </Button>

                <Dialog open={openSubmit} handler={handleOpen}>
                    <DialogHeader className="text-[#007348]">Submit Confirmation</DialogHeader>
                    <DialogBody className="font-semibold">Do you want to end the lecture?</DialogBody>
                    <DialogFooter className="gap-4">
                        <Button className="bg-[#c95439]" onClick={handleSubmit}>
                            Yes
                        </Button>
                        <Button onClick={handleOpen}>
                            No
                        </Button>
                    </DialogFooter>
                </Dialog>

                <Dialog open={openDelete} handler={handleOpenDelete}>
                    <DialogHeader className="text-[#007348]">Reset Confirmation</DialogHeader>
                    <DialogBody className="font-semibold">Do you want to reset the lecture?</DialogBody>
                    <DialogFooter className="gap-4 ">
                        <Button className="bg-[#c95439]" onClick={handleReset}>
                            Yes
                        </Button>
                        <Button onClick={handleOpenDelete}>
                            No
                        </Button>
                    </DialogFooter>
                </Dialog>
            </Grid>

            <Grid item xs={12} md={6}>
                <Typography className="font-bold">Live transcript:</Typography>
                <Textarea
                    rows={6}
                    disabled
                    variant="static"
                    placeholder="Awaiting lecture recording"
                    value={transcription}
                    className="p-4 rounded-xl"
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <div className="pt-8 pl-4 spa">
                    <Typography className="text-lg font-bold">
                        Session's Name: <span className="text-[#007348]">{sessionName}</span>
                    </Typography>

                    <Typography className="text-lg font-bold">
                        Description: <span className="text-[#007348]">{description}</span>
                    </Typography>

                    <div className="flex justify-between">
                        <Button onClick={handleOpen} className="mt-4 w-36 h-12 rounded-xl bg-[#c95438]">
                            End lesson
                        </Button>

                        <Button onClick={handleDemo} className="mt-4 w-24 h-12 rounded-xl">
                            Demo
                        </Button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}