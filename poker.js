function resetPG() {
    PGbox.style.display = "none";
    startPG.style.display = "none";
    dealer.style.display = "none";
    choice1.style.display = "none";
    choice2.style.display = "none";
    choice3.style.display = "none";
    choice4.style.display = "none";
    card.style.display = "none";
    score.style.display = "none";
    playAgain.style.display = "none"
    hidePG.style.display = "none";
    $('.gameButton').css("display", "block");
    description2.style.display = "block";
}

var scoreCount = {
    player: 0,
    dealer: 0
};

function beginPoker() {
    $('.gameButton').css("display", "none");
    description2.style.display = "none";

    // display the intro
    PGbox.style.display = "block";
    startPG.style.display = "block";
    dealer.style.display = "none";
    choice1.style.display = "none";
    choice2.style.display = "none";
    choice3.style.display = "none";
    choice4.style.display = "none";
    card.style.display = "none";
    score.style.display = "none";
    score.innerHTML = ("scoreboard");
    playAgain.style.display = "none";
    PGbox.innerHTML = ("<br> <strong>This is a modified version of poker! Here's how it works: <br></strong>\
    <span style='line-height: 133%'>\
    <br> -6 random hands of 4 cards are going to be generated - 4 for you, 2 for the dealer \
    <br> -the dealer will compare both of theirs and choose the best one \
    <br> -there will be one card placed on the table for both you and the dealer to use (you can't see it) \
    <br> -you will be shown your 4 hands, and have to decide which hand you want to keep \
    <br> -the cards will be revealed and a winner will be announced!</span>");
    hidePG.style.display = "block";
    scoreCount.player = 0;
    scoreCount.dealer = 0;
};

var storeData = new Array();		//globally defined variable

function poker() {
    // display the game
    startPG.style.display = "none";
    dealer.style.display = "block";
    choice1.style.display = "block";
    choice2.style.display = "block";
    choice3.style.display = "block";
    choice4.style.display = "block";
    card.style.display = "block";
    score.style.display = "block";
    playAgain.style.display = "none";
    PGbox.innerHTML = ("<br><br> Choose one of the 4 hands shown on the bottom.");
    dealer.innerHTML = ("dealer hand");
    card.innerHTML = ("table card");
    choice1.style.cursor = "auto";
    choice1.style.pointerEvents = "auto";
    choice1.style.backgroundColor="initial";
    choice2.style.cursor = "auto";
    choice2.style.pointerEvents = "auto";
    choice2.style.backgroundColor="initial";
    choice3.style.cursor = "auto";
    choice3.style.pointerEvents = "auto";
    choice3.style.backgroundColor="initial";
    choice4.style.cursor = "auto";
    choice4.style.pointerEvents = "auto";
    choice4.style.backgroundColor="initial";


    // part 1: randomly generate the hands
    var possibleCards = ["AD", "AC", "AH", "AS", "2D", "2C", "2H", "2S", "3D", "3C", "3H", "3S", "4D", "4C",
        "4H", "4S", "5D", "5C", "5H", "5S", "6D", "6C", "6H", "6S", "7D", "7C", "7H", "7S", "8D", "8C", "8H",
        "8S", "9D", "9C", "9H", "9S", "TD", "TC", "TH", "TS", "JD", "JC", "JH", "JS", "QD", "QC", "QH", "QS",
        "KD", "KC", "KH", "KS"];
    var dealer1 = new Array(); var dealer2 = new Array();
    var player1 = new Array(); var player2 = new Array(); var player3 = new Array(); var player4 = new Array();
    var card1 = "x"; var card2 = "x"; var card3 = "x"; var card4 = "x"; var card5 = "x"; var card6 = "x";
    var j=51;
    for (var i=0; i<4; i++) {
        card1 = Math.floor(Math.random() * j);
        dealer1[i] = possibleCards[card1];
        possibleCards.splice(card1, 1);
        j--;
        card2 = Math.floor(Math.random() * j);
        dealer2[i] = possibleCards[card2];
        possibleCards.splice(card2, 1);
        j--;
        card3 = Math.floor(Math.random() * j);
        player1[i] = possibleCards[card3];
        possibleCards.splice(card3, 1);
        j--;
        card4 = Math.floor(Math.random() * j);
        player2[i] = possibleCards[card4];
        possibleCards.splice(card4, 1);
        j--;
        card5 = Math.floor(Math.random() * j);
        player3[i] = possibleCards[card5];
        possibleCards.splice(card5, 1);
        j--;
        card6 = Math.floor(Math.random() * j);
        player4[i] = possibleCards[card6];
        possibleCards.splice(card6, 1);
        j--;
    };
    var tableCard = possibleCards[Math.floor(Math.random() * j)];

    // part 2: determine dealer's hand
    dealer1.push(tableCard);
    dealer2.push(tableCard);

    var tempString1 = ""; var tempString2 = "";
    var tempArray1 = new Array(); var tempArray2 = new Array();
    for (var k=0; k<5 ; k++) {
        tempString1 = dealer1[k];
        dealer1[k] = tempString1.split('');
        tempArray1 = tempArray1.concat(dealer1[k]);

        tempString2 = dealer2[k];
        dealer2[k] = tempString2.split('');
        tempArray2 = tempArray2.concat(dealer2[k]);
    }
    dealer1 = tempArray1;
    dealer2 = tempArray2;

    var dealerHand = new Array();
    if ( checkHand(dealer1) > checkHand(dealer2) ) {
        dealerHand = dealer1;
    } else if ( checkHand(dealer1) < checkHand(dealer2) ) {
        dealerHand = dealer2;
    } else if ( checkHand(dealer1) === checkHand(dealer2) ) {
        if (compareHands(dealer1, dealer2) === 1) {
            dealerHand = dealer1;
        } else if (compareHands(dealer1, dealer2) === 2) {
            dealerHand = dealer2;
        }
    }

    // part 3: determine player's hand
    choice1.innerHTML = (player1[0] + ", " + player1[1] + ", " + player1[2] + ", " + player1[3]);
    choice2.innerHTML = (player2[0] + ", " + player2[1] + ", " + player2[2] + ", " + player2[3]);
    choice3.innerHTML = (player3[0] + ", " + player3[1] + ", " + player3[2] + ", " + player3[3]);
    choice4.innerHTML = (player4[0] + ", " + player4[1] + ", " + player4[2] + ", " + player4[3]);;
    storeData = [dealerHand, player1, player2, player3, player4, tableCard];
    // game continues when they click on an option (next function runs)
};

