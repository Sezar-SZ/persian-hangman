import { useEffect, useMemo, useState } from "react";
import txt_words from "./assets/words.txt";
import Keyboard from "./components/keyboard";

interface LocalStorage {
    score: number;
    highScore: number;
}

function App() {
    const [score, setScore] = useState<number>();
    const [highScore, setHighScore] = useState<number>();

    const [correctGuesses, setCorrectGuesses] = useState(["", "", "", "", ""]);
    const [wrongGuesses, setWrongGuesses] = useState(["", "", "", "", ""]);
    const [word, setWord] = useState("");
    const [keyPressed, setKeyPressed] = useState("");

    const isGameOver = useMemo(() => {
        if (wrongGuesses.includes("")) return false;
        return true;
    }, [wrongGuesses]);
    const isGameWon = useMemo(() => {
        if (correctGuesses.includes("")) return false;
        return true;
    }, [correctGuesses]);

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

    useEffect(() => {
        console.log(isGameOver, isGameWon);
        if (keyPressed && !isGameOver && !isGameWon) {
            if (word.split("").includes(keyPressed)) {
                const correctIndexes: number[] = word
                    .split("")
                    .reduce(
                        (acc: number[], current, indx) =>
                            current === keyPressed ? [...acc, indx] : acc,
                        []
                    );
                setCorrectGuesses((state) =>
                    state.map((el, indx) =>
                        correctIndexes.includes(indx) ? keyPressed : el
                    )
                );
            } else {
                setWrongGuesses((state) =>
                    state.map((el, indx) =>
                        indx === state.indexOf("") ? keyPressed : el
                    )
                );
            }

            setKeyPressed("");
        }
    }, [keyPressed, isGameOver, isGameWon]);

    useEffect(() => {
        if (isGameWon) {
            setData({
                score: score! + 1,
                highScore: score! + 1 > highScore! ? score! + 1 : highScore!,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else if (isGameOver) {
            setData({
                score: 0,
                highScore: highScore!,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }, [isGameOver, isGameWon]);

    return (
        <div className="w-screen h-screen bg-black flex flex-col justify-between items-end text-white overflow-hidden">
            <div className="flex justify-between items-center w-full lg:w-3/4 mx-auto p-4">
                <span className="text-[3vmin]">
                    بیشترین امتیاز: {highScore}
                </span>
                <span className="text-[3vmin]">امتیاز فعلی: {score}</span>
            </div>
            {!isGameOver ? (
                <main className="flex flex-col w-[90%] lg:w-3/5 mt-[5vh] justify-center items-end mx-auto">
                    <div className="w-full flex justify-center items-center flex-row-reverse">
                        {correctGuesses.map((letter) => (
                            <div className="border-b-4 flex-1  mx-5 aspect-square flex justify-center items-center">
                                <span className="text-green-400 font-extrabold text-[8vmin]">
                                    {letter}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center items-center flex-row-reverse">
                        {wrongGuesses.map((letter) => (
                            <div className="flex-1 mx-5 aspect-square flex justify-center items-center">
                                <span className="text-red-800 font-extrabold text-[8vmin]">
                                    {letter}
                                </span>
                            </div>
                        ))}
                    </div>
                </main>
            ) : (
                <div className="w-full flex justify-center items-center">
                    <span className="text-red-800 font-extrabold text-[8vmin]">
                        {word}
                    </span>
                </div>
            )}
            <div className="flex w-full">
                <Keyboard
                    setKeyPressed={setKeyPressed}
                    wrongGuesses={wrongGuesses}
                    correctGuesses={correctGuesses}
                />
            </div>
        </div>
    );
}

export default App;
