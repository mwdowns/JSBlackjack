var deck = newDeck();
var dealt = true;
var numOfCards = 52;
var dealerCards = [];
var playerCards =[];
var playerScore = 0;
var dealerScore = 0;
var checkBust = true;
var checkStand = false;

function getCardImageUrl(card) {
  var faceCards = ['jack', 'queen', 'king'];
  if (card.point >= 2 && card.point <= 10) {
    return 'images/' + card.point + '_of_' + card.suit + '.png';
  }
  else if (card.point >= 11 && card.point <= 13) {

    return 'images/' + faceCards[card.point - 11] + '_of_' + card.suit + '.png';
  }
  else {
    return 'images/ace_of_' + card.suit + '.png';
  }
}

function calculatePoints(cards) {
  var cardSum = 0;
  var AceCount = 0;
  var newArr = [];
  var minusAceSum = 0;

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].point >= 2 && cards[i].point <= 9) {
      newArr.push(cards[i]);
    }
    if (cards[i].point >= 10) {
        cards[i].point = 10;
        newArr.push(cards[i]);
      }
    if (cards[i].point === 1) {
      AceCount++;
      newArr.push(cards[i]);
    }
    newArr.sort(function(a, b) {
      return b.point - a.point;
    });
  }
  minusAceArray = newArr.slice(0, (newArr.length - AceCount));
  AceArray = newArr.slice((newArr.length - AceCount), newArr.length);
  // minusAceSum = 0;
  AceSum = 0;
  for (var j = 0; j < minusAceArray.length; j++) {
    minusAceSum += minusAceArray[j].point;
  }
  if (AceCount === 4) {
    AceSum = 14;
  }
  if (minusAceSum < 10 && AceCount === 2) {
    AceSum = 12;
  }
  if (minusAceSum <= 10 && AceArray.length === 1) {
    AceSum = 11;
  }
  if (minusAceSum > 10) {
    for (var k = 0; k < AceArray.length; k++) {
      AceSum += AceArray[k].point;
    }
  }
  cardSum = minusAceSum + AceSum;

  return cardSum;
}

function newDeck() {
 var deck = [];
 var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
 for (var x = 1; x <= 13; x++) {
   for (var i = 0; i <= 3; i++) {
     deck.push({'point': x, 'suit': suits[i]});
   }
 }
 return deck;
}

function getRandomInt(min, max) {
  return Math.random() * (max-min) + min;
}

