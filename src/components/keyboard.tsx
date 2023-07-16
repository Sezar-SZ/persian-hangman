import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Keyboard({
    setKeyPressed,
    wrongGuesses,
    correctGuesses,
}: {
    setKeyPressed: Dispatch<SetStateAction<string>>;
    wrongGuesses: string[];
    correctGuesses: string[];
}) {
    const [row1, setRow1] = useState<string[]>();
    const [row2, setRow2] = useState<string[]>();
    const [row3, setRow3] = useState<string[]>();
    useEffect(() => {
        const keys_temp_1 = "ض ص ث ق ف غ ع ه خ ح ج چ پ";
        const keys_temp_2 = "ش س ی ب ل ا آ ت ن م ک گ";
        const keys_temp_3 = "ظ ط ژ ز ر ذ د ئ ء و";

        setRow1(keys_temp_1.split(" "));
        setRow2(keys_temp_2.split(" "));
        setRow3(keys_temp_3.split(" "));
    }, []);

    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex justify-center lg:my-1 my-[2px]">
                {row1?.map((letter) => (
                    <span
                        className={`text-[3vmin] rounded bg-gray-600 lg:p-[3vmin] lg:m-[4px] m-[2px] p-[2vmin] cursor-pointer ${
                            wrongGuesses.includes(letter) && "bg-red-500"
                        } ${correctGuesses.includes(letter) && "bg-green-500"}`}
                        onClick={(event) => {
                            if (
                                !wrongGuesses.includes(
                                    event.currentTarget.innerText
                                )
                            )
                                setKeyPressed(event.currentTarget.innerText);
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <div className="w-full flex justify-center lg:my-1 my-[2px]">
                {row2?.map((letter) => (
                    <span
                        className={`text-[3vmin] rounded bg-gray-600 lg:p-[3vmin] lg:m-[4px] m-[2px] p-[2vmin] cursor-pointer ${
                            wrongGuesses.includes(letter) && "bg-red-500"
                        } ${correctGuesses.includes(letter) && "bg-green-500"}`}
                        onClick={(event) => {
                            if (
                                !wrongGuesses.includes(
                                    event.currentTarget.innerText
                                )
                            )
                                setKeyPressed(event.currentTarget.innerText);
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <div className="w-full flex justify-center lg:my-1 my-[2px]">
                {row3?.map((letter) => (
                    <span
                        className={`text-[3vmin] rounded bg-gray-600 lg:p-[3vmin] lg:m-[4px] m-[2px] p-[2vmin] cursor-pointer ${
                            wrongGuesses.includes(letter) && "bg-red-500"
                        } ${correctGuesses.includes(letter) && "bg-green-500"}`}
                        onClick={(event) => {
                            if (
                                !wrongGuesses.includes(
                                    event.currentTarget.innerText
                                )
                            )
                                setKeyPressed(event.currentTarget.innerText);
                        }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        </div>
    );
}
