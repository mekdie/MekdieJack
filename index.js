var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var playerCards = [];
var dealerCards = [];
var playerSum = 0;
var dealerSum = 0;
var message = "";

// === sound effect when clicking button

const dealingCard = new Audio("audio/dealingCard.wav");
dealingCard.playbackRate = 2;
const shufflingCard = new Audio("audio/shufflingCard.wav");
shufflingCard.playbackRate = 2;
const ai = new Audio("audio/stay.wav");
const win = new Audio("audio/win.wav");
const draw = new Audio("audio/draw.wav");
const lose = new Audio("audio/lose.wav");

const dealBtn = $("#hit");
const shuffleBtn = $(".shuffle");
const stayBtn = $("#stay");

dealBtn.click(function () {
    dealingCard.play();
});

shuffleBtn.click(function () {
    shufflingCard.play();
});

stayBtn.click(function () {
    ai.play();
});

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
    var card = cards[Math.floor(Math.random() * cards.length)];
    // print(chance);
    // if the player has reached 16 or more

    // rule no.1: they got 10% chance to reach 21
    // rule no.2: they got 80% chance to reach 20 or 21
    // rule no.3: they got 10% chance to exceed 21
    if (playerSum >= 16) {
        var chance = Math.random();
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
                if (inner80 <= 0.1) {
                    //10%
                    console.log("10% chance to get 21");
                    card = 21 - playerSum;
                }
                // rule no.2: 20% chance to get 20
                else if (inner80 <= 0.3) {
                    console.log("20% chance to get 20");
                    card = 21 - playerSum - 1;
                }
                // rule no.3: 30% chance to get any cards that make the sum below 21
                else if (inner80 <= 0.6) {
                    console.log(
                        "30% chance to get any cards that make the sum below 21"
                    );
                    let winCard = 21 - playerSum;
                    let cardIdx = cards.indexOf(winCard);
                    let tempArr = [];
                    for (let i = cardIdx; i > 0; i--) {
                        tempArr.push(cards[i - 1]);
                    }
                    //getting the card from tempArr
                    card = tempArr[Math.floor(Math.random() * tempArr.length)];
                }
                // rule no.4: 40% chance to get any cards that make the sum exceeds 21
                else {
                    console.log(
                        "40% chance to get any cards that make the sum exceeds 21"
                    );
                    let winCard = 21 - playerSum;
                    let cardIdx = cards.indexOf(winCard);
                    let tempArr = [];
                    for (let i = cardIdx; i < cards.length; i++) {
                        tempArr.push(cards[i]);
                    }
                    //getting the card from tempArr
                    card = tempArr[Math.floor(Math.random() * tempArr.length)];
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
                    card = tempArr[Math.floor(Math.random() * tempArr.length)];
                }
            }
        } else {
            console.log("10% chance to lose");
            //logic to get the card that has the value more than the winning numbers (e.g. no.3 made the total 21, so get all cards except 3 and below)
            let winCard = 21 - playerSum;
            let cardIdx = cards.indexOf(winCard);
            let tempArr = [];
            for (let i = cardIdx; i < cards.length; i++) {
                tempArr.push(cards[i]);
            }
            //getting the card from tempArr
            card = tempArr[Math.floor(Math.random() * tempArr.length)];
        }
    }
    playerCards.push(card);
    playerSum = sumTotal(playerCards);
    $("#player-cards").html("<p>" + playerCards + "</p>");
}

function getCardAI() {
    var card = cards[Math.floor(Math.random() * cards.length)];
    dealerCards.push(card);
    $("#dealer-cards").html('<p id="initialAI">' + dealerCards + "</p>");
    dealerSum = sumTotal(dealerCards);
    $("#dealer-sum").html(dealerSum);
}
function initialCard() {
    var initialChance = Math.random();

    //0.8% chance to get a natural mekdiejack - instant win
    if (initialChance < 0.008) {
        naturalJack();
    } else {
        getCard();
        getCard();
        //repeat second draw if the total is 22
        if (playerSum >= 22) {
            playerCards.pop();
            getCard();
        }
    }
    $("#player-sum").html(playerSum);
}

function naturalJack() {
    playerCards.push(10);
    playerCards.push(11);
    $("#player-cards").html("<p>" + playerCards + "</p>");
}
function naturalJackAI() {
    dealerCards.push(10);
    dealerCards.push(11);
    $("#dealer-cards").html('<p id="initialAI">?,' + dealerCards[1] + "</p>");
}

