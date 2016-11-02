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
  for (var i = 0; i < cards.length; i++) {
    for (var j = 0; j < cards.length; j++) {
      if (cards[j].point === 1) {
        AceCount++;
      }
      if (cards[i].point === 1 && cardSum <= 10 && cards[0].point != 1 && AceCount === 1) {
        cards[i].point = 11;
      }
      if (cards[i].point === 1 && cardSum > 10 && AceCount > 1) {
        cards[i].point = 1;
      }
    }
    if (cards[i].point > 10) {
      cards[0].point = 10;
    }
    cardSum += cards[i].point;
  }
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
  var deck = newDeck();
  var dealt = true;
  var numOfCards = 52;
  $("#deal-button").click(function () {
    if (dealt) {
      var randNumPlayer1 = Math.floor(getRandomInt(0,numOfCards));
      $("#player-hand").prepend('<img class="card" src="' + getCardImageUrl(deck[randNumPlayer1]) + '" />');
      deck.splice(randNumPlayer1, 1);
      numOfCards -= 1;

      var randNumDealer1 = Math.floor(getRandomInt(0,numOfCards));
      $("#dealer-hand").prepend('<img class="card" src="' + getCardImageUrl(deck[randNumDealer1]) + '" />');
      deck.splice(randNumDealer1, 1);
      numOfCards -= 1;

      var randNumPlayer2 = Math.floor(getRandomInt(0,numOfCards));
      $("#player-hand").prepend('<img class="card" src="' + getCardImageUrl(deck[randNumPlayer2]) + '" />');
      deck.splice(randNumPlayer2, 1);
      numOfCards -= 1;

      var randNumDealer2 = Math.floor(getRandomInt(0,numOfCards));
      $("#dealer-hand").prepend('<img class="card" src="' + getCardImageUrl(deck[randNumDealer2]) + '" />');
      deck.splice(randNumDealer2, 1);
      numOfCards -= 1;

      dealt = false;
  }
  return dealt;
  });
  $("#hit-button").click(function() {
    var randNumPlayerHit = Math.floor(getRandomInt(0,numOfCards));
    $("#player-hand").prepend('<img class="card" src="' + getCardImageUrl(deck[randNumPlayerHit]) + '" />');
    deck.splice(randNumPlayerHit, 1);
    numOfCards -= 1;
  });
});
