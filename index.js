var cards = [1,2,3,4,5,6,7,8,9,10,11];
var playerCards = [];
var dealerCards = [];
var playerSum = 0;
var dealerSum = 0;
var message = '';

//sound effect when clicking button

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

//

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
        revealAI();
    }
    else if (playerSum > 21) {
        $('#result').html('You Lose');
        disableBtn();
        revealAI();
    }
}
// function aiClick() {
//     $('#stay').click();
// }
function stayBtn() {
    getCardAI();    
    console.log(dealerSum);
    //AI AUTO PLAY TRICKED WITH CLICK, it mimics the human click so it will keep playing if they haven't reach 18.
    //BASIC ALGORITHM AND WILL BE COMBINED WITH COMMENTED CODE BELOW
    if (dealerSum <= 18) {
        setTimeout(function() {
            $('#stay').click();
        }, 1000);
    }
    else {
        console.log("finish");
    }


    // var flag = false;
    // while (!flag) {
    //     if (dealerSum <= 21) {
    //         //THE REASON IT GETS BACK HERE IS BECAUSE 
    //         getCardAI();
    //         // HAVE TO COUNT THE TOTAL HERE
    //         console.log(dealerSum);
    //         //if the dealer sum equal or less than 17, keep going
    //         if (dealerSum <= 18) {
    //             setTimeout(getCardAI, 1000);
    //             console.log('second card');
    //             continue;
    //         }
    //         else {
    //             if (dealerSum > playerSum) {
    //                 $('#result').html('You Lose');
    //                 disableBtn();
    //                 revealAI();
    //                 flag = true;
    //                 console.log("first if");
    //             }
    //             else {
    //                 $('#result').html('You Win');
    //                 disableBtn();
    //                 flag = true;
    //                 console.log("second if");
    //             }
    //         }
    //     }
    //     //automatically win if the dealer sum more than 21
    //     else {
    //         $('#result').html('You Win');
    //         disableBtn();
    //         flag = true;
    //         console.log("third if");
    //     }   
    // console.log(flag);
    // // console.log(dealerSum);
    // }    
    // console.log("outside while");
    // console.log("==========")
}

function disableBtn() {
    $('#hit').prop('disabled', true);
    $('#stay').prop('disabled', true);
}

function revealAI() {
    $('#dealer-cards').html('<p id="initialAI">'+dealerCards+'</p>');
    $('#dealer-sum').html(dealerSum);
}