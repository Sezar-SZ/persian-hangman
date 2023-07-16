import { useEffect, useState } from "react";
import txt_words from "./assets/words.txt";
import Keyboard from "./components/keyboard";

interface LocalStorage {
    score: number;
    highScore: number;
}

function App() {
    const [score, setScore] = useState<number>();
    const [highScore, setHighScore] = useState<number>();

    const [correctGuesses, setCorrectGuesses] = useState([
        "س",
        "ل",
        "ا",
        "م",
        "",
    ]);
    const [wrongGuesses, setWrongGuesses] = useState(["م", "ص", "ط", "ف", "ی"]);
    const [word, setWord] = useState("");

    const getData = () => {
        const data: LocalStorage = (JSON.parse(
            localStorage.getItem("data")!
        ) as LocalStorage) || {
            score: 0,
            highScore: 0,
        };
        setScore(data["score"]);
        setHighScore(data["highScore"]);
    };
    const setData = (data: LocalStorage) => {
        localStorage.setItem("data", JSON.stringify(data));
    };

    const getNewWord = async () => {
        try {
            const res = await fetch(txt_words);
            const data = await res.text();

            const words = data.split("\n").map((element) => element.trim());
            const randomIndex = Math.floor(Math.random() * words.length);
            const randomWord = words[randomIndex];
            setWord(randomWord);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        void getNewWord();
        getData();
    }, []);
    return (
        <div className="w-screen h-screen bg-black flex flex-col justify-between items-end text-white overflow-hidden">
            <div className="flex justify-between items-center w-full lg:w-3/4 mx-auto p-4">
                <span>بیشترین امتیاز</span>
                <span>امتیاز فعلی</span>
            </div>
            <main className="flex flex-col w-[90%] lg:w-3/5 mt-[5vh] justify-center items-end mx-auto">
                <div className="w-full flex justify-center items-center flex-row-reverse">
                    {correctGuesses.map((letter) => (
                        <div className="border-b-4 flex-1  mx-5 aspect-square flex justify-center items-center">
                            <span className="text-green-600 font-extrabold text-[8vmin]">
                                {letter}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-center items-center flex-row-reverse">
                    {wrongGuesses.map((letter) => (
                        <div className="flex-1 mx-5 aspect-square flex justify-center items-center">
                            <span className="text-red-700 font-extrabold text-[8vmin]">
                                {letter}
                            </span>
                        </div>
                    ))}
                </div>
            </main>
            <div className="flex w-full">
                <Keyboard />
            </div>
        </div>
    );
}

export default App;
