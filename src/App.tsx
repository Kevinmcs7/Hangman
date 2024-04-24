import React, { useState } from 'react';
import Hangman from './components/Hangman';
import Welcome from './components/Welcome';

const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi'];
const animals = ['monkey', 'dog', 'cat', 'elephant', 'tiger', 'lion', 'giraffe', 
    'zebra', 'bear', 'wolf', 'fox', 'panda', 'kangaroo', 'koala', 'rhinoceros', 
    'leopard', 'cheetah'
];
const countries = [
    'canada', 'mexico', 'brazil', 'argentina', 'colombia', 'chile',
    'france', 'germany', 'spain', 'italy', 'netherlands',
    'japan', 'china', 'india', 'australia', 'egypt',
    'russia', 'turkey'];
const colors = [
    'red', 'blue', 'pink', 'green', 'black', 'white',
    'yellow', 'orange', 'purple', 'gray', 'teal', 'turquoise',
    'brown', 'magenta', 'indigo', 'lavender', 'coral', 'aqua'
];
const everydayObjects = [
    'book', 'pen', 'chair', 'table', 'lamp', 'cup', 'plate',
    'spoon', 'fork', 'knife', 'phone', 'watch', 'glasses',
    'pillow', 'blanket', 'towel', 'broom', 'toothbrush',
    'comb', 'scissors', 'wallet', 'bag', 'key', 'shoe',
    'hat', 'jacket', 'pants', 'shirt', 'socks', 'belt'
];

const categories = [words, animals, countries, colors, everydayObjects];
const randomIndex = Math.floor(Math.random() * categories.length);
const randomCategory = categories[randomIndex];

function App() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Welcome palabra={randomIndex} /> {/* Pasamos el índice de la lista seleccionada como prop */}
            {!isPlaying && (
                <button className="play-button" onClick={() => setIsPlaying(true)}>Jugar</button>
            )}
            {isPlaying && (
                <Hangman words={randomCategory} />
            )}
        </div>
    );
}

export default App;
