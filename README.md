# Wordle

This is an interpretation of the popular word game Wordle, written in NextJS using MongoDB. Square turns green if the guessed letter is in the right position. The boxes that have a letter within the wordle but is in the wrong position should turn yellow upon submission but the logic has not been coded yet.

Live version of the web app can be found here: <a href="https://wordle.durandrop.com">wordle.durandrop.com</a>

## Known Issues

Testing has not been intensive enough to squash out all bugs. If found they shall be published here.

<li>When the user guess has 2 letters of the same kind, the game will mark both letters yellow when it should only mark one. (Example: User Guess: TEETH, Wordle: EARTH) the game should only mark one of the E letters in TEETH yellow but it marks both of them yellow.</li>
