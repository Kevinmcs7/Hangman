
# Documentacion Sobre la Aplicacion

## Archivos Modificados
- **App.tsx**
- **Hangman.tsx**
- **Welcome.tsx**

## Documentación de App.tsx

Este archivo es parte de una aplicación para jugar al juego del ahorcado (Hangman) desarrollada con React.

## Descripción

El archivo `App.tsx` contiene la lógica principal de la aplicación del juego del ahorcado. La aplicación selecciona aleatoriamente una categoría (por ejemplo, palabras, animales, países, colores, objetos cotidianos) y luego permite al jugador intentar adivinar la palabra de esa categoría.

## Uso

El archivo `App.tsx` importa dos componentes principales: `Hangman` y `Welcome`. `Hangman` es el componente que maneja la lógica del juego, mientras que `Welcome` es el componente que muestra un mensaje de bienvenida al jugador y la categoría seleccionada para el juego.

### Dependencias

Para ejecutar la aplicación, es necesario tener instaladas las dependencias de React.

### Funcionalidad Principal

- **Selección Aleatoria de Categoría**: La aplicación selecciona aleatoriamente una categoría de palabras, animales, países, colores u objetos cotidianos.
- **Inicio del Juego**: Cuando el jugador hace clic en el botón "Jugar", la aplicación muestra el componente `Hangman` y comienza el juego.
- **Fin del Juego**: El juego termina cuando el jugador adivina la palabra correctamente o supera el número máximo de intentos.

---

```tsx
// Importación de React y useState
import React, { useState } from 'react';
// Importación de los componentes Hangman y Welcome
import Hangman from './components/Hangman';
import Welcome from './components/Welcome';

// Definición de las listas de palabras por categoría
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

// Lista de categorías
const categories = [words, animals, countries, colors, everydayObjects];
// Generación de un índice aleatorio para seleccionar una categoría
const randomIndex = Math.floor(Math.random() * categories.length);
// Selección de una categoría aleatoria
const randomCategory = categories[randomIndex];

// Definición del componente App
function App() {
    // Estado para controlar si el juego está en curso o no
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            {/* Componente de bienvenida con la categoría seleccionada */}
            <Welcome category={randomIndex} /> {/* Pasamos el índice de la lista seleccionada como prop */}
            {/* Botón para iniciar el juego */}
            {!isPlaying && (
                <button className="play-button" onClick={() => setIsPlaying(true)}>Jugar</button>
            )}
            {/* Mostrar el componente Hangman cuando se está jugando */}
            {isPlaying && (
                <Hangman words={randomCategory} />
            )}
        </div>
    );
}

export default App;
```

# Documentación de Hangman.tsx

Este archivo contiene el componente `Hangman`, que implementa la lógica del juego del ahorcado.

## Descripción

El componente `Hangman` representa el juego del ahorcado, donde el jugador intenta adivinar una palabra seleccionada. El componente muestra la palabra enmascarada con guiones bajos para las letras no adivinadas y permite al jugador ingresar letras para adivinar la palabra.

## Uso

El componente `Hangman` toma una lista de palabras como prop `words`. Cuando se monta, selecciona aleatoriamente una palabra de la lista para que el jugador la adivine.

### Funcionalidad Principal

- **Selección Aleatoria de Palabra**: Al inicio del juego, el componente selecciona aleatoriamente una palabra de la lista proporcionada.
- **Adivinanza de Letras**: El jugador puede ingresar letras en un campo de entrada para adivinar la palabra. Si la letra está en la palabra, se revela; de lo contrario, se cuenta como un error.
- **Reinicio del Juego**: Después de que el juego termina (ya sea por adivinar la palabra o por exceder el número máximo de errores), el jugador puede reiniciar el juego seleccionando una nueva palabra de la lista.


---

