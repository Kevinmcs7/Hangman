import hangman from '../img/hangman.png';
import "../css/main.css";

interface WelcomeProps {
    palabra: number;
}

export default function Welcome({ palabra }: WelcomeProps) {
    const categories = [
        'Son Comestibles',
        'Son animales',
        'Tengo bandera',
        'Salgo en el arcoiris',
        'Me usas todos los días'
    ];

    const pista = categories[palabra];

    return (
        <>
            <div className="wrapper">
                <div className='tittles'>
                    <div className='pista'>
                        <h1>{pista}</h1>
                    </div>
                    <h1>Hangman Game</h1>
                    <img src={hangman} alt='Hangman image' width={300} height={300} />
                </div>
            </div>
        </>
    );
};
