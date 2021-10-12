$(document).ready(function() {
  assertScoreByCode('M01,G25+', 5, 'Rulebook: Multiple Bonuses');
  assertScoreByCode('G27,G08,G01,G09,M05,G32,G04+', 66, 'Rulebook: Scoring Example');
  assertScoreByCode('G10,G05,G11,G25+', 13, 'Rulebook FAQ: Tomalek');
  assertScoreByCode('G10,G25,G19,G18+', 24, 'Rulebook FAQ: Tomalek');
  assertScoreByCode('G35,G01,G32,G15+', 26, 'Sickbay');
  assertScoreByCode('G35,G15,G27+', 0, 'Sickbay requires unique cards');
  assertScoreByCode('G21,G24+', 13, 'Leah Brahms')
  assertScoreByCode('G45,G01,G25,G26,G47,G21+', 44, 'Transporter');
  assertScoreByCode('M16,G13,G05+', 19, 'Personnel Issues');
  assertScoreByCode('M19,G01,G13,G49,G33+', 42, 'Blossoming Romance');
  assertScoreByCode('M21,G15,G16,G50+', 12, 'Space Confrontation');
});

function assertScoreByName(cardNames, expectedScore, message) {
  hand.clear();
  for (const cardName of cardNames) {
    hand.addCard(deck.getCardByName(cardName));
  }
  assertScore(hand, expectedScore, message);
}

function assertScoreByCode(code, expectedScore, message) {
  hand.clear();
  hand.loadFromString(code);
  assertScore(hand, expectedScore, message);
}

function assertScore(hand, expectedScore, message) {
  var score = hand.score();
  if (score === expectedScore) {
    $('#tests').append('<li class="list-group-item list-group-item-success"><b>TEST SUCCESS</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  } else {
    $('#tests').append('<li class="list-group-item list-group-item-danger"><b>TEST FAILED:</b> &nbsp;<a href="index.html?hand=' +
      hand.toString() + '">' + hand.cardNames().join() + '</a>&nbsp; scored ' + score + ' points (expected: ' + expectedScore + ')' +
      (message ? ':&nbsp;<b>' + message + '</b>' : '') + '</li>');
  }
}