```tsx
import { useState } from "react";

interface HangmanProps {
    words: string[];
}

const Hangman = ({ words }: HangmanProps) => {
    const [selectedWord, setSelectedWord] = useState(words[0]);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [errorCount, setErrorCount] = useState(0);

    // Crea un array para representar la palabra, mostrando letras adivinadas y guiones bajos para letras no adivinadas
    const displayWord = selectedWord.split('').map((letter, index) => {
        if (guessedLetters.includes(letter)) {
            return letter;
        } else {
            return "_";
        }
    });

    // Maneja el intento del jugador de adivinar una letra
    const handleGuess = (letter: string) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters([...guessedLetters, letter]);
            if (!selectedWord.includes(letter)) {
                setErrorCount(errorCount + 1);
            }
        }
    };

    // Reinicia el juego con una nueva palabra seleccionada aleatoriamente
    const restartGame = () => {
        const newWordIndex = Math.floor(Math.random() * words.length);
        const newWord = words[newWordIndex];
        setSelectedWord(newWord);
        setGuessedLetters([]);
        setErrorCount(0);
    };

    return (
        <div className="hangman-container">
            {/* Muestra la palabra con letras adivinadas y guiones bajos para letras no adivinadas */}
            <p className="display-word">{displayWord.join(' ')}</p>
            {/* Campo de entrada para que el jugador adivine una letra */}
            <input 
                maxLength={1} 
                onChange={(e) => handleGuess(e.target.value)} 
                className="guess-input"
            />
            {/* Botón para seleccionar una nueva palabra y reiniciar el juego */}
            {(displayWord.join('') === selectedWord || errorCount > 5) && (
                <button 
                    onClick={() => {
                        restartGame();
                    }}
                    className="new-word-button"
                >
                    Select New Word
                </button>
            )}
            {/* Muestra la cantidad de errores cometidos por el jugador */}
            <p className="error-count">Cantidad de errores {errorCount}</p>
            {/* Muestra un mensaje de victoria si el jugador adivina la palabra */}
            {displayWord.join('') === selectedWord && (
                <p className="win-message">¡Has ganado esta ronda!</p>
            )}
        </div>
    );
}

export default Hangman;
```

# Documentación de Welcome.tsx

Este archivo contiene el componente `Welcome`, que muestra un mensaje de bienvenida al jugador junto con una pista sobre la categoría de palabras para adivinar en el juego del ahorcado.

## Descripción

El componente `Welcome` muestra un mensaje de bienvenida al jugador y proporciona una pista sobre la categoría de palabras que se utilizará en el juego del ahorcado. También muestra una imagen representativa del juego.

## Uso

El componente `Welcome` toma un número que representa el índice de la categoría de palabras seleccionada como prop `palabra`. Utiliza este índice para obtener una pista sobre la categoría de palabras de la lista `categories`.

### Funcionalidad Principal

- **Mensaje de Bienvenida**: El componente muestra un mensaje de bienvenida al jugador.
- **Pista sobre la Categoría**: Proporciona una pista sobre la categoría de palabras que se utilizará en el juego del ahorcado.
- **Imagen Representativa**: Muestra una imagen representativa del juego del ahorcado.


---

```tsx
import hangman from '../img/hangman.png';
import "../css/main.css";

interface WelcomeProps {
    palabra: number;
}

export default function Welcome({ palabra }: WelcomeProps) {
    // Lista de pistas para cada categoría de palabras
    const categories = [
        'Son Comestibles',
        'Son animales',
        'Tengo bandera',
        'Salgo en el arcoiris',
        'Me usas todos los días'
    ];

    // Obtiene la pista correspondiente a la categoría seleccionada
    const pista = categories[palabra];

    return (
        <>
            <div className="wrapper">
                <div className='tittles'>
                    {/* Muestra la pista sobre la categoría de palabras */}
                    <div className='pista'>
                        <h1>{pista}</h1>
                    </div>
                    {/* Muestra el título del juego */}
                    <h1>Hangman Game</h1>
                    {/* Muestra la imagen del juego del ahorcado */}
                    <img src={hangman} alt='Hangman image' width={300} height={300} />
                </div>
            </div>
        </>
    );
};
```

# Documentación de main.css

Este archivo contiene estilos CSS para la aplicación del juego del ahorcado. Proporciona estilos para los contenedores, textos, imágenes y botones utilizados en la aplicación.

## Descripción

El archivo `main.css` define estilos para los elementos visuales de la aplicación del juego del ahorcado. Estos estilos incluyen la apariencia de los contenedores, títulos, pistas, imágenes, campos de entrada y botones.

### Contenedores

- El contenedor principal `.wrapper` se utiliza para centrar vertical y horizontalmente los elementos de la aplicación. Tiene un fondo de imagen y un borde con bordes redondeados.

### Títulos

- Los títulos principales `.tittles h1` tienen un fondo semitransparente, bordes redondeados y sombra de texto.

### Pistas

- El contenedor de pistas `.pista-container` tiene un fondo claro, bordes redondeados y sombra.

### Imágenes

- La imagen del juego `.hangman-container img` tiene un margen superior para separarla del contenido.

### Elementos de Juego

- Los estilos de `.hangman-container` y `.guess-input` se aplican al contenedor del juego y al campo de entrada de adivinanza respectivamente.

