# MekdieJack
A copy / parody of blackjack with Mekdie's style and rule ! This game was aimed to copy famous BlackJack card game by doing 1v1 against AI. Pure luck or skill is on you~ The reason MekdieJack is created is no other than to improve my Web Development, Game Development, and Coding/Algorithm skills. The game can be accessed [here](https://mekdie.github.io/MekdieJack/):

External link: https://mekdie.github.io/MekdieJack/ 


## Version Changelog
*Version 1.0 Early DevNote:*
- First release and publishing trial on GitHub Website Hosting
- Very basic logic of MekdieJack (To be extended)
- Basic layout design (To be updated)

*Version 1.0.1 Early DevNote:*
- Hide the in-game control properly to separate between start game and restart

*Version 1.0.2 Early DevNote:*
- Hide the first dealer's card when starting a new game
- Reveal dealer's card after the player decided to stay
- Disable the hit and stay after the player has won or lost (Need to be more efficient / refined)

*Version 1.0.3 Early DevNote:*
- Reveal dealer's card after the player has won or lost (Need to be more efficient / refined)
- Dealer / AI logic will be implemented in 1.0.4 onwards to keep the game going until either player loses (Currently the game stop after the player decided to stay)

*Version 1.0.4 Early DevNote:*
- Add a sound effect whenever a game starts, restarts, or dealing cards
- What AI's aspect are currently needed to be implemented: [done]
    - The game must keep going after the player has decided to stay 
    - The AI must think to beat the player or loses to the player depends on the circumstances (e.g. need to keep going if the dealer/ai's card is not yet equal to 18) 
    - Dealer wins automatically if it reaches 21
    - Dealer loses automatically if its card exceeds 21 
    - Reveal dealer card one by one as using timeout (maybe) if hit button for dealer is clicked (they play) 
    - Disable the buttons after the game ends (need to restart)
    - To be continued ...

*Version 1.0.5 Early DevNote:*
- Added basic AI function to keep it playing until either win or lose 
- Added auto play for AI (AI Press their own hit button) 
- TO BE CONTINUED (refer to the commented code)
- Changed version name from Alpha to Early DevNote means a version note to keep track of changes between each development process.

*Version 1.0.6 Early DevNote:*
- Update the description a bit
- Added word break on the player and dealer (to prevent overflowing)
- Disable play hit and stay button if either win or lose
- Added draw if both total are the same
- Added logic where dealer wins automatically if it reaches 21
- Added logic where dealer loses if its card exceeds 21
- Remove unnecessary code
- Change restart button text to 'Play again' after the game finishes

*Version 1.0.7 Early DevNote:*
- Added sample favicon icon from favicon.io
- Added green background colour
- Added box and shadows for the playing screen in the middle
- Added randomizer for dealer's 
- Minor bug 

*Version 1.0.8 Early DevNote:*
- Added minor layout adjustment for mobile (767px);
- Added print function for easy debug
- Next:
    - Add Randomizer between dealer's threshold either 16-17-18-19 [done]
    - Giving percentage chance of getting certain cards to win or lose for both player and AI [on progress]
    - BUG: make the initial card can't be 11 and 11 or more than 21 [done]
    - giving gradual chance for card draw (e.g. increased chance starting from 10,11,12,13, etc...)
    - CHECK THE PERCENTAGE (testing) [on progress]
    - Add Betting or Score system
    - Design refinement
    - Swal confirmation box
    - Add more menus like about, how to play, etc.

*Version 1.0.9 Early DevNote:*
- Organize the folder for favicons
- Fixed an issue where there are chances for the first two cards to be more than 21 (e.g 11 and 11) for both player and AI
    - Instead **added a new feature** to give 0.8% chance on the first draw to be 21
    - Initial draw can no longer be more than 21 
- Fixed an issue where when the player loses due to keep drawing a card, the system won't display the dealer's card 

*Version 1.1.10 Early DevNote:*
- Minor bug fixes
- Added sound placeholder on buttons click, win, lose, and draw
- Improved gameplay by giving some delays (to avoid spam and mimic thinking behaviour - so card dealing won't be instant)
- Next: 
    - Because there are audios playing in the webpage, should also provide mute/unmute button to give the users freedom whether they want to hear the sound effect or not (just in case they are annoying lol)
    - Loading bar or sth like that

*Version 1.1.11 Early DevNote:*

