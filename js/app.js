Handlebars.registerHelper('i18n', function() {
  var key = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
        key += arguments[arg];
    }
  }
  try {
    return jQuery.i18n.prop(key);
  } catch (e) {
    return key;
  }
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

var languages = {
  'en': 'English',
  'de': 'Deutsch'
}

$(document).ready(function() {
  const lang = localStorage.getItem('language') || 'en'; 
  jQuery.i18n.properties({
    name:'Messages', 
    path:'i18n/', 
    mode:'map',
    cache: true,
    language: lang,
    async: true,
    callback: function() {
      showCards();
      getHandFromQueryString();
      $('#sound-state').change(function () {
        toggleSound();
      });
      updateLabels(lang);
    }
  });
});

var click = new Audio('sound/click.mp3');
var swoosh = new Audio('sound/swoosh.mp3');
var clear = new Audio('sound/clear.mp3');
var magic = new Audio('sound/magic.mp3');
var actionId = NONE;
var selectedCard = NONE;
var borgCubeIx = NONE;

function selectLanguage(lang) {
  localStorage.setItem('language', lang);
  jQuery.i18n.properties({
    name:'Messages', 
    path:'i18n/', 
    mode:'map',
    cache: true,
    language: lang,
    async: true,
    callback: function() {
      swoosh.play();
      showCards();
      updateLabels(lang);
    }
  });
}

function updateLabels(lang) {
  $('#clear').html(jQuery.i18n.prop('button.reset'));
  $('#sound-label').html(jQuery.i18n.prop('button.sound'));
  $('#selected-language').html(languages[lang]);
  $('#language .dropdown-item').removeClass('active');
  $('#lang-' + lang).addClass('active');
}

function reset() {
  clear.play();
  hand.clear();
  showCards();
  updateHandView();
  actionId = NONE;
  selectedCard = NONE;
  borgCubeIx = NONE;
  $("#hand").show();
}

function toggleSound() {
  click.muted = swoosh.muted = clear.muted = magic.muted = !click.muted;
  clear.play();
}

function addToView(id) {
  if (hand.addCard(deck.getCardById(id))) {
    click.play();
    updateHandView();
    actionId = NONE;
    selectedCard = NONE;
    borgCubeIx = NONE;
  }
}

function selectFromHand(id) {
  const card = hand.getCardById(id);
  if (actionId === THOUGHT_MAKER) {
    if (card.lifeform.length > 0) {
      selectedCard = card.id;
      magic.play();
      updateHandView();
    }
  } else if (actionId === BORG_CUBE) {
    var borgCube = hand.getCardById(BORG_CUBE);
    if (!card.type.includes('mission') && (borgCube.actionData === undefined || !borgCube.actionData.includes(card.id))) {
      if (borgCube.actionData === undefined) {
        borgCube.actionData = [];
      }
      borgCube.actionData[borgCubeIx] = card.id;
      magic.play();
      updateHandView();
    }
  } else {
    removeFromHand(id);
  }
}

function removeFromHand(id) {
  if (hand.deleteCardById(id)) {
    swoosh.play();
    updateHandView();
  }
}

function updateHandView() {
  var template = Handlebars.compile($("#hand-template").html());
  var score = hand.score();
  var html = template({
    playerCards: hand.cards(),
    thoughtMakerTarget: actionId === THOUGHT_MAKER ? selectedCard : ''
  }, {
    allowProtoMethodsByDefault: true
  });
  $('#hand').html(html);
  if (score >= 0) {
    $('#points').text(('000' + score).slice(-3));
  } else {
    $('#points').text('-' + ('000' + Math.abs(score)).slice(-3));
  }
  $('#cardCount').text(hand.size());
  $('#cardLimit').text(hand.limit());
  if (hand.empty()) {
    $('#settings').show();
  } else {
    $('#settings').hide();
  }
  updateUrl();
}

function updateUrl() {
  var params = [];
  if (!hand.empty()) {
    params.push('hand=' + hand.toString());
  }
  if (params.length > 0) {
    history.replaceState(null, null, "index.html?" + params.join('&'));
  } else {
    history.replaceState(null, null, "index.html");
  }
}

function getHandFromQueryString() {
  var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < params.length; i++) {
    var param = params[i].split('=');
    if (param[0] === 'hand') {
      hand.loadFromString(decodeURIComponent(param[1]).replace(/ /g, '+'));
    }
  }
  updateHandView();
}

function useCardAction(id) {
  click.play();
  actionId = id;
  selectedCard = NONE;
  borgCubeIx = NONE;
  hand.undoCardAction(id);
  showCards();
  updateHandView();
  $('#card-action-text-' + id).html(jQuery.i18n.prop(id + '.action'));
  $('#card-action-use-' + id).hide();
  $('#card-action-cancel-' + id).show();
}

function cancelCardAction(id) {
  click.play();
  hand.undoCardAction(id)
  actionId = NONE;
  selectedCard = NONE;
  borgCubeIx = NONE;
  $('#card-action-cancel-' + id).hide();
  $('#card-action-use-' + id).show();
  showCards();
  updateHandView();
}

function useBorgCube(ix) {
  click.play();
  actionId = BORG_CUBE;
  borgCubeIx = ix;
  selectedCard = NONE;
  var borgCube = hand.getCardById(BORG_CUBE);
  if (borgCube.actionData !== undefined) {
    delete borgCube.actionData[ix];
  }
  showCards();
  updateHandView();
  $('#card-action-text-M02').html(jQuery.i18n.prop('M02.action'));
  $('#borg-cube-' + ix).hide();
  $('#cancel-borg-cube-' + ix).show();
}

function cancelBorgCube(ix) {
  click.play();
  actionId = NONE;
  borgCubeIx = NONE;
  selectedCard = NONE;
  var borgCube = hand.getCardById(BORG_CUBE);
  if (borgCube.actionData !== undefined) {
    delete borgCube.actionData[ix];
  }
  showCards();
  updateHandView();
}

function modifyUnidentifiedShip() {
  var unidentifiedShip = hand.getCardById(UNIDENTIFIED_SHIP);
  if (unidentifiedShip !== undefined) {
    magic.play();
    unidentifiedShip.actionData = [$('#G48-type').val(), $('#G48-lifeform').val(), $('#G48-affiliation').val(), $('#G48-specialty').val()];
    updateHandView();  
  }
}

function modifyThoughtMakerAffiliation() {
  var thoughtMaker = hand.getCardById(THOUGHT_MAKER);
  if (thoughtMaker !== undefined) {
    magic.play();
    thoughtMaker.actionData = [selectedCard, $('#G41-affiliation').val()];
    updateHandView();
  }
}

function showCards(types) {
  var template = Handlebars.compile($("#cards-template").html());
  var html = template({
    types: deck.getCardsByType(types),
  }, {
    allowProtoMethodsByDefault: true
  });
  $('#cards').html(html);
}
