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
function stayBtn() {
    disableBtn();
    getCardAI();    
    
    //this is going to the loop because, after click stay btn, the inside of the timeout is clicking the stay button itself, 
    // so it will keep repeating as a recursive function until certain conditions met
    
    //AI keep playing if the sum is not equal to 18 
    if (dealerSum <= 18) {
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
}
