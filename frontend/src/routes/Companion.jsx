import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Textarea, Typography } from "@material-tailwind/react";
import { Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Companion() {
    const { sessionName } = useParams();
    const description = useSelector((state) => state.companion.description);
    const [transcription, setTranscription] = useState('');
    const questions = useSelector((state) => state.companion.questions)
    const [openSubmit, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpen = () => setOpen(!openSubmit);
    const handleOpenDelete = () => {
        setOpenDelete(!openDelete);
        console.log("click");
    }

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

    const handleSubmit = () => {
        handleOpen();
        console.log("SUBMITED")
    }

    const handleReset = () => {
        handleStopListening();
        setTranscription("");
        handleOpenDelete();
    }

    const test = () => {
        
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
                    value={transcription}
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
                    value={transcription}
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
                <Button onClick={handleOpen} className="rounded-xl">
                    <CheckIcon />
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
                <Typography className="pt-8 pl-4 text-lg font-bold">
                    Session's Name: <span className="text-[#007348]">{sessionName}</span>
                </Typography>

                <Typography className="pl-4 text-lg font-bold">
                    Description: <span className="text-[#007348]">{description}</span>
                </Typography>
            </Grid>
        </Grid>
    )
}