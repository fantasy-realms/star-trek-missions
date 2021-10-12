class Hand {

  constructor() {
    this.cardsInHand = {};
  }

  addCard(card) {
    if (this._canAdd(card)) {
      this.cardsInHand[card.id] = new CardInHand(card);
      return true;
    }
    return false;
  }

  _canAdd(newCard) {
    if (this.cardsInHand[newCard.id] !== undefined) {
      return false;
    } else if (this.size() >= this.limit() && newCard.id !== MEDDLESOME_Q) {
      return false;
    } else if (newCard.type.includes('mission') && this._missionCount() >= 2) {
      return false;
    } else if (!newCard.type.includes('mission') && this._missionCount() == 0 && this.size() == this.limit() - 1) {
      return false;
    }
    return true;
  }

  deleteCardById(id) {
    if (id === MEDDLESOME_Q && this.size() > 7) {
      return false;
    } else {
      delete this.cardsInHand[id];
      return true;
    }
  }

  getCardById(id) {
    return this.cardsInHand[id];
  }

  contains(cardName) {
    for (const card of this.nonBlankedCards()) {
      if (card.name === cardName) {
        return true;
      }
    }
    return false;
  }

  countCardName(cardName) {
    var count = 0;
    for (const card of this.nonBlankedCards()) {
      if (card.name === cardName) {
        count++;
      }
    }
    return count;
  }

  containsId(cardId, allowBlanked) {
    return this.cardsInHand[cardId] !== undefined && (!this.cardsInHand[cardId].blanked || allowBlanked);
  }

  nonBlankedCards() {
    return this.cards().filter(function(card) {
      return !card.blanked;
    });
  }

  cards() {
    return Object.values(this.cardsInHand);
  }

  cardNames() {
    return this.cards().map(function(card) {
      return card.name;
    });
  }

  score() {
    var score = 0;
    this._resetHand();
    this._performCardActions();
    this._applyBlanking();
    for (const card of this.nonBlankedCards()) {
      if (card.preScore !== undefined) {
        card.preScore(card, this);
      }
    }
    for (const card of this.nonBlankedCards()) {
      score += card.score(this);
    }
    return score;
  }

  _missionCount() {
    var missions = 0;
    for (const card of this.cards()) {
      if (card.type.includes('mission')) {
        missions++;
      }
    }
    return missions;
  }

  _resetHand() {
    for (const card of this.cards()) {
      this.cardsInHand[card.id] = new CardInHand(card.card, card.actionData);
    }
  }

  _performCardActions() {
    for (const cardAction of ACTION_ORDER) {
      var actionCard = this.getCardById(cardAction);
      if (actionCard !== undefined) {
        actionCard.performCardAction(this);
      }
    }
  }

  _applyBlanking() {
    for (const card of this.nonBlankedCards().sort((a, b) => a.id.localeCompare(b.id))) {
      if (card.blankedIf !== undefined) {
        if (card.blankedIf(this)) {
          card.blanked = true;
        }
      }
    }
  }

  clear() {
    this.cardsInHand = {};
  }

  size() {
    return Object.keys(this.cardsInHand).length;
  }

  empty() {
    return this.size() === 0;
  }

  limit() {
    return 7 + (this.containsId(MEDDLESOME_Q, true) ? 2 : 0);
  }

  toString() {
    var actions = [];
    for (const card of this.cards()) {
      if (card.actionData !== undefined) {
        actions.push(card.id + ':' + card.actionData.join(':'));
      }
    }
    return Object.keys(this.cardsInHand).join() + '+' + actions.join();
  }

  loadFromString(string) {
    var parts = string.split('+');
    var cardIds = parts[0].split(',');
    var cardActions = parts[1].split(',').map(action => action.split(':'));
    this.loadFromArrays(cardIds, cardActions);
  }

  loadFromArrays(cardIds, cardActions) {
    this.clear();
    for (const cardId of cardIds) {
      this.addCard(deck.getCardById(cardId));
    }
    for (const cardAction of cardActions) {
      if (cardAction.length > 1) {
        var cardId = cardAction[0];
        var action = cardAction.slice(1);
        var actionCard = this.getCardById(cardId);
        this.cardsInHand[cardId] = new CardInHand(actionCard.card, action);
      }
    }
  }

  undoCardAction(id) {
    var actionCard = this.getCardById(id);
    this.cardsInHand[id] = new CardInHand(actionCard.card, undefined);
  }

}

var hand = new Hand();

class CardInHand {

  constructor(card, actionData) {
    this.card = card;
    this.actionData = actionData;
    this.id = card.id;
    this.name = card.name;
    this.preScore = card.preScore;
    this.calculateScore = card.calculateScore;
    this.blankedIf = card.blankedIf;
    this.action = card.action;
    this.type = card.type;
    this.specialty = card.specialty;
    this.lifeform = card.lifeform;
    this.affiliation = card.affiliation;
    this.points = 0;
    this.blanked = false;
    this.magic = false;
  }

  performCardAction(hand) {
    if (this.actionData !== undefined) {
      if (this.id === UNIDENTIFIED_SHIP) {
        if (this.actionData[0]) {
          this.type = [this.actionData[0]];
        } else {
          this.type = ['wild'];
        }
        if (this.actionData[1]) {
          this.lifeform = [this.actionData[1]];
        }
        if (this.actionData[2]) {
          this.affiliation = [this.actionData[2]];
        }
        if (this.actionData[3]) {
          this.specialty = [this.actionData[3]];
        }
      } else if (this.id === THOUGHT_MAKER) {
        var target = hand.getCardById(this.actionData[0]);
        if (target === undefined) {
          this.actionData = undefined;
        } else {
          var affiliation = this.actionData[1];
          target.affiliation = [affiliation];
          target.magic = true;
        }
      } else if (this.id === BORG_CUBE) {
        for (const targetId of this.actionData) {
          const target = hand.getCardById(targetId);
          if (target !== undefined) {
            target.blanked = true;
            target.blankedIf = function(hand) {
              return true;
            };
            target.magic = true;
          }
        }
      }
    }
  }

  score(hand) {
    if (this.blanked) {
      this.points = 0; 
    } else if (this.calculateScore !== undefined) {
      this.points = this.calculateScore(hand);
    }
    if (this.id === BORG_CUBE && this.actionData !== undefined) {
      return this.points + (this.actionData[0] ? this.points : 0) + (this.actionData[1] ? this.points : 0); 
    } else {
      return this.points;
    }
  }

  hasTags() {
    return this.specialty.length + this.lifeform.length + this.affiliation.length > 0;
  }

}
