import React, { useState, useEffect } from 'react';
import MicIcon from '@mui/icons-material/Mic';

const Spttxt = ({SpeechToText}) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    console.log('Component Rendered');

    const createRecognitionInstance = () => {
      const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = 'hi-IN'; // Set language to Hindi

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setRecognizedText(transcript);
        SpeechToText(transcript)
      };

      setRecognition(recognitionInstance);
    };

    if (!recognition) {
      createRecognitionInstance();
    }

    return () => {
      console.log('Cleaning Up');
      // Clean up: stop recognition and reset the instance when the component is unmounted
      if (recognition) {
        recognition.stop();
        setRecognition(null);
      }
    };
  }, [recognition, setRecognizedText]);

  const startRecognition = () => {
    if (recognition) {
      recognition.start();
    }
  };

  return (
    <>
      <button onClick={startRecognition} className="btn button">
        <MicIcon />
      </button>
      {/* <p>Recognized Text: {recognizedText}</p> */}
    </>
  );
};

export default Spttxt;