function poker2(choice) {
    // finish determining player's hand
    var playerHand = new Array();
    switch(choice){
        case 1: playerHand = storeData[1]; choice1.style.backgroundColor="#d8d8d8"; break;
        case 2: playerHand = storeData[2]; choice2.style.backgroundColor="#d8d8d8"; break;
        case 3: playerHand = storeData[3]; choice3.style.backgroundColor="#d8d8d8"; break;
        case 4: playerHand = storeData[4]; choice4.style.backgroundColor="#d8d8d8"; break;
        default: break;
    }
    playerHand.push(storeData[5]);

    var tempString1 = ""; var tempString2 = "";
    var tempArray1 = new Array(); var tempArray2 = new Array();
    for (var k=0; k<5 ; k++) {
        tempString1 = playerHand[k];
        playerHand[k] = tempString1.split('');
        tempArray1 = tempArray1.concat(playerHand[k]);
    }
    playerHand = tempArray1;

    // part 4: display hands, card + winner
    card.innerHTML = (card.innerHTML + ":<br>" + storeData[5]);
    var dealerHand = storeData[0];
    dealer.innerHTML = (dealer.innerHTML + ":<br>" + dealerHand[0] + dealerHand[1] + ", " + dealerHand[2] + dealerHand[3] + ", "
    + dealerHand[4] + dealerHand[5] + ", " + dealerHand[6] + dealerHand[7]);

    var winner = "";
    if ( checkHand(playerHand) > checkHand(dealerHand) ) {
        winner = "Player";
        scoreCount.player ++;
    } else if ( checkHand(playerHand) < checkHand(dealerHand) ) {
        winner = "Dealer";
        scoreCount.dealer ++;
    } else if ( checkHand(playerHand) === checkHand(dealerHand) ) {
        if (compareHands(playerHand, dealerHand) === 1) {
            winner = "Player";
            scoreCount.player ++;
        } else if (compareHands(playerHand, dealerHand) === 2) {
            winner = "Dealer";
            scoreCount.dealer ++;
        }
    };

    //fix the buttons so they can't play again with these cards
    choice1.style.cursor = "default";
    choice1.style.pointerEvents = "none";
    choice2.style.cursor = "default";
    choice2.style.pointerEvents = "none";
    choice3.style.cursor = "default";
    choice3.style.pointerEvents = "none";
    choice4.style.cursor = "default";
    choice4.style.pointerEvents = "none";

    score.innerHTML = ("scoreboard <br> Player: " + scoreCount.player + "<br> Dealer: " + scoreCount.dealer);
    playAgain.style.display = "block";

    dealerHand = nameHand(checkHand(dealerHand));
    playerHand = nameHand(checkHand(playerHand));

    PGbox.innerHTML = ("<br> Your hand was: " + playerHand + "<br>The dealer's hand was: " + dealerHand
    + "<br>The winner is: " + winner);
};

