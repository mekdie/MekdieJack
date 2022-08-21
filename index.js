var cards = [1,2,3,4,5,6,7,8,9,10,11];
var playerCards = [];
var dealerCards = [];
var playerSum = 0;
var dealerSum = 0;
var message = '';

// === sound effect when clicking button

const dealingCard = new Audio("audio/dealingCard.wav");
dealingCard.playbackRate = 2;
const shufflingCard = new Audio("audio/shufflingCard.wav");
shufflingCard.playbackRate = 2;

const dealBtn = $('button:not(.shuffle)'); //select all button except those with class shuffle
const shuffleBtn = $('.shuffle');

dealBtn.click(function() {
    dealingCard.play();
})

shuffleBtn.click(function() {
    shufflingCard.play();
})

// ===========
// print function to debug 
function print(val) {
    return console.log(val);
}


function sumTotal(arr) {
    let i;
    let sum = 0;
    for (i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
function getCard() {
    var card = cards[Math.floor(Math.random()*cards.length)];
    var chance = Math.random();
    // print(chance);
    // if the player has reached 16 or more

    // rule no.1: they got 10% chance to reach 21
    // rule no.2: they got 80% chance to reach 20 or 21 
    // rule no.3: they got 10% chance to exceed 21
    if (playerSum >= 16) {
        //10% chance to reach 21 WIN DIRECTLY
        if (chance <= 0.1) {
            console.log("10% chance to win instantly");
            card = 21 - playerSum;
            // print(card);
        }
        //80% chance to go here
        else if (chance <= 0.9) {
            //must put the condition if playerSum == 20
            console.log("80% chance");
            var inner80 = Math.random();
            console.log(inner80);
            //if the value is more than 16 but no equal to 20
            if (playerSum != 20) {

                // rule no.1: 10% chance to get 21
                if (inner80 <= 0.1) { //10%
                    console.log("10% chance to get 21");
                    card = 21 - playerSum
                }
                // rule no.2: 20% chance to get 20
                else if (inner80 <= 0.3) {
                    console.log("20% chance to get 20");
                    card = 21 - playerSum - 1;
                }
                // rule no.3: 30% chance to get any cards that make the sum below 21
                else if (inner80 <= 0.6) {
                    console.log("30% chance to get any cards that make the sum below 21");
                    let winCard = 21 - playerSum;
                    let cardIdx = cards.indexOf(winCard);
                    let tempArr = [];
                    for (let i = cardIdx; i > 0; i--) {
                        tempArr.push(cards[i - 1]);
                    }
                    //getting the card from tempArr
                    card = tempArr[Math.floor(Math.random()*tempArr.length)];
                }
                // rule no.4: 40% chance to get any cards that make the sum exceeds 21
                else {
                    console.log("40% chance to get any cards that make the sum exceeds 21");
                    let winCard = 21 - playerSum;
                    let cardIdx = cards.indexOf(winCard);
                    let tempArr = [];
                    for (let i = cardIdx; i < cards.length; i++) {
                        tempArr.push(cards[i]);
                    }
                    //getting the card from tempArr
                    card = tempArr[Math.floor(Math.random()*tempArr.length)];
                }

            }
            // if the player sum is 20
            else {
                var sum20chance = Math.random();
                //10% chance to win directly to 21;
                if (sum20chance <= 0.1) {
                    console.log("win from 10% chance");
                    card = 1;
                }
                //90% chance to lose, sum will exceeds 21
                else {
                    console.log("lose from 90% chance of 20-21");
                    let tempArr = [];
                    for (let i = 1; i < cards.length; i++) {
                        tempArr.push(cards[i]);
                    }
                    //getting the card from tempArr
                    card = tempArr[Math.floor(Math.random()*tempArr.length)];
                }   
            }
        }
        else {
            console.log("10% chance to lose");
            //logic to get the card that has the value more than the winning numbers (e.g. no.3 made the total 21, so get all cards except 3 and below)
            let winCard = 21 - playerSum;
            let cardIdx = cards.indexOf(winCard);
            let tempArr = [];
            for (let i = cardIdx; i < cards.length; i++) {
                tempArr.push(cards[i]);
            }
            //getting the card from tempArr
            card = tempArr[Math.floor(Math.random()*tempArr.length)];
        }
    }
    playerCards.push(card);
    $('#player-cards').html('<p>'+playerCards+'</p>');
}

function getCardAI() {
    var card = cards[Math.floor(Math.random()*cards.length)];
    dealerCards.push(card);
    $('#dealer-cards').html('<p id="initialAI">'+dealerCards+'</p>');
    dealerSum = sumTotal(dealerCards);
    $('#dealer-sum').html(dealerSum);
}
function initialCard() {
    getCard();
    getCard();
    playerSum = sumTotal(playerCards);
    $('#player-sum').html(playerSum);
}
function initialAI() {
    getCardAI();
    getCardAI();
    dealerSum = sumTotal(dealerCards);
    $('#dealer-sum').html('?');
    $('#initialAI').html('<p id="initialAI">?,'+dealerCards[1]+'</p>');
}
function startGame() {
    $('.board').show();
    $('.startgame').hide();
    $('.game-control').css('display', 'inline-flex');

    //get initial 2 cards
    getCard();
    getCard();
    playerSum = sumTotal(playerCards);
    $('#player-sum').html(playerSum);
    initialAI();
}


function restartGame() {
    $('#restart').html('Restart');
    $('#result').html('');
    $('#hit').prop('disabled', false);
    $('#stay').prop('disabled', false);

    playerCards = [];
    $('#player-cards').html('');
    $('#player-sum').html('0');
    playerSum = 0;
    initialCard();

    dealerCards = [];
    $('#dealer-cards').html('');
    $('#dealer-sum').html('0');
    dealerSum = 0;
    initialAI();

}
function hitBtn() {
    getCard();
    playerSum = sumTotal(playerCards);
    $('#player-sum').html(playerSum);


    if (playerSum == 21) {
        $('#result').html('You Win');
        disableBtn();
    }
    else if (playerSum > 21) {
        $('#result').html('You Lose');
        disableBtn();
    }
}
// Basically AI moves
function stayBtn() {
    disableBtn();
    getCardAI();    
    
    //this is going to the loop because, after click stay btn, the inside of the timeout is clicking the stay button itself, 
    // so it will keep repeating as a recursive function until certain conditions met
    
    //AI keep playing if the sum is not equal to randomizer between 15-19
    var thresholdAI = [15,16,17,18];
    const idxThreshold = Math.floor(Math.random() * thresholdAI.length);
 
    if (dealerSum <= thresholdAI[idxThreshold]) {
        setTimeout(function() {
            $('#stay').click();
        }, 1000);
    }
    // stop playing if exceeds 18
    else {
        if ((dealerSum > playerSum) && dealerSum <= 21) {
            $('#result').html('You Lose');
            $('#restart').html('Play again');
            disableBtn();
        }
        else if (dealerSum == playerSum) {
            $('#result').html('Draw');
            $('#restart').html('Play again');
            disableBtn();  
        }
        else {
            $('#result').html('You Win');
            $('#restart').html('Play again');
            disableBtn();   
        }
    }    
}

function disableBtn() {
    $('#hit').prop('disabled', true);
    $('#stay').prop('disabled', true);
    $('#player-sum').html(playerSum);
    $('#dealer-sum').html(dealerSum);
}