function initialAI() {
    var initChance = Math.random();
    //0.8% chance to get a natural mekdiejack - instant win
    if (initChance < 0.008) {
        naturalJackAI();
    } else {
        getCardAI();
        getCardAI();

        //repeat second draw if the total is 22
        if (dealerSum >= 22) {
            dealerCards = [];
            initialAI();
        }
    }
    dealerSum = sumTotal(dealerCards);

    //if the player does not get natural, hide it as usual
    if (playerSum != 21) {
        $("#dealer-sum").html("?");
        $("#initialAI").html('<p id="initialAI">?,' + dealerCards[1] + "</p>");
    }
    //show the cards instantly if they player got natural mekdiejack
    else {
        $("#dealer-sum").html(dealerSum);
        $("#initialAI").html('<p id="initialAI">' + dealerCards + "</p>");
    }
}

function initialCheck() {
    if (playerSum == 21 && dealerSum == 21) {
        draw.play();
        $("#result").html("Instant Draw! Natural Draw de MekdieJack ~ ");
        $("#restart").html("Play again");
        disableBtn();
    } else if (playerSum > dealerSum && playerSum == 21) {
        win.play();
        $("#result").html("Instant Win! Natural MekdieJack ~ ");
        $("#restart").html("Play again");
        disableBtn();
    }
}
function startGame() {
    $(".board").show();
    $(".startgame").hide();
    $(".game-control").css("display", "inline-flex");

    //get initial 2 cards
    initialCard();
    initialAI();

    //check the initial cards
    initialCheck();
}

function restartGame() {
    $("#restart").html("Restart");
    $("#result").html("");
    $("#hit").prop("disabled", false);
    $("#stay").prop("disabled", false);

    playerCards = [];
    $("#player-cards").html("");
    $("#player-sum").html("0");
    playerSum = 0;
    initialCard();

    dealerCards = [];
    $("#dealer-cards").html("");
    $("#dealer-sum").html("0");
    dealerSum = 0;
    initialAI();

    //check the initial cards
    initialCheck();
}
function hitBtn() {
    getCard();
    playerSum = sumTotal(playerCards);
    $("#player-sum").html(playerSum);

    if (playerSum == 21) {
        win.play();
        $("#result").html("You Win");
        $("#restart").html("Play again");
        disableBtn();
    } else if (playerSum > 21) {
        lose.play();
        $("#result").html("You Lose");
        $("#restart").html("Play again");
        disableBtn();
    }
}
function stay() {
    disableBtn();
    //to delay card draw from AI
    setTimeout(function () {
        aiMoves();
    }, 1000);
}
// Basically AI moves
function aiMoves() {
    dealingCard.play();
    //keep the game going if the dealer sum still less then 21 (to prevent overflowing when dealer is an instant win)
    if (!(dealerSum == 21 && dealerSum > playerSum)) {
        getCardAI();

        //this is going to the loop because, after click stay btn, the inside of the timeout is clicking the stay button itself,
        // so it will keep repeating as a recursive function until certain conditions met

        //AI keep playing if the sum is not equal to randomizer between 15-19
        var thresholdAI = [15, 16, 17, 18];
        const idxThreshold = Math.floor(Math.random() * thresholdAI.length);

        if (dealerSum <= thresholdAI[idxThreshold]) {
            setTimeout(function () {
                aiMoves();
            }, 500);
        }
        // stop playing if exceeds 18
        else {
            if (dealerSum > playerSum && dealerSum <= 21) {
                lose.play();
                $("#result").html("You Lose");
                $("#restart").html("Play again");
                disableBtn();
            } else if (dealerSum == playerSum) {
                draw.play();
                $("#result").html("Draw");
                $("#restart").html("Play again");
                disableBtn();
            } else {
                win.play();
                $("#result").html("You Win");
                $("#restart").html("Play again");
                disableBtn();
            }
        }
    }
    // stop the game if the dealer wins on the first draw
    else {
        lose.play();
        $("#result").html("You Lose");
        $("#restart").html("Play again");
        disableBtn();
    }
}

function disableBtn() {
    $("#hit").prop("disabled", true);
    $("#stay").prop("disabled", true);
    $("#player-sum").html(playerSum);
    $("#dealer-sum").html(dealerSum);
    $("#dealer-cards").html('<p id="initialAI">' + dealerCards + "</p>");
    //delay new game button for a second to avoid spam click
    $("#restart").prop("disabled", true);
    setTimeout(function () {
        $("#restart").prop("disabled", false);
    }, 1000);
}
