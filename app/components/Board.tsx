"use client"

import { isStarted, rowTurn, wordle, userGuess, inputValues, statsSignal } from '../utils/Signals';
import { InputValues, UserPayload } from '../utils/Types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/Firebase';
import { ChangeEvent, useState } from 'react';
import { getStats, putStats } from '../utils/REST';
import { wordleDictionary } from '../utils/WordleDictionary';

const Board = () => {
    const CELL_PER_ROW = 5;
    const BOARD_ROWS = 6;
    const BOARD_CELLS = BOARD_ROWS * CELL_PER_ROW;
    const btnString = `p-1 pl-3 pr-3 
        bg-white text-black border border-white
        rounded-3xl font-bold m-3 
        hover:bg-black hover:text-white 
        transition-all ease-in-out`;

    const [start, setStart] = useState(isStarted.value);
    const [stateInputValues, setStateInputValues] = useState(inputValues.value);
    const [nextCellString, setNextCellString] = useState("");
    const [stats, setStats] = useState<UserPayload>(statsSignal.value);
    const [user] = useAuthState(auth);

    const unwantedKeys = [
        'CapsLock', 'Shift', 'Control', 'Alt', 'Tab', 'Space', 'ArrowLeft', 'ArrowRight',
        'ArrowUp', 'ArrowDown', 'Insert', 'Home', 'Delete', 'End', 'PageUp', 'PageDown',
        'NumLock', 'Pause', 'ScrollLock', 'Meta', 'AltGraph', 'ContextMenu', 'AltGraph',
        'Dead', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        'Escape', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ',', ';', ':',
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '[', ']',
        '|', '-', '+', '<', '>', '?', '/', '`', '~', '=', "'", '"', "|", "\\", 'Clear'
    ];

    /**
     * Set the input values to the default values and start the game
     */
    const handleStart = async (): Promise<void> => {
        // Set the input values to the default values
        inputValues.value = generateInputValues();
        setStateInputValues(inputValues.value);

        // Randomize the wordle
        randomizeWordle();

        // Start row turn
        rowTurn.value = 1;

        // Switch to started state
        isStarted.value = true;
        setStart(true);

        // Set Stats state
        if (user) {
            const data = await getStats({ userUID: user.uid });

            if (data && !Array.isArray(data) && typeof data === 'object') {
                statsSignal.value = data;
                setStats(data);
            } else {
                console.error('Invalid stats data received:', data);
            }
        }

        // Focus the first cell
        setTimeout(() => {
            handleFirstCellFocus();
        }, 50);
    }

    /**
     * Generates input values.
     *
     * @return {{[key: string]: { value: string; green: boolean; yellow: boolean }}} the generated input values
     */
    const generateInputValues = (): {
        [key: string]: {
            value: string;
            green: boolean;
            yellow: boolean
        }
    } => {
        // Generate input values
        const newObject: { [key: string]: { value: string; green: boolean; yellow: boolean } } = {};

        // Loop through each cell
        for (let i = 1; i <= BOARD_CELLS; i++) {
            newObject[`cell-${i}`] = { value: '', green: false, yellow: false };
        }

        // Return the input values
        return newObject;
    };

    /**
     * Generate a random word from the wordleDictionary and assign it to the wordle value.
     *
     */
    const randomizeWordle = (): void => {
        // Randomize number
        const randomIndex = Math.floor(Math.random() * wordleDictionary.length);

        // Set the word with the random index
        const randomWord = wordleDictionary[randomIndex];

        // Set the word as an array
        wordle.value = Array.from(randomWord);

        // Log the wordle
        console.log(randomWord);
    }

    /**
     * Check if the user's guess is in the dictionary.
     *
     * @return {boolean} true if the word is in the dictionary, false otherwise
     */
    const isWordInDictionary = (): boolean => {
        // Convert user guess to lowercase
        const lowerCaseWord = userGuess.value.join('').toLowerCase();

        // Check if word is in dictionary
        return wordleDictionary.includes(lowerCaseWord);
    };

    /**
     * Check if the provided row is disabled.
     *
     * @param {number} row - the row to check
     * @return {boolean} true if the row is disabled, false otherwise
     */
    const isRowDisabled = (row: number): boolean => {
        return row !== rowTurn.value;
    };

    /**
     * Checks if the specified row is selected.
     *
     * @param {number} row - the row to check
     * @return {boolean} true if the row is selected, false otherwise
     */
    const isBoardSelected = (row: number): boolean => {
        return row === rowTurn.value;
    }

    /**
     * Function to handle focus on a new row.
     */
    const handleNewRowFocus = (): void => {
            if (!nextCellString) {
                // Handle case where nextCellId is not found
                console.error("Next cell element not found");
                return;
            }

            const nextCellInput = document.getElementById(nextCellString) as HTMLInputElement;

            setTimeout(() => {
                nextCellInput.select();
                nextCellInput.focus();
            }, 50);
    }

    /**
     * Select the first cell and focus on it
     */
    const handleFirstCellFocus = (): void => {
        // Select the first cell and focus on it
        const firstCell = document.getElementById('cell-1') as HTMLInputElement;

        if (firstCell) {
            firstCell.select();
            firstCell.focus();
        }
    }

    /**
     * Check if the letter at the specified row and cell is green.
     *
     * @param {number} row - the row number
     * @param {number} cell - the cell number
     * @return {boolean} whether the letter is green
     */
    const isLetterGreen = (row: number, cell: number): boolean => {
        return inputValues.value[`cell-${(row - 1) * CELL_PER_ROW + cell}`].green;
    }

    /**
     * Check if the letter at the specified row and cell is yellow.
     *
     * @param {number} row - the row index
     * @param {number} cell - the cell index
     * @return {boolean} true if the letter is yellow, false otherwise
     */
    const isLetterYellow = (row: number, cell: number): boolean => {
        return inputValues.value[`cell-${(row - 1) * CELL_PER_ROW + cell}`].yellow;
    }

    /**
     * Removes old values from inputValues and updates the state.
     *
     * @return {void} 
     */
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

    /**
     * Handles focusing on the next cell element when a keyboard event occurs.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event - the keyboard event triggering the focus change
     * @return {void} 
     */
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

        nextCellId.focus();
    }

    /**
     * A function to handle the backspace key press event and update user guess accordingly.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event - the keyboard event object
     * @param {string} keyValue - the value of the key pressed
     * @return {boolean} true if the default behavior is prevented, otherwise false
     */
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

    /**
     * A function that handles the "Enter" key press event.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event - the keyboard event
     * @param {string} keyValue - the value of the key being pressed
     * @return {boolean} true if the "Enter" key was pressed, otherwise undefined
     */
    const enterFunction = (event: React.KeyboardEvent<HTMLInputElement>, keyValue: string): boolean => {
        if (keyValue === 'Enter') {
            // Prevent the default behavior of the enter key
            event.preventDefault();

            // Submit the user's guess
            handleSubmit();

            // Confirm that the enter key was pressed
            return true;
        }
        return false;
    }

    /**
     * Checks if the key value is in the unwantedKeys array and prevents the default event if it is.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event - the keyboard event
     * @param {string} keyValue - the value of the key pressed
     * @return {boolean} true if the key is unwanted and the event was prevented, otherwise undefined
     */
    const isUnwantedKey = (event: React.KeyboardEvent<HTMLInputElement>, keyValue: string): boolean => {
        if (unwantedKeys.includes(keyValue)) {
            event.preventDefault();
            return true;
        }
        return false;
    };

    /**
     * Handle the key down event for the input element.
     *
     * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event
     * @param {number} row - The row number
     * @param {number} cell - The cell number
     * @return {void} 
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, row: number, cell: number): void => {
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
            const key: string = `cell-${(row - 1) * CELL_PER_ROW + cell}`;
            newInputValues[key].value = keyValue.toLowerCase();
            return newInputValues;
        })(inputValues.value);

        setStateInputValues(inputValues.value);
        setNextCellString(`cell-${(row - 1) * CELL_PER_ROW + cell + 1}`);

        setTimeout(() => {
            handleNextCellFocus(event);
        }, 50);
    }

    /**
     * Find the indexes of the characters in the word that are not in the greenIndexes array,
     * and are present in the wordle.value.
     * @param {string} tempWordle - the input word
     * @param {number[]} greenIndexes - the indexes of green characters
     * @return {number[]} the indexes of yellow characters
     */
    const findYellowIndexes = (tempWordle: string[]): number[] => {
        const yellowIndexes: number[] = [];
        for (let i = 0; i < wordle.value.length; i++) {
            if (tempWordle.includes(userGuess.value[i])) {
                yellowIndexes.push(i);
                tempWordle[i] = '';
                userGuess.value[i] = '';
            }
        }
        return yellowIndexes;
    };

    /**
     * Finds the indexes of characters that match in value and position between wordle and userGuess.
     *
     * @return {number[]} array of indexes of matching characters
     */
    const findGreenIndexes = (tempWordle: string[]): number[] => {
        const greenIndexes: number[] = [];
        for (let i = 0; i < tempWordle.length; i++) {
            if (tempWordle[i] === userGuess.value[i]) {
                greenIndexes.push(i);
                tempWordle[i] = '';
                userGuess.value[i] = '';
            }
        }
        return greenIndexes;
    }

    /**
     * Asynchronous function that calculates the user's game result and updates the user stats if an email is provided.
     *
     * @return {Promise<void>} 
     */
    const userGameResult = async (win: boolean): Promise<void> => {

        const newStats: UserPayload = {
            totalWins: win ? 1 : 0,
            totalLosses: win ? 0 : 1,
        };

        if (user) {
            const oldStats = await getStats({ userUID: user.uid });

            // Check if oldStats is a valid UserPayload
            if (oldStats && !Array.isArray(oldStats) && typeof oldStats === 'object') {
                await putStats({ userUID: user.uid }, newStats, oldStats);

                const mergedStats: { [key: string]: number } = {};

                Object.keys(oldStats).forEach(key => {
                    mergedStats[key] = oldStats[key] + newStats[key];
                });

                if (mergedStats && !Array.isArray(mergedStats) && typeof mergedStats === 'object') {
                    statsSignal.value = mergedStats as UserPayload;
                    setStats(mergedStats as UserPayload);
                }
            } else {
                // Handle the case where oldStats is not of type UserPayload
                console.error('Invalid stats data received:', oldStats);
            }
        }
    }

    /**
     * Handle the submission of the user's guess in the Wordle game. 
     *
     * @return {void} 
     */
    const handleSubmit = (): void => {
        // Check if the user's guess is valid
        if (userGuess.value.join('').length !== CELL_PER_ROW) {
            alert(`Word must be ${CELL_PER_ROW} characters.`);
            return;
        }

        // Check if the user's guess is in the dictionary
        if (!isWordInDictionary()) {
            alert("Word is not in Worldle's dictionary. Spell check or try another word.");
            return;
        }

        // Check if the user's guess is correct
        const tempWordle = [...wordle.value];
        const greenIndexes = findGreenIndexes(tempWordle);
        const yellowIndexes = findYellowIndexes(tempWordle);

        // Create new input values
        const newInputValues: InputValues = { ...inputValues.value };

        // Update green and yellow input values
        greenIndexes.forEach((index) => {
            const cellIndex = (index + 1) + (CELL_PER_ROW * (rowTurn.value - 1));
            newInputValues[`cell-${cellIndex}`].green = true;
        });

        yellowIndexes.forEach((index) => {
            const cellIndex = (index + 1) + (CELL_PER_ROW * (rowTurn.value - 1));
            newInputValues[`cell-${cellIndex}`].yellow = true;
        });

        // Update input values
        inputValues.value = newInputValues;
        setStateInputValues(inputValues.value);

        // Check if the user's guess is correct
        if (greenIndexes.length === wordle.value.length) {
            // Allow UI to update before redirecting
            setTimeout(() => {
                alert('You Win! The Wordle was: ' + wordle.value.join('').toUpperCase());
                userGameResult(true);
                removeOldValues();
                rowTurn.value = 1;
                userGuess.value = [];
                randomizeWordle();
                handleFirstCellFocus();
                return;
            }, 300);
        } else {
            if (rowTurn.value < BOARD_ROWS) {
                rowTurn.value = rowTurn.value + 1;
                handleNewRowFocus();
                userGuess.value = [];
            } else {
                alert('You Lose! Try Again! The Wordle was: ' + wordle.value.join('').toUpperCase());
                userGameResult(false);
                removeOldValues();
                rowTurn.value = 1;
                userGuess.value = [];
                randomizeWordle();
                handleFirstCellFocus();
            }
        }
    }

    return (
        <div className='flex flex-col justify-center items-center mt-20'>
            {start &&
                <div className="flex max-w-screen-md mx-auto flex-col justify-center items-center">
                    {Array.from({ length: BOARD_ROWS }).map((_, rowIndex) => (
                        <div
                            className={isBoardSelected(rowIndex + 1) ? "flex flex-row border border-slate-400" : "flex flex-initial"}
                            id={`row-${rowIndex + 1}`}
                            key={`row-${rowIndex + 1}`}
                        >
                            {Array.from({ length: CELL_PER_ROW }).map((_, cellIndex) => {
                                const cellKey = `cell-${rowIndex * CELL_PER_ROW + cellIndex + 1}`;

                                return (
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className={
                                            isLetterGreen(rowIndex + 1, cellIndex + 1)
                                                ? `text-xl font-bold text-center m-1 rounded-md
                                           text-white bg-green-500 border border-gray-700 
                                           flex items-center justify-center capitalize 
                                           sm:w-20 sm:h-20 w-16 h-16 transition-all ease-in-out 
                                           disabled:opacity-90 disabled:cursor-not-allowed`
                                                : isLetterYellow(rowIndex + 1, cellIndex + 1)
                                                    ? `text-xl font-bold text-center m-1 rounded-md 
                                            text-white bg-yellow-500 border border-gray-700 
                                            flex items-center justify-center capitalize 
                                            sm:w-20 sm:h-20 w-16 h-16 transition-all ease-in-out 
                                            disabled:opacity-90 disabled:cursor-not-allowed`
                                                    : `sm:w-20 sm:h-20 w-16 h-16 text-xl font-bold text-center m-1 rounded-md 
                                            text-white bg-gray-900 border border-gray-700 
                                            items-center justify-center capitalize 
                                            transition-all ease-in-out 
                                            disabled:opacity-90 disabled:cursor-not-allowed 
                                            focus:border-green-200 selection:border-green-200`
                                        }
                                        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event, rowIndex + 1, cellIndex + 1)}
                                        disabled={isRowDisabled(rowIndex + 1)}
                                        maxLength={1}
                                        id={cellKey}
                                        key={cellKey}
                                        value={stateInputValues[cellKey].value}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            const target = event.target as HTMLInputElement;
                                            target?.select();
                                        }}
                                    />
                                );
                            })}
                        </div>
                    ))}

                    {start && <button className={btnString} onClick={handleSubmit}>Submit</button>}
                    
                    {user &&
                        <div className="flex flex-col gap-2 m-7">
                            <table className="border-collapse border-2 border-gray-500">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-500 px-4 py-2">RECORD</th>
                                        <th className="border border-gray-500 px-4 py-2">SCORE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(stats).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="border border-gray-500 px-4 py-2">{key === 'totalWins' ? 'Wins' : 'Losses'}</td>
                                            <td className="border border-gray-500 px-4 py-2">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    }

                    {!user &&
                        <div className="flex flex-col gap-2 m-7">
                            <p className="text-center">*Create an account or login to see stats!</p>
                        </div>
                    }

                </div>
            }
            {!start &&
                <div className="flex flex-col items-center gap-5 m-3 bg-gray-950 border-2 border-slate-900 p-8 rounded-md max-w-2xl">
                    <h1 className="font-bold text-3xl text-center m-6">5 Letter Word Guessing Game</h1>
                    <button className={btnString} onClick={handleStart}>Play Now</button>
                    <i className="text-center">*I am not the creator of this game, this is my interpretation of the game written in NextJS.</i>
                </div>
            }
        </div>

    )
}

export default Board