$(function() {
  function newGame() {
    deck = newDeck();
    dealt = true;
    numOfCards = 52;
    dealerCards = [];
    playerCards =[];
    playerScore = 0;
    dealerScore = 0;
    checkBust = true;
    checkStand = false;
  }


  $("#deal-button").click(function () {
    if (dealt) {
      var randNumPlayer1 = Math.floor(getRandomInt(0,numOfCards));
      $("#player-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumPlayer1]) + '" />');
      playerCards.push(deck[randNumPlayer1]);
      deck.splice(randNumPlayer1, 1);
      numOfCards -= 1;

      var randNumDealer1 = Math.floor(getRandomInt(0,numOfCards));
      $("#dealer-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumDealer1]) + '" />');
      dealerCards.push(deck[randNumDealer1]);
      deck.splice(randNumDealer1, 1);
      numOfCards -= 1;

      var randNumPlayer2 = Math.floor(getRandomInt(0,numOfCards));
      $("#player-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumPlayer2]) + '" />');
      playerCards.push(deck[randNumPlayer2]);
      deck.splice(randNumPlayer2, 1);
      numOfCards -= 1;

      var randNumDealer2 = Math.floor(getRandomInt(0,numOfCards));
      $("#dealer-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumDealer2]) + '" />');
      dealerCards.push(deck[randNumDealer2]);
      deck.splice(randNumDealer2, 1);
      numOfCards -= 1;

      playerScore = calculatePoints(playerCards);
      dealerScore = calculatePoints(dealerCards);

      $("#dealer-points").text(dealerScore);
      $("#player-points").text(playerScore);

      dealt = false;
      checkBust = false;
      console.log(playerCards.length);
  }
  return dealt;
  });

  $("#hit-button").click(function() {
    if (checkBust === false && checkStand === false) {
      var randNumPlayerHit = Math.floor(getRandomInt(0,numOfCards));
      $("#player-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumPlayerHit]) + '" />');
      playerCards.push(deck[randNumPlayerHit]);
      deck.splice(randNumPlayerHit, 1);
      numOfCards -= 1;
      if (calculatePoints(playerCards) === 21 || (playerCards.length === 5 &&  calculatePoints(playerCards) < 21)) {
        checkBust = true;
        $("#player-points").text(calculatePoints(playerCards) + " Winner! Winner! Chicken dinner!");
      } else if (calculatePoints(playerCards) > 21) {
        checkBust = true;
        $("#player-points").text(calculatePoints(playerCards) + " is over 21, doofus!");
      } else {
        $("#player-points").text(calculatePoints(playerCards));
      }




      if (calculatePoints(dealerCards) < 18) {
        var randNumDealerHit = Math.floor(getRandomInt(0,numOfCards));
        $("#dealer-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumDealerHit]) + '" />');
        dealerCards.push(deck[randNumDealerHit]);
        deck.splice(randNumDealerHit, 1);
        numOfCards -= 1;
        if (calculatePoints(dealerCards) === 21 || (dealerCards.length === 5 &&  calculatePoints(dealerCards) < 21)) {
          checkBust = true;
          $("#dealer-points").text(calculatePoints(dealerCards) + " Winner! Winner! Chicken dinner!");
          $("#player-points").text(calculatePoints(playerCards) + " You lost to a robot. Poor human.");
        } else if (calculatePoints(dealerCards) > 21) {
          checkBust = true;
          $("#dealer-points").text(calculatePoints(dealerCards) + " is over 21, dumb robot!");
          $("#player-points").text(calculatePoints(playerCards) + " Winner! Winner! Chicken dinner!");
        } else {
            $("#dealer-points").text(calculatePoints(dealerCards));
        }
      }
    }
  });

  $("#stand-button").click(function() {
    checkStand = true;
    if ((calculatePoints(dealerCards) === calculatePoints(playerCards)) || (calculatePoints(dealerCards) > calculatePoints(playerCards))) {
      $("#dealer-points").text(calculatePoints(dealerCards) + " Winner! Winner! Chicken dinner!");
      $("#player-points").text(calculatePoints(playerCards) + " You lost to a robot. Poor human.");
    }
    if (calculatePoints(dealerCards) < 18 || calculatePoints(dealerCards) < calculatePoints(playerCards)) {
      var randNumDealerHit = Math.floor(getRandomInt(0,numOfCards));
      $("#dealer-hand").append('<img class="card" src="' + getCardImageUrl(deck[randNumDealerHit]) + '" />');
      dealerCards.push(deck[randNumDealerHit]);
      deck.splice(randNumDealerHit, 1);
      numOfCards -= 1;
      if (calculatePoints(dealerCards) === 21 || (dealerCards.length === 5 &&  calculatePoints(dealerCards) < 21)) {
        checkBust = true;
        $("#dealer-points").text(calculatePoints(dealerCards) + " Winner! Winner! Chicken dinner!");
        $("#player-points").text(calculatePoints(playerCards) + " You lost to a robot. Poor human.");
      } else if (calculatePoints(dealerCards) > 21) {
        checkBust = true;
        $("#dealer-points").text(calculatePoints(dealerCards) + " is over 21, dumb robot!");
        $("#player-points").text(calculatePoints(playerCards) + " Winner! Winner! Chicken dinner!");
      } else {
          $("#dealer-points").text(calculatePoints(dealerCards));
      }
    }
  });

  $("#reset-button").click(function() {
    $("img").remove(".card");
    $("#dealer-points").text("");
    $("#player-points").text("");
    newGame();

  });


});