### Botones

- El botón de nueva palabra `.new-word-button` tiene un estilo atractivo con fondo azul y bordes redondeados. Al pasar el cursor sobre el botón, cambia ligeramente de color.

---

```css
/* main.css */

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 65vh; /* Para centrar verticalmente */
    text-align: center; /* Alineación de texto */
    width: 40%; /* Ajusta el tamaño del ancho según tus necesidades */
    margin: 0 auto;
    background-image: url('../img/alphabet.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: 4px solid black;
    border-radius: 20px;
}

.tittles h1,
.tittles h2 {
    margin: 0;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 2px solid black;
    border-radius: 10px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    font-size: 1.5em; /* Reduce el tamaño del título */
}

.pista-container {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.pista-container p {
    margin: 0;
    font-size: 16px; /* Reduce el tamaño del texto de la pista */
}

img {
    margin-top: 30px;
}

/* Estilos para centrar los elementos */
.hangman-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 30vh; /* Reduce la altura de la contenedor */
    text-align: center;
}

/* Estilos para el texto de las palabras */
.display-word {
    font-size: 1.2em; /* Reduce el tamaño de la fuente */
    margin-bottom: 10px; /* Reduce el espacio inferior */
}

/* Estilos para el input */
.guess-input {
    font-size: 1em; /* Reduce el tamaño de la fuente */
    margin-bottom: 5px; /* Reduce el espacio inferior */
    padding: 3px; /* Reduce el relleno interno */
}

/* Estilos para el botón de nueva palabra */
.new-word-button {
    font-size: 1em; /* Reduce el tamaño de la fuente */
    padding: 8px 15px; /* Reduce el tamaño del botón */
    margin-top: 10px; /* Reduce el espacio superior */
    cursor: pointer;
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.new-word-button:hover {
    background-color: #0056b3;
}

/* Estilos para la cantidad de errores */
.error-count {
    font-size: 1em; /* Reduce el tamaño de la fuente */
    margin-bottom: 5px; /* Reduce el espacio inferior */
}

/* Estilos para el mensaje de victoria */
.win-message {
    font-size: 1.2em; /* Reduce el tamaño de la fuente */
    color: rgb(21, 0, 128);
}

/* Estilos para centrar el botón "Jugar" */
.play-button {
    display: block;
    margin: 20px auto; /* Centra el botón horizontalmente y agrega margen superior e inferior */
    padding: 10px 20px; /* Agrega espacio interno al botón */
    font-size: 1.2em; /* Tamaño de fuente adecuado */
    color: white; /* Color de texto */
    background-color: #007BFF; /* Color de fondo del botón (azul) */
    border: none; /* Sin borde */
    border-radius: 5px; /* Bordes redondeados */
    cursor: pointer; /* Muestra un cursor de mano al pasar sobre el botón */
    transition: background-color 0.3s; /* Transición suave de color al pasar sobre el botón */
}

/* Cambia el color de fondo al pasar sobre el botón */
.play-button:hover {
    background-color: #0056b3; /* Un azul más oscuro al pasar sobre el botón */
}
```

## Conclusión

En este proyecto de desarrollo de una aplicación para el juego del ahorcado, se ha logrado crear una experiencia interactiva y entretenida para los usuarios. A través de la implementación de componentes en React y estilos CSS, se ha construido una aplicación funcional y visualmente atractiva. 

El componente `App` sirve como punto de entrada, gestionando el estado del juego y mostrando los componentes principales. La aleatorización de las categorías de palabras proporciona variedad y emoción a cada partida.

El componente `Hangman` implementa la lógica del juego, permitiendo al jugador adivinar letras y mostrando la palabra enmascarada. Además, gestiona los intentos del jugador y proporciona una experiencia de juego fluida y desafiante.

El componente `Welcome` brinda una introducción visual agradable al juego, mostrando un mensaje de bienvenida y una pista sobre la categoría de palabras. Esto ayuda a los jugadores a sumergirse en la experiencia del juego desde el principio.

Los estilos CSS proporcionados en `main.css` contribuyen significativamente a la estética y coherencia visual de la aplicación. Establecen una disposición atractiva y definida, así como estilos consistentes para los diferentes elementos de la interfaz de usuario.

En conjunto, estos elementos conforman una aplicación bien diseñada y desarrollada que ofrece una experiencia de juego divertida y satisfactoria para los usuarios. Con la documentación proporcionada, los desarrolladores tienen una base sólida sobre la cual pueden construir, mejorar y personalizar la aplicación según sus necesidades y preferencias.