function nameHand(input) {
    var hand = "";
    switch(input){
        case 1: hand= "High card"; break;
        case 2: hand= "One pair"; break;
        case 3: hand= "Two pairs"; break;
        case 4: hand= "Three of a kind"; break;
        case 5: hand= "Straight"; break;
        case 6: hand= "Flush"; break;
        case 7: hand= "Full house"; break;
        case 8: hand= "Four of a kind"; break;
        case 9: hand= "Straight flush"; break;
        case 10: hand= "Royal flush"; break;
        default: break;
    }
    return hand;
}

function checkHand(input) {
    var values = new Array();
    var suits = new Array();

    var j=0;
    for (var i=0; i<10; i+=2) {        // separates the string into
        values[j] = input[i];           // suits and values
        suits[j] = input[i+1];
        j++;
    }

    for (i=0; i<5; i++) {           // sorts array into ascending order
        switch(values[i]){
            case 'T': values[i] = 'a'; break;
            case 'J': values[i] = 'b'; break;
            case 'Q': values[i] = 'c'; break;
            case 'K': values[i] = 'd'; break;
            case 'A': values[i] = 'e'; break;
            default: break;
        }
    }
    values.sort();

    var straight = 1;                   // checks for straight
    for (i=0; i<4; i++) {
        switch(values[i]){
            case '1': if (values[i+1] != '2')straight = 0; break;
            case '2': if (values[i+1] != '3')straight = 0; break;
            case '3': if (values[i+1] != '4')straight = 0; break;
            case '4': if (values[i+1] != '5')straight = 0; break;
            case '5': if (values[i+1] != '6')straight = 0; break;
            case '6': if (values[i+1] != '7')straight = 0; break;
            case '7': if (values[i+1] != '8')straight = 0; break;
            case '8': if (values[i+1] != '9')straight = 0; break;
            case '9': if (values[i+1] != 'a')straight = 0; break;
            case 'a': if (values[i+1] != 'b')straight = 0; break;
            case 'b': if (values[i+1] != 'c')straight = 0; break;
            case 'c': if (values[i+1] != 'd')straight = 0; break;
            case 'd': if (values[i+1] != 'e')straight = 0; break;
            default: break;
        }
    }

    var flush = 1;                      // checks for flush
    suits.sort();
    for (i=0; i<4; i++) {
        if (suits[i] != suits[i+1]) flush = 0;
    }

    var countPair = 0;                  // checks for pairs
    for (i=0; i<4; i++) {
        if (values[i] === values[i+1]) countPair ++;
    }

    var fourOfAKind = 0;                // checks for 4 of a kind
    for (i=0; i<2; i++) {
        if (values[i] === values[i+1] && values[i+1] === values[i+2] &&
            values[i+2] === values[i+3]) fourOfAKind = 1;
    }

    var threeOfAKind = 0;               // checks for 3 of a kind
    for (i=0; i<3; i++) {
        if (values[i] === values[i+1] && values[i+1] === values[i+2]) threeOfAKind = 1;
    }

    var compare = ['a', 'b', 'c', 'd', 'e'];         // checks for royals
    var royal = 1;
    for (i=1; i<4; i++){
        if (compare[i] != values[i]) royal = 0;
    }

    if (royal === 1 && flush === 1){      // Royal Flush
        return 10;
    } else if (straight === 1 && flush === 1){           // Straight flush
        return 9;
    } else if (fourOfAKind === 1) {                  // 4 of a kind
        return 8;
    } else if (countPair === 3  && threeOfAKind === 1) {       // Full house
        return 7;
    } else if (flush === 1) {            // Flush
        return 6;
    } else if (straight === 1) {         // Straight
        return 5;
    } else if (threeOfAKind === 1) {      // Three of a Kind
        return 4;
    } else if (countPair === 2){         // Two Pairs
        return 3;
    } else if (countPair === 1) {        // One pair
        return 2;
    } else {                            // High Card
        return 1;
    }
}

