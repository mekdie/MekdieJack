var cards = [1,2,3,4,5,6,7,8,9,10,11];
var playerCards = [];
var dealerCards = [];
var playerSum = 0;
var dealerSum = 0;
var message = '';
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
    $('#dealer-cards').html('<p>'+dealerCards+'</p>');
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
    $('#dealer-sum').html(dealerSum);
}
function startgame() {
    $('.board').show();
    $('.game-button').show();
    if ($('#startBtn').html() == 'Start Game') {
        //start game here
        $('#startBtn').html("Restart");
        //get initial 2 cards
        getCard();
        getCard();
        playerSum = sumTotal(playerCards);
        $('#player-sum').html(playerSum);
        initialAI();
    }
    else if ($('#startBtn').html() == 'Restart'){
        //Restart Game
        $('#result').html('');

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
}

function hitBtn() {
    getCard();
    playerSum = sumTotal(playerCards);
    $('#player-sum').html(playerSum);


    if (playerSum == 21) {
        $('#result').html('You Win');
    }
    else if (playerSum > 21) {
        $('#result').html('You Lose');
    }
}

function stayBtn() {
    getCardAI();    
    dealerSum = sumTotal(dealerCards);
    $('#dealer-sum').html(dealerSum);
    
    if (dealerSum <= 21) {
        if (dealerSum > playerSum) {
            $('#result').html('You Lose');
        }
        else {
            $('#result').html('You Win');
        }
    }
    else {
        $('#result').html('You Win');
    }
}