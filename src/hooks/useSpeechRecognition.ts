import { useEffect, useState } from 'react'

declare global {
    interface Window {
        webkitSpeechRecognition: typeof webkitSpeechRecognition
    }

    class webkitSpeechRecognition extends EventTarget {
        continuous: boolean
        lang: string
        start(): void
        stop(): void
        onresult: (event: SpeechRecognitionEvent) => void
        onerror: (event: Event) => void
        onaudiostart: () => void
        onsoundstart: () => void
        onsoundend: () => void
        onspeechstart: () => void
        onspeechend: () => void
    }

    interface SpeechRecognitionEvent extends Event {
        results: {
            [index: number]: {
                [index: number]: {
                    transcript: string
                }
            }
        }
    }
}

let recognition: any = null

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'ru-RU'
}

const useSpeechRecognition = () => {
    const [text, setText] = useState<string>('')
    const [isListening, setIsListening] = useState<boolean>(false)

    useEffect(() => {
        if (!recognition) return
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log('onres event: ', event)
            setText(event.results[0][0].transcript)
            recognition.stop()
            setIsListening(false)
        }
    }, [])

    const startListening = () => {
        setText('')
        setIsListening(true)
        recognition.start()
    }

    const stopListening = () => {
        setIsListening(false)
        recognition.stop()
    }

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    }
}

export default useSpeechRecognition