function compareHands(player1, player2) {
    var values1 = new Array();
    var values2 = new Array();

    var j=0;
    for (var i=0; i<10 ; i+=2) {
        values1[j] = player1[i];
        values2[j] = player2[i];
        j++;
    }

    for (i=0; i<5; i++) {
        switch(values1[i]){
            case 'T': values1[i] = 'a'; break;
            case 'J': values1[i] = 'b'; break;
            case 'Q': values1[i] = 'c'; break;
            case 'K': values1[i] = 'd'; break;
            case 'A': values1[i] = 'e'; break;
            default: break;
        }
    }
    values1.sort();
    for (i=0; i<5; i++) {
        switch(values2[i]){
            case 'T': values2[i] = 'a'; break;
            case 'J': values2[i] = 'b'; break;
            case 'Q': values2[i] = 'c'; break;
            case 'K': values2[i] = 'd'; break;
            case 'A': values2[i] = 'e'; break;
            default: break;
        }
    }
    values2.sort();

    var card1 = '0';
    var card2 = '0';
    switch(checkHand(player1)) {
        case 1:
            for (i=4; i>-1; i--){
                if(values1[i] > values2[i]) return 1;
                else if (values1[i] < values2[i]) return 2;
            }
        case 2:
            for (i=0; i<4; i++){
                if(values1[i] === values1[i+1]) card1 = values1[i];
                if(values2[i] === values2[i+1]) card2 = values2[i];
            } if (card1 > card2) {
            return 1;
        } else if (card2 > card1) {
            return 2;
        } else if (card1 === card2) {
            for (i=4; i>-1; i--){
                if(values1[i] > values2[i]) return 1;
                else if (values1[i] < values2[i]) return 2;
            }
        }
        case 3:
            var pair1a = 0; var pair1b = 0; var pair2a = 0; var pair2b = 0;
            for (i=4; i>0; i--){
                if (pair1a === 0){
                    if(values1[i] === values1[i-1]) pair1a = values1[i];
                } if (pair1a != 0) {
                    if(values1[i] === values1[i-1]) pair1b = values1[i];
                } if (pair2a == 0) {
                    if(values2[i] === values2[i-1]) pair2a = values2[i];
                } if (pair2a != 0) {
                    if (values2[i] === values2[i-1]) pair2b = values2[i];
                }
            }if (pair1a > pair2a) {
            return 1;
        } else if (pair2a > pair1a) {
            return 2;
        } else if (pair1a === pair2a) {
            if (pair1b > pair2b) {
                return 1;
            } else if (pair2b > pair1b) {
                return 2;
            } else if (pair1b === pair2b) {
                for (i=4; i>-1; i--){
                    if(values1[i] > values2[i]) return 1;
                    else if (values1[i] < values2[i]) return 2;
                }
            }
        }
        case 4:
            for (i=0; i<3; i++){
                if(values1[i] === values1[i+1] && values1[i+1] === values1[i+2]){
                    card1 = values1[i];
                }if(values2[i] === values2[i+1] && values2[i+1] === values2[i+2]){
                    card2 = values2[i];
                }
            } if (card1 > card2) {
            return 1;
        } else if (card2 > card1) {
            return 2;
        } else if (card1 === card2) {
            for (i=4; i>-1; i--){
                if(values1[i] > values2[i]) return 1;
                else if (values1[i] < values2[i]) return 2;
            }
        }
        case 5:
            if(values1[4] > values2[4]) return 1;
            else return 2;
        case 6:
            for (i=4; i>-1; i--){
                if(values1[i] > values2[i]) return 1;
                else if (values1[i] < values2[i]) return 2;
            }
        case 7:
            for (i=0; i<3; i++){
                if(values1[i] === values1[i+1] && values1[i+1] === values1[i+2]){
                    card1 = values1[i];
                }if(values2[i] === values2[i+1] && values2[i+1] === values2[i+2]){
                    card2 = values2[i];
                }
            }if (card1 > card2) {
            return 1;
        } else if (card2 > card1) {
            return 2;
        } else if (card1 === card2) {
            for (i=4; i>-1; i--){
                if(values1[i] > values2[i]) return 1;
                else if (values1[i] < values2[i]) return 2;
            }
        }
        case 8:
            for (i=0; i<3; i++) {
                if (values1[i] === values1[i+1]) {
                    card1 = values1[i];
                } if (values2[i] === values2[i+1]) {
                    card2 = values2[i];
                }
            }
            if (card1 > card2) {
                return 1;
            } else if (card2 > card1) {
                return 2;
            } else if (card1 === card2) {
                for (i=4; i>-1; i--){
                    if(values1[i] > values2[i]) return 1;
                    else if (values1[i] < values2[i]) return 2;
                }
            }

        case 9:
            if(values1[4] > values2[4]) return 1;
            else return 2;
    }
    return 0;
}
