# MekdieJack
A copy / parody of blackjack with Mekdie's style and rule ! This game was aimed to copy famous BlackJack card game by doing 1v1 against AI. Pure luck or skill is on you~ The reason MekdieJack is created is no other than to improve my JavaScript and coding/algorithm skills. The game can be accessed [here](https://mekdie.github.io/MekdieJack/):

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
- Next:
    - Add Randomizer between dealer's threshold either 16-17-18-19
    - Add Betting or Score system
