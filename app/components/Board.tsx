"use client"

import { updateUserStats } from '../utils/UserData';
import { isStarted, rowTurn, wordle, userGuess, inputValues } from '../utils/Signals';
import { InputValues, UserPayload, Word } from '../utils/Types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/Firebase';
import { useState } from 'react';

const Board = () => {
    const CELL_PER_ROW = 5;
    const BOARD_ROWS = 6;
    const BOARD_CELLS = BOARD_ROWS * CELL_PER_ROW;

    const [start, setStart] = useState(isStarted.value);
    const [stateInputValues, setStateInputValues] = useState(inputValues.value);
    const [stateRowTurn, setStateRowTurn] = useState(rowTurn.value);

    const [user] = useAuthState(auth);
    const emailUser = user?.email;

    const wordleDictionary: Word[] = [
        'actor', 'adopt', 'admit', 'adult', 'after',
        'again', 'agent', 'alarm', 'alive', 'allow',
        'alone', 'alter', 'angel', 'anger', 'angle',
        'angry', 'apart', 'alpha', 'apple',
        'apply', 'arena', 'argue', 'array', 'aside',
        'asset', 'audio', 'audit', 'award', 'badly',
        'baker', 'bases', 'basic', 'beach', 'begin',
        'being', 'below', 'bench', 'billy', 'birth',
        'black',
        'blame', 'blind', 'blink', 'block', 'blood',
        'bored', 'bound', 'board', 'booth',
        'bound', 'brain', 'brand', 'bread', 'break',
        'brief', 'bring', 'broke', 'brown', 'build',
        'bully',
        'buyer', 'cable', 'calif', 'carry', 'catch',
        'cause', 'chain', 'chair', 'chart', 'chase',
        'cheap',
        'check', 'chest', 'chess', 'chief', 'child',
        'chill',
        'china', 'chloe', 'choir', 'chord', 'chose',
        'chose', 'civil', 'claim', 'clean', 'clear',
        'click', 'clock', 'close', 'cloud', 'coach',
        'coast',
        'could', 'count', 'court', 'cover', 'craft',
        'cream', 'crime', 'cross', 'crown', 'crust',
        'curve',
        'daily', 'dance', 'dated', 'dealt', 'death',
        'delay', 'depth', 'doubt', 'dozen', 'draft',
        'drain', 'drama', 'drawn', 'dream', 'dress',
        'drink',
        'drive', 'drove', 'eager', 'early', 'earth',
        'eight', 'elite', 'empty', 'enemy', 'enjoy',
        'enter', 'entry', 'equal', 'error', 'event',
        'every', 'exact', 'exist', 'extra', 'faith',
        'false', 'fault', 'fiber', 'field', 'fifth',
        'fifty', 'fight', 'final', 'first', 'fixed',
        'flame', 'flash', 'fleet', 'float', 'floor',
        'flour', 'flown', 'fluid', 'focus', 'foggy',
        'force', 'forth', 'forum', 'found', 'frame',
        'frank', 'fraud', 'fresh', 'front', 'fruit',
        'fudge', 'fully', 'funny', 'given', 'glass',
        'glory', 'going', 'grain', 'grief', 'grove',
        'grace', 'grade', 'grand', 'grant', 'grass',
        'great', 'green', 'gross', 'group', 'grown',
        'guard', 'guess', 'guide', 'happy', 'harry',
        'heart', 'heavy', 'hence', 'henry', 'horse',
        'hotel', 'house', 'human', 'ideal', 'image',
        'index', 'inner', 'input', 'issue', 'japan',
        'jimmy', 'joint', 'jones', 'judge', 'known',
        'label', 'large', 'laser', 'later', 'laugh',
        'layer', 'learn', 'least', 'leave', 'legal',
        'level', 'lewis', 'light', 'limit', 'links',
        'lives', 'local', 'logic', 'loose', 'lower',
        'lucky', 'lunch', 'lying', 'magic', 'major',
        'maker', 'march', 'maria', 'marry', 'match',
        'maybe',
        'mayor', 'meant', 'media', 'metal', 'might',
        'minor', 'minus', 'mixed', 'model', 'money',
        'month', 'moral', 'motor', 'mount', 'mouse',
        'mouth', 'movie', 'music', 'needs', 'never',
        'night', 'noise', 'north', 'noted', 'novel',
        'nurse', 'oasis', 'occur', 'ocean', 'offer',
        'often', 'older', 'olive', 'omega', 'opera',
        'order', 'other', 'ought', 'paint', 'panel',
        'paper', 'party', 'paste', 'patch', 'peace',
        'peter',
        'phase',
        'phone', 'photo', 'piece', 'pilot', 'pinky',
        'pitch',
        'place', 'plain', 'plane', 'plant', 'plate',
        'point', 'pound', 'power', 'press', 'price',
        'pride', 'prime', 'print', 'prior', 'prize',
        'proof', 'proud', 'prove', 'queen', 'quick',
        'quiet', 'quite', 'radio', 'raise', 'range',
        'rapid', 'ratio', 'reach', 'ready', 'refer',
        'relay', 'reset',
        'right', 'rival', 'river', 'robin', 'roger',
        'roman', 'rough', 'round', 'route', 'royal',
        'rural', 'scale', 'scene', 'score', 'sense',
        'serve', 'seven', 'shall', 'shape', 'share',
        'sharp', 'sheet', 'shelf', 'shell', 'shift',
        'shirt', 'shock', 'shoot', 'short', 'shown',
        'sight', 'since', 'sixth', 'sized', 'skill',
        'slide', 'small', 'smart', 'smith', 'smoke',
        'solid', 'solve', 'sorry', 'sound', 'south',
        'space', 'spare', 'speak', 'speed', 'spend',
        'spent', 'spoil', 'spoke', 'sport', 'staff',
        'stage',
        'stake', 'start', 'state', 'steam', 'steel',
        'stick', 'still', 'stock', 'stone', 'stood',
        'store', 'storm', 'story', 'strip', 'stuck',
        'study', 'stuff', 'style', 'sugar', 'suite',
        'super', 'sweet', 'table', 'taken', 'taste',
        'teach', 'teeth', 'terry', 'texas', 'thank',
        'theft', 'their', 'theme', 'there', 'these',
        'thick', 'thing', 'think', 'third', 'those',
        'three', 'threw', 'throw', 'tight', 'times',
        'tired', 'title', 'today', 'token', 'topic',
        'total',
        'touch', 'tower', 'track', 'trade', 'train',
        'trend', 'trial', 'tried', 'tries', 'truck',
        'truly', 'trust', 'truth', 'twice', 'under',
        'undue', 'union', 'unity', 'until', 'upper',
        'upset', 'urban', 'usage', 'usual', 'valid',
        'value', 'video', 'virus', 'visit', 'vital',
        'voice', 'waste', 'watch', 'water', 'wheel',
        'where', 'which', 'while', 'white', 'whole',
        'whose', 'woman', 'women', 'world', 'worry',
        'worse', 'worst', 'worth', 'would', 'wound',
        'write', 'wrong'
    ];

    const handleStart = () => {
        inputValues.value = generateInputValues();
        setStateInputValues(inputValues.value);

        randomizeWordle();

        rowTurn.value = 1;
        setStateRowTurn(rowTurn.value);

        isStarted.value = true;
        setStart(true);

        setTimeout(() => {
            handleFirstCellFocus();
        }, 50);
    }

    const generateInputValues = (): { [key: string]: { value: string; green: boolean; yellow: boolean } } => {
        const newObject: { [key: string]: { value: string; green: boolean; yellow: boolean } } = {};
        for (let i = 1; i <= BOARD_CELLS; i++) {
            newObject[`cell-${i}`] = { value: '', green: false, yellow: false };
        }
        return newObject;
    };

    const randomizeWordle = () => {
        const randomIndex = Math.floor(Math.random() * wordleDictionary.length);

        const randomWord = wordleDictionary[randomIndex];

        wordle.value = Array.from(randomWord);

        console.log(randomWord);
    }

    const isWordInDictionary = () => {
        // Convert user guess to lowercase
        const lowerCaseWord = userGuess.value.join('').toLowerCase();

        // Check if word is in dictionary
        return wordleDictionary.includes(lowerCaseWord);
    };

    const isRowDisabled = (row: number) => {
        return row !== rowTurn.value;
    };

    const isBoardSelected = (row: number) => {
        return row === rowTurn.value;
    }

    const handleNewRowFocus = () => {
        const cellName = document.getElementById(`cell-${rowTurn.value * 5 + 1}`) as HTMLInputElement | null;

        if (cellName) {
            cellName.select();
            cellName.focus();
        }
    }

    const handleFirstCellFocus = () => {
        // Select the first cell and focus on it
        const firstCell = document.getElementById('cell-1') as HTMLInputElement | null;

        if (firstCell) {
            firstCell.select();
            firstCell.focus();
        }
    }

    const isLetterGreen = (row: number, cell: number): boolean => {
        return inputValues.value[`cell-${(row - 1) * 5 + cell}`].green;
    }

    const isLetterYellow = (row: number, cell: number): boolean => {
        return inputValues.value[`cell-${(row - 1) * 5 + cell}`].yellow;
    }

    const removeOldValues = (): void => {
        // Manually clear input values
        const clearedInputValues: InputValues = Object.keys(inputValues.value).reduce((acc, key) => {
            acc[key] = { value: '', green: false, yellow: false };
            return acc;
        }, {} as InputValues); // <-- Cast as InputValues here

        // Update inputValues value
        inputValues.value = clearedInputValues;
        setStateInputValues(clearedInputValues);
    };

    const handleNextCellFocus = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const currentCellId: string | null = (event.target as HTMLElement).id;

        const cellPrefix: string = "cell-";

        const currentCellNumber: number = parseInt((currentCellId.match(/\d+/g) || []).join(''));

        const nextCellNumber: number = currentCellNumber + 1;

        const nextCellId: HTMLElement | null = document.getElementById(`${cellPrefix}${nextCellNumber.toString()}`);

        if (!nextCellId) {
            // Handle case where nextCellId is not found
            console.error("Next cell element not found");
            return;
        }

        const nextCellInput: HTMLInputElement | null = nextCellId as HTMLInputElement;

        nextCellInput.focus();
        nextCellInput.select();
    }

    const backSpaceFunction = (event: React.KeyboardEvent<HTMLInputElement>, keyValue: string): boolean => {
        if (keyValue === 'Backspace') {
            // Prevent the default behavior of the backspace key
            event.preventDefault();

            // Get the current cell
            const currentCellId: string | null = (event.target as HTMLElement)?.id;
            const currentCellNumber: number = parseInt(currentCellId.split('-')[1]);

            // Update the user guess
            const newArrayGuess: string[] = [...userGuess.value];
            newArrayGuess.pop();
            userGuess.value = newArrayGuess; // <-- Update userGuess value here (newArrayGuess);

            // Update the input values
            inputValues.value = ((prevInputValues: any) => {
                const newInputValues: any = { ...prevInputValues };
                newInputValues[currentCellId] = { value: '', green: false, yellow: false };
                return newInputValues;
            })(inputValues.value);

            setStateInputValues(inputValues.value);

            // Check if it's the first cell, no need to go back
            if (currentCellNumber > 1) {
                const previousCellId: string = `cell-${currentCellNumber - 1}`;
                const previousCell: HTMLInputElement | null = document.getElementById(previousCellId) as HTMLInputElement;

                // Check if the previousCell is not null before focusing and selecting
                if (previousCell) {
                    previousCell.focus();
                    previousCell.select();
                }
            }

            return true;
        }
        return false;
    }

    const enterFunction = (event: React.KeyboardEvent<HTMLInputElement>, keyValue: string) => {
        if (keyValue === 'Enter') {
            // Prevent the default behavior of the enter key
            event.preventDefault();

            // Submit the user's guess
            handleSubmit();

            // Confirm that the enter key was pressed
            return true;
        }
    }

    const unwantedKeys = [
        'CapsLock', 'Shift', 'Control', 'Alt', 'Tab', 'Space', 'ArrowLeft', 'ArrowRight',
        'ArrowUp', 'ArrowDown', 'Insert', 'Home', 'Delete', 'End', 'PageUp', 'PageDown',
        'NumLock', 'Pause', 'ScrollLock', 'Meta', 'AltGraph', 'ContextMenu', 'AltGraph',
        'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Escape', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ',', ';', ':',
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']',
        '|', '-', '+', '<', '>', '?', '/', '`', '~', '=', "'", '"', "|", "\\", 'Clear'
    ];

    const isUnwantedKey = (event: React.KeyboardEvent<HTMLInputElement>, keyValue: string) => {
        if (unwantedKeys.includes(keyValue)) {
            event.preventDefault();
            return true;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, row: number, cell: number) => {
        // Get the key value
        const keyValue = event.key;

        // Prevent the default behavior of unwanted keys
        if (isUnwantedKey(event, keyValue)) {
            return;
        }

        // Custom backspace function
        if (backSpaceFunction(event, keyValue)) {
            return;
        }

        // Custom enter function
        if (enterFunction(event, keyValue)) {
            return;
        }

        // Update the user guess
        const newArrayGuess = [...userGuess.value];
        newArrayGuess[cell - 1] = keyValue.toLowerCase();
        userGuess.value = newArrayGuess;

        // Update the input values
        inputValues.value = ((prevInputValues: InputValues) => {
            const newInputValues: InputValues = { ...prevInputValues };
            const key: string = `cell-${(row - 1) * 5 + cell}`;
            newInputValues[key].value = keyValue.toLowerCase();
            return newInputValues;
        })(inputValues.value);

        setStateInputValues(inputValues.value);

        setTimeout(() => {
            handleNextCellFocus(event);
        }, 50);
    }

    const findYellowIndexes = (word: string, greenIndexes: number[]): number[] => {
        const allIndexes = Array.from({ length: word.length }, (_, index) => index);

        const missingIndexes = allIndexes.filter(index => !greenIndexes.includes(index));

        const indexesToLetters = missingIndexes.map(index => word[index]);

        const yellowIndexes: number[] = [];
        for (let i = 0; i < wordle.value.length; i++) {
            if (wordle.value.includes(indexesToLetters[i])) {
                yellowIndexes.push(missingIndexes[i]);
            }
        }

        return yellowIndexes;
    };

    const findGreenIndexes = (): number[] => {
        const greenIndexes: number[] = [];
        for (let i = 0; i < wordle.value.length; i++) {
            if (wordle.value[i] === userGuess.value[i]) {
                greenIndexes.push(i);
            }
        }
        return greenIndexes;
    }

    const userGameResult = async (): Promise<void> => {
        const userGuessString = userGuess.value.join('').toLowerCase();
        const wordleString = wordle.value.join('').toLowerCase();

        const totalWins = (userGuessString === wordleString) ? 1 : 0;
        const totalLosses = (userGuessString === wordleString) ? 0 : 1;

        const payload: UserPayload = {
            totalGames: 1,
            totalWins: totalWins,
            totalLosses: totalLosses,
        };

        if (emailUser && emailUser !== '' && emailUser !== undefined && emailUser !== null) {
            await updateUserStats(emailUser, payload);
        }

    }

    const handleSubmit = (): void => {
        if (userGuess.value.join('').length !== 5) {
            alert('Word must be 5 characters.');
            return;
        }

        if (!isWordInDictionary()) {
            alert("Word is not in Worldle's dictionary. Spell check or try another word.");
            return;
        }

        const greenIndexes = findGreenIndexes();
        const yellowIndexes = findYellowIndexes(userGuess.value.join(''), greenIndexes);

        const newInputValues: InputValues = { ...inputValues.value };

        greenIndexes.forEach((index) => {
            const cellIndex = (index + 1) + (CELL_PER_ROW * (rowTurn.value - 1));
            newInputValues[`cell-${cellIndex}`].green = true;
        });

        yellowIndexes.forEach((index) => {
            const cellIndex = (index + 1) + (CELL_PER_ROW * (rowTurn.value - 1));
            newInputValues[`cell-${cellIndex}`].yellow = true;
        });

        inputValues.value = newInputValues;
        setStateInputValues(inputValues.value);

        if (greenIndexes.length === wordle.value.length) {
            alert('You Win! The Wordle was: ' + wordle.value.join('').toUpperCase());
            userGameResult();
            removeOldValues();
            rowTurn.value = 1;
            setStateRowTurn(rowTurn.value);
            userGuess.value = [];
            randomizeWordle();
            handleFirstCellFocus();
            return;
        } else {
            if (rowTurn.value < BOARD_ROWS) {
                rowTurn.value = rowTurn.value + 1;
                setStateRowTurn(rowTurn.value);
                handleNewRowFocus();
                userGuess.value = [];
            } else {
                alert('You Lose! Try Again! The Wordle was: ' + wordle.value.join('').toUpperCase());
                userGameResult();
                removeOldValues();
                rowTurn.value = 1;
                setStateRowTurn(rowTurn.value);
                userGuess.value = [];
                randomizeWordle();
                handleFirstCellFocus();
            }
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            {start &&
                <div className="flex max-w-screen-md mx-auto flex-col items-center m-5 mt-{60px}">
                    {Array.from({ length: BOARD_ROWS }).map((_, rowIndex) => (
                        <div
                            className={isBoardSelected(rowIndex + 1) ? "flex flex-row border border-white" : "flex flex-row"}
                            id={`row-${rowIndex + 1}`}
                            key={`row-${rowIndex + 1}`}
                        >
                            {Array.from({ length: CELL_PER_ROW }).map((_, cellIndex) => {
                                const cellKey = `cell-${rowIndex * 5 + cellIndex + 1}`;

                                return (
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className={
                                            isLetterGreen(rowIndex + 1, cellIndex + 1)
                                                ? "text-xl font-bold text-center m-1 rounded-md text-white bg-green-500 border border-gray-700 flex items-center justify-center capitalize sm:w-20 sm:h-20 w-14 h-14 transition-all ease-in-out"
                                                : isLetterYellow(rowIndex + 1, cellIndex + 1)
                                                    ? "text-xl font-bold text-center m-1 rounded-md text-white bg-yellow-500 border border-gray-700 flex items-center justify-center capitalize sm:w-20 sm:h-20 w-14 h-14 transition-all ease-in-out"
                                                    : "text-xl font-bold text-center m-1 rounded-md text-white bg-gray-800 border border-gray-700 flex items-center justify-center capitalize sm:w-20 sm:h-20 w-14 h-14 transition-all ease-in-out"
                                        }
                                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event, rowIndex + 1, cellIndex + 1)}
                                        disabled={isRowDisabled(rowIndex + 1)}
                                        maxLength={1}
                                        id={cellKey}
                                        key={cellKey}
                                        value={stateInputValues[cellKey].value}
                                        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                                            const target = event.target as HTMLInputElement;
                                            target?.select();
                                        }}
                                        readOnly
                                    />
                                );
                            })}
                        </div>
                    ))}

                    {start && <button className="p-1 pl-3 pr-3 
                    bg-white text-black border-2 border-white
                    rounded-3xl font-bold m-3 
                    hover:bg-black hover:text-white 
                    transition-all ease-in-out" onClick={handleSubmit}>Submit</button>}
                </div>
            }
            {!start &&
                <div className="flex flex-col items-center gap-5 m-3 bg-gray-950 p-8 rounded-md max-w-2xl">
                    <h1 className="font-bold text-3xl text-center m-6">5 Letter Word Guessing Game</h1>
                    <button className="p-1 pl-3 pr-3 
                    bg-white text-black border-2 border-white
                    rounded-3xl font-bold
                    hover:bg-black hover:text-white 
                    transition-all ease-in-out" onClick={handleStart}>Start</button>
                </div>
            }
        </div>
    )
}

export default Board