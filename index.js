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
const print = (val) => console.log(val);

const sumTotal = (arr) => arr.reduce((sum, value) => sum + value, 0);

const getCard = () => {
    let card = cards[Math.floor(Math.random() * cards.length)];
    const chance = Math.random();

    if (playerSum >= 16) {
        if (chance <= 0.1) {
            // 10% chance to reach 21
            console.log("10% chance to win instantly");
            card = 21 - playerSum;
        } else if (chance <= 0.9) {
            // 80% chance to go here
            console.log("80% chance");
            const innerChance = Math.random();
            console.log(innerChance);

            if (playerSum === 20) {
                // 10% chance to win directly to 21
                if (innerChance <= 0.1) {
                    console.log("win from 10% chance");
                    card = 1;
                } else {
                    // 90% chance to lose, sum will exceed 21
                    console.log("lose from 90% chance of 20-21");
                    card = getRandomCardExcluding([1]);
                }
            } else {
                if (innerChance <= 0.1) {
                    // 10% chance to get 21
                    console.log("10% chance to get 21");
                    card = 21 - playerSum;
                } else if (innerChance <= 0.3) {
                    // 20% chance to get 20
                    console.log("20% chance to get 20");
                    card = 21 - playerSum - 1;
                } else if (innerChance <= 0.6) {
                    // 30% chance to get any cards that make the sum below 21
                    console.log(
                        "30% chance to get any cards that make the sum below 21"
                    );
                    card = getRandomCardBelow(21 - playerSum);
                } else {
                    // 40% chance to get any cards that make the sum exceed 21
                    console.log(
                        "40% chance to get any cards that make the sum exceed 21"
                    );
                    card = getRandomCardAbove(21 - playerSum);
                }
            }
        } else {
            // 10% chance to lose
            console.log("10% chance to lose");
            card = getRandomCardAbove(21 - playerSum);
        }
    }

    playerCards.push(card);
    playerSum = sumTotal(playerCards);
    $("#player-cards").html(`<p>${playerCards.join(", ")}</p>`);
};

function getRandomCardExcluding(exclude) {
    const tempArr = cards.filter((card) => !exclude.includes(card));
    return tempArr[Math.floor(Math.random() * tempArr.length)];
}

function getRandomCardBelow(maxValue) {
    const tempArr = cards.filter((card) => card < maxValue);
    return tempArr[Math.floor(Math.random() * tempArr.length)];
}

function getRandomCardAbove(minValue) {
    const tempArr = cards.filter((card) => card >= minValue);
    return tempArr[Math.floor(Math.random() * tempArr.length)];
}

const getCardAI = () => {
    const card = cards[Math.floor(Math.random() * cards.length)];
    dealerCards.push(card);
    $("#dealer-cards").html(`<p id="initialAI">${dealerCards.join(", ")}</p>`);
    dealerSum = sumTotal(dealerCards);
    $("#dealer-sum").html(dealerSum);
};

const initialCard = () => {
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
};

const naturalJack = () => {
    playerCards.push(10, 11);
    playerSum = sumTotal(playerCards);
    $("#player-cards").html(`<p>${playerCards.join(", ")}</p>`);
    $("#player-sum").html(playerSum);
};

const naturalJackAI = () => {
    dealerCards.push(10, 11);
    dealerSum = sumTotal(dealerCards);
    $("#dealer-cards").html(`<p id="initialAI">?,${dealerCards[1]}</p>`);
    $("#dealer-sum").html(dealerSum);
};

const initialAI = () => {
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
};

const initialCheck = () => {
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
};

const startGame = () => {
    $(".board").show();
    $(".startgame").hide();
    $(".game-control").css("display", "inline-flex");

    // Enable buttons when the game starts
    $("#restart").prop("disabled", false);
    $("#hit").prop("disabled", false);
    $("#stay").prop("disabled", false);

    //get initial 2 cards
    initialCard();
    initialAI();

    //check the initial cards
    initialCheck();
};

const restartGame = () => {
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
};

const hitBtn = () => {
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
};

const stay = () => {
    disableBtn();
    //to delay card draw from AI
    setTimeout(() => {
        aiMoves();
    }, 1000);
};

// Basically AI moves
const aiMoves = () => {
    dealingCard.play();

    // Keep the game going if the dealer sum is still less than 21 (to prevent overflowing when dealer is an instant win)
    if (!(dealerSum === 21 && dealerSum > playerSum)) {
        getCardAI();

        // This is going to the loop because, after clicking the stay button, the inside of the timeout is clicking the stay button itself,
        // so it will keep repeating as a recursive function until certain conditions are met

        // AI keeps playing if the sum is not equal to randomizer between 15-19
        const thresholdAI = [15, 16, 17, 18];
        const idxThreshold = Math.floor(Math.random() * thresholdAI.length);

        if (dealerSum <= thresholdAI[idxThreshold]) {
            setTimeout(() => {
                aiMoves();
            }, 500);
        } else {
            // Stop playing if exceeds 18
            if (dealerSum > playerSum && dealerSum <= 21) {
                lose.play();
                $("#result").html("You Lose");
                $("#restart").html("Play again");
                disableBtn();
            } else if (dealerSum === playerSum) {
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
    } else {
        // Stop the game if the dealer wins on the first draw
        lose.play();
        $("#result").html("You Lose");
        $("#restart").html("Play again");
        disableBtn();
    }
};

const disableBtn = () => {
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
};
