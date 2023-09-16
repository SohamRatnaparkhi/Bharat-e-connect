import Button from '@/app/components/Button';
import React, { useEffect, useRef } from 'react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import 'regenerator-runtime/runtime'


const Transcript = () => {
    const {
        transcript,
        finalTranscript,
        resetTranscript,
        interimTranscript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const textBodyRef = useRef(null);
    const [currCaption, setCurrCaption] = React.useState("");
    // if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesn&apos;t support speech recognition.</span>;
    // }

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
        });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
    };

    return (
        <>
            <div>
                {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
                <pre>Caption controls: </pre>
                <Button onClick={startListening}>Start</Button>
                <Button onClick={stopListening}>Stop</Button>
                <Button onClick={resetTranscript}>Reset</Button>
                <div
                    className="mx-auto text-center"
                    contentEditable
                    ref={textBodyRef}
                    suppressContentEditableWarning={true}
                >
                    transcript: {transcript}
                    <br />
                    finalTranscript: {finalTranscript}
                    <br />
                    Captions: {interimTranscript}
                </div>
            </div>
        </>
    )
}

export default Transcript