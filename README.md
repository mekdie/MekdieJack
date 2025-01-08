# MekdieJack

A parody of blackjack with Mekdie's style and rules! This game aims to replicate the famous Blackjack card game with a 1v1 match against AI. Whether you rely on luck or skill is up to you. MekdieJack was created to improve my web development, game development, and coding/algorithm skills. The game can be accessed [here](https://mekdie.github.io/MekdieJack/):

External link: https://mekdie.github.io/MekdieJack/

## Version Changelog

_Version 1.0 Early DevNote:_

-   First release and publishing trial on GitHub Website Hosting
-   Very basic logic of MekdieJack (To be extended)
-   Basic layout design (To be updated)

_Version 1.0.1 Early DevNote:_

-   Properly hide the in-game controls to separate between starting and restarting the game

_Version 1.0.2 Early DevNote:_

-   Hide the dealer's first card when starting a new game
-   Reveal the dealer's card after the player decides to stay
-   Disable the hit and stay buttons after the player has won or lost (Needs to be more efficient/refined)

_Version 1.0.3 Early DevNote:_

-   Reveal the dealer's card after the player has won or lost (Needs to be more efficient/refined)
-   Dealer/AI logic will be implemented in 1.0.4 onwards to keep the game going until either player loses (Currently, the game stops after the player decides to stay)

_Version 1.0.4 Early DevNote:_

-   Add sound effects whenever a game starts, restarts, or cards are dealt
-   AI aspects to be implemented: [done]
    -   The game must continue after the player decides to stay
    -   The AI must decide to beat the player or lose based on the circumstances (e.g., keep going if the dealer/AI's card total is less than 18)
    -   Dealer wins automatically if it reaches 21
    -   Dealer loses automatically if its card total exceeds 21
    -   Reveal dealer cards one by one using a timeout (maybe) if the hit button for the dealer is clicked (they play)
    -   Disable the buttons after the game ends (need to restart)
    -   To be continued ...

_Version 1.0.5 Early DevNote:_

-   Added basic AI function to keep playing until either win or lose
-   Added auto-play for AI (AI presses its own hit button)
-   TO BE CONTINUED (refer to the commented code)
-   Changed version name from Alpha to Early DevNote to keep track of changes during each development process

_Version 1.0.6 Early DevNote:_

-   Updated the description a bit
-   Added word break on the player and dealer (to prevent overflowing)
-   Disabled hit and stay buttons if either win or lose
-   Added draw condition if both totals are the same
-   Added logic where the dealer wins automatically if it reaches 21
-   Added logic where the dealer loses if its card total exceeds 21
-   Removed unnecessary code
-   Changed restart button text to 'Play again' after the game finishes

_Version 1.0.7 Early DevNote:_

-   Added sample favicon icon from favicon.io
-   Added green background color
-   Added box and shadows for the playing screen in the middle
-   Added randomizer for dealer's actions
-   Minor bug fixes

_Version 1.0.8 Early DevNote:_

-   Added minor layout adjustments for mobile (767px)
-   Added print function for easy debugging
-   Next:
    -   Add randomizer for dealer's threshold between 16-17-18-19 [done]
    -   Give percentage chance of getting certain cards to win or lose for both player and AI [in progress]
    -   BUG: Ensure the initial card can't be 11 and 11 or more than 21 [done]
    -   Gradually increase chance for card draw (e.g., increased chance starting from 10, 11, 12, 13, etc.)
    -   CHECK THE PERCENTAGE (testing) [in progress]
    -   Add betting or score system
    -   Design refinement
    -   Swal confirmation box
    -   Add more menus like about, how to play, etc.

_Version 1.0.9 Early DevNote:_

-   Organized the folder for favicons
-   Fixed an issue where the first two cards could total more than 21 (e.g., 11 and 11) for both player and AI
    -   Instead, **added a new feature** to give a 0.8% chance on the first draw to be 21
    -   Initial draw can no longer total more than 21
-   Fixed an issue where when the player loses due to drawing too many cards, the system wouldn't display the dealer's card

_Version 1.1.10 Early DevNote:_

-   Minor bug fixes
-   Added sound placeholders for button clicks, win, lose, and draw
-   Improved gameplay by adding delays (to avoid spam and mimic thinking behavior - so card dealing won't be instant)
-   Next:
    -   Because there are audios playing on the webpage, provide a mute/unmute button to give users the option to hear the sound effects or not (in case they are annoying)
    -   Loading bar or something similar

_Version 1.1.11 Early DevNote:_

-   Added CSS to make the buttons more responsive
-   Fixed minor padding issues

_Version 1.1.12 Early DevNote:_

-   Added images to the card numbers
-   Hide dealer's card

Future plans:

-   Add score
-   Add levels
-   Add initial bets
-   Add double option to the bet
-   And so on...
