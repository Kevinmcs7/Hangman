import { useState } from "react";

interface HangmanProps {
    words: string[];
}

const Hangman = ({ words }: HangmanProps) => {
    const [selectedWord, setSelectedWord] = useState(words[0]);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [errorCount, setErrorCount] = useState(0);

    const displayWord = selectedWord.split('').map((letter, index) => {
        console.log("selectedWord", selectedWord);
        if (guessedLetters.includes(letter)) {
            console.log("guessedLetter", guessedLetters);
            return letter;
        } else {
            return "_";
        }
    });

    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount(errorCount + 1);
                console.log("setErrorCount", errorCount);
            }
        }
    };

    const restartGame = () => {
        const newWordIndex = Math.floor(Math.random() * words.length);
        const newWord = words[newWordIndex];
        setSelectedWord(newWord);
        setGuessedLetters([]);
        setErrorCount(0);
    };

    return (
        <div className="hangman-container">
            <p className="display-word">{displayWord.join(' ')}</p>
            <input 
                maxLength={1} 
                onChange={(e) => handleGuess(e.target.value)} 
                className="guess-input"
            />
            {(displayWord.join('') === selectedWord || errorCount > 5) && (
                <button 
                    onClick={() => {
                        restartGame();
                        setSelectedWord(words[Math.floor(Math.random() * words.length)]);
                    }}
                    className="new-word-button"
                >
                    Select New Word
                </button>
            )}
            <p className="error-count">Cantidad de errores {errorCount}</p>
            {displayWord.join('') === selectedWord && (
                <p className="win-message">You won this round!</p>
            )}
        </div>
    );
    
}

export default Hangman;