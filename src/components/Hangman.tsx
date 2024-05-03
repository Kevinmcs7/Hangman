import React, { useState, useEffect } from "react";

interface HangmanProps {
    words: string[];
}

const Hangman = ({ words }: HangmanProps) => {
    const [selectedWord, setSelectedWord] = useState(words[0]);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [errorCount, setErrorCount] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (timerRunning) {
            intervalId = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
            console.log("Temporizador iniciado");
        }

        return () => clearInterval(intervalId);
    }, [timerRunning]);

    useEffect(() => {
        // Iniciar el temporizador cuando el componente se monta por primera vez
        setTimerRunning(true);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} min ${remainingSeconds} seg`;
    };

    const displayWord = selectedWord
        .split("")
        .map((letter, index) =>
            guessedLetters.includes(letter) ? letter : "_"
        );

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key.toLowerCase();
        console.log("Tecla presionada:", key);
        if (/^[a-z]$/.test(key)) {
            handleGuess(key);
        }
    };

    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount(errorCount + 1);
            }
        }
    };

    const restartGame = () => {
        const newWordIndex = Math.floor(Math.random() * words.length);
        const newWord = words[newWordIndex];
        setSelectedWord(newWord);
        setGuessedLetters([]);
        setErrorCount(0);
        setElapsedTime(0); // Reiniciar el tiempo transcurrido
    };

    return (
        <div className="hangman-container">
            <p className="display-word">{displayWord.join(" ")}</p>
            <input 
                type="text"
                maxLength={1} 
                onKeyPress={handleKeyPress}
                className="guess-input"
            />
            {(displayWord.join("") === selectedWord || errorCount > 5) && (
                <button 
                    onClick={() => {
                        restartGame();
                        setSelectedWord(
                            words[Math.floor(Math.random() * words.length)]
                        );
                    }}
                    className="new-word-button"
                >
                    Select New Word
                </button>
            )}
            <p className="error-count">Cantidad de errores: {errorCount}</p>
            {displayWord.join("") === selectedWord && (
                <p className="win-message">¡Has ganado esta ronda!</p>
            )}
            <p className="elapsed-time">Tiempo transcurrido: {formatTime(elapsedTime)}</p>
        </div>
    );
};

export default Hangman;
