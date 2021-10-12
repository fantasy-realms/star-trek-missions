var galaxyCards = {
  'G01': {
    id: 'G01',
    name: 'Ambassador K\'Ehleyr',
    type: ['personnel'],
    specialty: ['ambassador', 'security'],
    lifeform: ['klingon', 'human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return hand.contains('Lieutenant Worf') ? 10: 0;
    }
  },
  'G02': {
    id: 'G02',
    name: 'Ambassador Sarek',
    type: ['civilian'],
    specialty: ['ambassador'],
    lifeform: ['vulcan'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (!card.affiliation.includes('federation') && card.type.includes('captain')) {
          total += 5;
        }
      }
      return total;
    }
  },
  'G03': {
    id: 'G03',
    name: 'Bat\'leth',
    type: ['equipment'],
    specialty: ['weapon'],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var count = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('klingon') || card.affiliation.includes('klingon-empire')) {
          count++;
        }
      }
      return count == 1 ? 6 : (count >=2 ? 16 : 0);
    }
  },
  'G04': {
    id: 'G04',
    name: 'Bridge',
    type: ['location'],
    specialty: ['combat'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation') && (card.type.includes('personnel') || card.type.includes('system'))) {
          total += 3;
        }
      }
      return total;
    }
  },
  'G05': {
    id: 'G05',
    name: 'Captain Jean-Luc Picard',
    type: ['captain'],
    specialty: ['command', 'archaeologist'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.name === 'Bridge') {
          total += 5;
        } else if (card.type.includes('location')) {
          total += 3;
        }
      }
      return total;
    }

  },
  'G06': {
    id: 'G06',
    name: 'Chancellor Gowron',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['klingon'],
    affiliation: ['klingon-empire'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G06' && (card.lifeform.includes('klingon') || card.affiliation.includes('klingon-empire'))) {
          total += 5;
        }
      }
      return total;
    }
  },
  'G07': {
    id: 'G07',
    name: 'Commander Bruce Maddox',
    type: ['personnel'],
    specialty: ['engineer'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('android') || card.lifeform.includes('hologram')) {
          total += 5;
        }
      }
      return total;
    }
  },
  'G08': {
    id: 'G08',
    name: 'Commander Kurn',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['klingon'],
    affiliation: ['klingon-empire'],
    calculateScore: function(hand) {
      return hand.contains('Lieutenant Worf') ? 10: 0;
    }
  },
  'G09': {
    id: 'G09',
    name: 'Commander Sela',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['romulan'],
    affiliation: ['romulan-star-empire'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('hostile') || card.affiliation.includes('klingon-empire')) {
          total += 4;
        }
      }
      return total;
    }
  },
  'G10': {
    id: 'G10',
    name: 'Commander Tomalak',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['romulan'],
    affiliation: ['romulan-star-empire'],
    calculateScore: function(hand) {
      var federationCards = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation')) {
          federationCards.push(card);
        }
      }
      var uniqueSpecialtyCount = countUniqueTags(federationCards, 'specialty');
      return uniqueSpecialtyCount >= 3 ? 13 : 0;
    }
  },
  'G11': {
    id: 'G11',
    name: 'Commander William Riker',
    type: ['personnel'],
    specialty: ['command'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return (hand.contains('Transporter') ? 7 : 0)
        + (hand.contains('Counselor Deanna Troi') ? 7 : 0)
        + (hand.contains('Away Team') ? 7 : 0);
    }
  },
  'G12': {
    id: 'G12',
    name: 'Computer',
    type: ['system'],
    specialty: ['science'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('cosmic')) {
          total += 6;
        }
      }
      return total;
    }
  },
  'G13': {
    id: 'G13',
    name: 'Counselor Deanna Troi',
    type: ['personnel'],
    specialty: ['counselor'],
    lifeform: ['betazoid', 'human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var cards = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G13') {
          cards.push(card);
        }
      }
      return countUniqueTags(cards, 'lifeform') * 5;
    }
  },
  'G14': {
    id: 'G14',
    name: 'Crystal Entity',
    type: ['entity'],
    specialty: ['cosmic'],
    lifeform: ['crystal'],
    affiliation: ['hostile'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('combat')) {
          total += 6;
        }
      }
      return total;
    }
  },
  'G15': {
    id: 'G15',
    name: 'Daimon Bok',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['ferengi'],
    affiliation: ['ferengi-alliance'],
    calculateScore: function(hand) {
      return (hand.contains('Captain Jean-Luc Picard') ? 8 : 0)
        + (hand.contains('Thought Maker') ? 8 : 0);
    }
  },
  'G16': {
    id: 'G16',
    name: 'Daimon Tog',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['ferengi'],
    affiliation: ['ferengi-alliance'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('betazoid')) {
          total += 8;
        }
      }
      return total;
    }
  },
  'G17': {
    id: 'G17',
    name: 'Doctor Beverly Crusher',
    type: ['personnel'],
    specialty: ['medical'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return (hand.contains('Sickbay') ? 8 : 0)
        + (hand.contains('Ensign Wesley Crusher') ? 8 : 0);
    }
  },
  'G18': {
    id: 'G18',
    name: 'Engine Room',
    type: ['location'],
    specialty: ['engineer'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G18' && card.specialty.includes('engineer')) {
          total += 6;
        }
      }
      return total;
    }
  },
  'G19': {
    id: 'G19',
    name: 'Ensign Wesley Crusher',
    type: ['personnel'],
    specialty: ['engineer'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var max = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G19' && (card.type.includes('system') || card.specialty.includes('engineer'))) {
          var score = card.score(hand);
          if (score > max) {
            max = score;
          }
        }
      }
      return max;    
    }
  },
  'G20': {
    id: 'G20',
    name: 'Hand Phaser',
    type: ['equipment'],
    specialty: ['weapon'],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation') && (card.specialty.includes('security') || card.specialty.includes('command'))) {
          return 9;
        }
      }
      return 0;
    }
  },
  'G21': {
    id: 'G21',
    name: 'Holodeck 1',
    type: ['location'],
    specialty: [],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('hologram')) {
          total += 8;
        } else if (card.affiliation.includes('federation') && (card.type.includes('personnel') || card.type.includes('captain'))) {
          total += 2;
        }
      }
      return total;
    }
  },
  'G22': {
    id: 'G22',
    name: 'Holodeck 2',
    type: ['location'],
    specialty: [],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('hologram')) {
          total += 8;
        } else if (card.affiliation.includes('federation') && (card.type.includes('personnel') || card.type.includes('captain'))) {
          total += 2;
        }
      }
      return total;
    }
  },
  'G23': {
    id: 'G23',
    name: 'James Moriarty',
    type: ['civilian'],
    specialty: [],
    lifeform: ['hologram'],
    affiliation: ['hostile'],
    blankedIf: function(hand) {
      return !(hand.contains('Holodeck 1') || hand.contains('Holodeck 2') || hand.contains('Computer'));
    },
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('science') || card.specialty.includes('engineer')) {
          total += 8;
        }
      }
      return total;
    }
  },
  'G24': {
    id: 'G24',
    name: 'Leah Brahms',
    type: ['personnel'],
    specialty: ['engineer'],
    lifeform: ['human'],
    affiliation: ['federation'],
    preScore: function(card, hand) {
      if (hand.contains('Holodeck 1') || hand.contains('Holodeck 2') || hand.contains('Computer')) {
        card.lifeform = ['hologram'];
      } else {
        card.lifeform = ['human'];
      }
    },
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.name === 'Lieutenant Geordi La Forge' || card.name === 'Engine Room') {
          total += 9;
        }
      }
      if (hand.contains('Holodeck 1') || hand.contains('Holodeck 2') || hand.contains('Computer')) {
        total += 5;
      }
      return total;
    }
  },
  'G25': {
    id: 'G25',
    name: 'Lieutenant Commander Data',
    type: ['personnel'],
    specialty: ['command', 'engineer', 'security', 'science'],
    lifeform: ['android'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return 0;
    }
  },
  'G26': {
    id: 'G26',
    name: 'Lieutenant Geordi La Forge',
    type: ['personnel'],
    specialty: ['engineer'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('system') || card.name === 'Engine Room') {
          total += 4;
        }
      }
      return total;
    }
  },
  'G27': {
    id: 'G27',
    name: 'Lieutenant Worf',
    type: ['personnel'],
    specialty: ['security', 'combat'],
    lifeform: ['klingon'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('weapon') || (card.id !== 'G27' && card.specialty.includes('combat'))) {
          total += 4;
        }
      }
      return total;
    }
  },
  'G28': {
    id: 'G28',
    name: 'Lore',
    type: ['civilian'],
    specialty: [],
    lifeform: ['android'],
    affiliation: ['hostile'],
    calculateScore: function(hand) {
      return (hand.contains('Lieutenant Commander Data') ? 8 : 0)
        + (hand.contains('Crystal Entity') ? 8 : 0)
        + (hand.contains('Borg Cube') ? 8 : 0);
    }
  },
  'G29': {
    id: 'G29',
    name: 'Lursa and B\'Etor',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['klingon'],
    affiliation: ['klingon-empire'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('romulan') || card.affiliation.includes('romulan-star-empire')) {
          total += 7;
        }
      }
      return total;
    }
  },
  'G30': {
    id: 'G30',
    name: 'Lwaxana Troi',
    type: ['civilian'],
    specialty: ['ambassador'],
    lifeform: ['betazoid'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return (hand.contains('Counselor Deanna Troi') ? 9 : 0)
        + (hand.contains('Captain Jean-Luc Picard') ? 9 : 0);
    }
  },
  'G31': {
    id: 'G31',
    name: 'Minuet',
    type: ['civilian'],
    specialty: ['counselor'],
    lifeform: ['hologram'],
    affiliation: [],
    blankedIf: function(hand) {
      return !(hand.contains('Holodeck 1') || hand.contains('Holodeck 2') || hand.contains('Computer'));
    },
    calculateScore: function(hand) {
      if (hand.contains('Commander William Riker')) {
        return 20;
      } else {
        for (const card of hand.nonBlankedCards()) {
          if (card.specialty.includes('command')) {
            return 10;
          }
        }
        return 0;
      }
    }
  },
  'G32': {
    id: 'G32',
    name: 'Photon Torpedoes',
    type: ['system'],
    specialty: ['combat'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return calculateCombatSystemScore('G32', hand);
    }
  },
  'G33': {
    id: 'G33',
    name: 'Quarters',
    type: ['location'],
    specialty: [],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var federationCharacters = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation') && (card.type.includes('personnel') || card.type.includes('civilian') || card.type.includes('captain'))) {
          federationCharacters++;
        }
      }
      return federationCharacters >= 2 ? 12: 0;
    }
  },
  'G34': {
    id: 'G34',
    name: 'Shields',
    type: ['system'],
    specialty: ['combat'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return calculateCombatSystemScore('G34', hand);
    }
  },
  'G35': {
    id: 'G35',
    name: 'Sickbay',
    type: ['location'],
    specialty: ['medical'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var personnel = [];
      var nonFederation = [];
      var combatOrWeapon = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('personnel')) {
          personnel.push(card);
        }
        if (card.affiliation.length > 0 && !card.affiliation.includes('federation')) {
          nonFederation.push(card);
        }
        if (card.specialty.includes('combat') || card.specialty.includes('weapon')) {
          combatOrWeapon.push(card);
        }
      }
      return hasUniqueCards([personnel, nonFederation, combatOrWeapon]) ? 20 : 0;
    }
  },
  'G36': {
    id: 'G36',
    name: 'Sovak',
    type: ['civilian'],
    specialty: ['archaeologist'],
    lifeform: ['ferengi'],
    affiliation: ['ferengi-alliance'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('artifact')) {
          total += 8;
        }
      }
      return total;
    }
  },
  'G37': {
    id: 'G37',
    name: 'Spock',
    type: ['civilian'],
    specialty: ['ambassador', 'science'],
    lifeform: ['vulcan'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('romulan') || card.name === 'Ambassador Sarek' || card.name === 'Lieutenant Commander Data') {
          total += 6;
        }
      }
      return total;
    }
  },
  'G38': {
    id: 'G38',
    name: 'Stone of Gol',
    type: ['artifact'],
    specialty: ['weapon'],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
     for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('vulcan') || card.lifeform.includes('betazoid')) {
          return 11;
        }
      }
      return 0;
    }
  },
  'G39': {
    id: 'G39',
    name: 'Ten-Forward',
    type: ['location'],
    specialty: ['counselor'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation') && (card.type.includes('personnel') || card.type.includes('civilian'))) {
          total += 4;
        }
      }
      return total;
    }
  },
  'G40': {
    id: 'G40',
    name: 'The Traveler',
    type: ['civilian'],
    specialty: ['cosmic', 'engineer'],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      return (hand.contains('Ensign Wesley Crusher') ? 10 : 0)
        + (hand.contains('Engine Room') ? 10 : 0);
    }
  },
  'G41': {
    id: 'G41',
    name: 'Thought Maker',
    type: ['artifact'],
    specialty: [],
    lifeform: [],
    affiliation: ['ferengi-alliance'],
    action: true,
    calculateScore: function(hand) {
      var thoughtMaker = hand.getCardById('G41');
      if (thoughtMaker.actionData !== undefined && thoughtMaker.actionData.length) {
        return 5;
      }
      return 0;
    }
  },
  'G42': {
    id: 'G42',
    name: 'Tolian Soran',
    type: ['civilian'],
    specialty: ['cosmic'],
    lifeform: ['el-aurian'],
    affiliation: ['hostile'],
    calculateScore: function(hand) {
      return (hand.contains('Time Distortion') ? 12 : 0)
        + (hand.contains('Borg Cube') ? 12 : 0);
    }
  },
  'G43': {
    id: 'G43',
    name: 'Tox Uthat',
    type: ['artifact'],
    specialty: ['cosmic'],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('archaeoligist') || (card.id !== 'G43' && card.specialty.includes('cosmic'))) {
          total += 6;
        }
      }
      return total;
    }
  },
  'G44': {
    id: 'G44',
    name: 'Tractor Beam',
    type: ['system'],
    specialty: ['combat'],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      return calculateCombatSystemScore('G44', hand);
    }
  },
  'G45': {
    id: 'G45',
    name: 'Transporter',
    type: ['system', 'location'],
    specialty: [],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var personnel = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('personnel')) {
          personnel.push(card);
        }
      }
      return countUniqueTags(personnel, 'specialty') >= 3 ? 18 : 0;
    }
  },
  'G46': {
    id: 'G46',
    name: 'Tricorder',
    type: ['equipment'],
    specialty: ['science', 'medical'],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G46' && (card.specialty.includes('medical') || card.specialty.includes('science'))) {
          total += 9;
        }
      }
      return total;
    }
  },
  'G47': {
    id: 'G47',
    name: 'Turbolift',
    type: ['location'],
    specialty: [],
    lifeform: [],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var otherLocations = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G47' && card.type.includes('location')) {
          otherLocations++;
        }
      }
      return otherLocations >= 2 ? 16: 0;
    }
  },
  'G48': {
    id: 'G48',
    name: 'Unidentified Ship',
    type: ['wild'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      return 0;
    }
  },
  'G49': {
    id: 'G49',
    name: 'Vash',
    type: ['civilian'],
    specialty: ['archaeologist'],
    lifeform: ['human'],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if ((card.id !== 'G49' && card.specialty.includes('archaeologist')) || card.type.includes('artifact') || card.name === 'Meddlesome Q') {
          total += 7;
        }
      }
      return total;
    }
  },
  'G50': {
    id: 'G50',
    name: 'Vice Admiral Nakamura',
    type: ['captain'],
    specialty: ['command'],
    lifeform: ['human'],
    affiliation: ['federation'],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.id !== 'G50' && card.affiliation.includes('federation') && card.specialty.includes('command')) {
          total += 7;
        }
      }
      return total;
    }
  }
}

var missions = {
  'M01': {
    id: 'M01',
    name: 'Away Team',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var personnel = [];
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.name === 'Transporter' || card.name === 'Tricorder' || card.name === 'Hand Phaser') {
          total += 5;
        } else if (card.type.includes('personnel')) {
          personnel.push(card);
        }
      }
      total += countUniqueTags(personnel, 'specialty') * 5;
      return total;
    }
  },
  'M02': {
    id: 'M02',
    name: 'Borg Cube',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('captain') || card.specialty.includes('combat') || card.specialty.includes('security')) {
          total += 5;
        }
      }
      return total;
    }
  },
  'M03': {
    id: 'M03',
    name: 'Computer Virus',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('system') || card.lifeform.includes('hologram')) {
          total += 7;
        }
      }
      return total;
    }
  },
  'M04': {
    id: 'M04',
    name: 'Conflicting Orders',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var commandCardAffiliations = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('command')) {
          for (const affiliation of card.affiliation) {
            if (commandCardAffiliations.includes(affiliation)) {
              return 14;
            }
          }
          commandCardAffiliations = commandCardAffiliations.concat(card.affiliation);
        }
      }
      return 0;
    }
  },
  'M05': {
    id: 'M05',
    name: 'Diplomatic Conference',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      var captains = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('ambassador')) {
          total += 5;
        } else if (card.type.includes('captain')) {
          captains.push(card);
        }
      }
      total += countUniqueTags(captains, 'affiliation') * 5;
      return total;
    }
  },
  'M06': {
    id: 'M06',
    name: 'Distress Call',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.name === 'Bridge' || card.name === 'Tractor Beam' || card.name === 'Transporter' || card.specialty.includes('medical')) {
          total += 9;
        }
      }
      return total;
    }
  },
  'M07': {
    id: 'M07',
    name: 'Do Machines Have Rights?',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('hologram') || card.lifeform.includes('android') || card.name === 'Vice Admiral Nakamura' || card.name === 'Commander Bruce Maddox') {
          total += 9;
        }
      }
      return total;
    }
  },
  'M08': {
    id: 'M08',
    name: 'Enemies to Friends',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var romulanFerengiOrHostile = [];
      var betazoidOrAmbassador = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('romulan-star-empire') || card.affiliation.includes('ferengi-alliance') || card.affiliation.includes('hostile')) {
          romulanFerengiOrHostile.push(card);
        }
        if (card.lifeform.includes('betazoid') || card.specialty.includes('ambassador')) {
          betazoidOrAmbassador.push(card);
        }
      }
      return hasUniqueCards([romulanFerengiOrHostile, betazoidOrAmbassador]) ? 12 : 0;
    }
  },
  'M09': {
    id: 'M09',
    name: 'Enterprise Goes Haywire',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('engineer') || card.type.includes('system') || card.type.includes('location')) {
          total += 5;
        }
      }
      return total;
    }
  },
  'M10': {
    id: 'M10',
    name: 'Ethical Dilemma',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var cardsWithLifeform = [];
      var federationCommand = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation') && card.specialty.includes('command')) {
          federationCommand.push(card);
        }
        if (card.lifeform.length > 0) {
          cardsWithLifeform.push(card);
        }
      }
      federationCommand.sort((a, b) => a.specialty.length - b.specialty.length);
      if (federationCommand.length > 0) {
        cardsWithLifeform.splice(cardsWithLifeform.indexOf(federationCommand[0]), 1);
        return countUniqueTags(cardsWithLifeform, 'specialty') >= 2 ? 15 : 0;
      }
      return 0;
    }
  },
  'M11': {
    id: 'M11',
    name: 'Federation Under Siege',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.length > 0 && !card.affiliation.includes('federation')) {
          total += 6;
        }
      }
      return total;
    }
  },
  'M12': {
    id: 'M12',
    name: 'Imminent Destruction',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('engineer')) {
          total += 8;
        }
      }
      return total;
    }
  },
  'M13': {
    id: 'M13',
    name: 'Intruder Alert',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    blankedIf: function(hand) {
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.length > 0 && !card.affiliation.includes('federation')) {
          return false;
        }
      }
      return true;
    },
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('security') || card.specialty.includes('weapon')) {
          total += 12;
        }
      }
      return total;
    }
  },
  'M14': {
    id: 'M14',
    name: 'Klingon Civil War',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('klingon') || card.lifeform.includes('romulan') || card.affiliation.includes('klingon-empire') || card.affiliation.includes('romulan-star-empire')) {
          total += 8;
        }
      }
      return total;
    }
  },
  'M15': {
    id: 'M15',
    name: 'Language Barrier',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes('betazoid') || card.lifeform.includes('vulcan') || card.name === 'Computer' || card.name === 'Tricorder') {
          total += 8;
        }
      }
      return total;
    }
  },
  'M16': {
    id: 'M16',
    name: 'Personnel Issues',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var personnel = [];
      var counselorOrFederationCaptain = [];
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('personnel')) {
          personnel.push(card);
        }
        if (card.specialty.includes('counselor') || (card.affiliation.includes('federation') && card.type.includes('captain'))) {
          counselorOrFederationCaptain.push(card);
        }
      }
      return hasUniqueCards([personnel, counselorOrFederationCaptain]) ? 14 : 0;
    }
  },
  'M17': {
    id: 'M17',
    name: 'Mysterious Plague',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var lifeformScores = {};
      for (const card of hand.nonBlankedCards()) {
        for (const lifeform of card.lifeform) {
          if (lifeform !== 'android' && lifeform !== 'hologram'
            && !(lifeform === 'human' && card.specialty.includes('medical'))) {
            const value = (lifeform === 'human' ? 5 : 8);
            if (lifeformScores[lifeform] === undefined) {
              lifeformScores[lifeform] = value;
            } else {
              lifeformScores[lifeform] += value; 
            }
          }
        }
      }
      const chosenLifeform = Object.keys(lifeformScores).reduce(function(a, b){ return lifeformScores[a] > lifeformScores[b] ? a : b }, undefined);
      const chosenLifeformValue = (chosenLifeform === 'human' ? 5 : 8);
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.lifeform.includes(chosenLifeform)) {
          total += chosenLifeformValue;
        } else if (card.specialty.includes('medical')) {
          total += 5;
        }
      }
      return total;
    }
  },
  'M18': {
    id: 'M18',
    name: 'Meddlesome Q',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      return 0;
    }
  },
  'M19': {
    id: 'M19',
    name: 'Blossoming Romance',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var characters = [];
      var counselorOrBetazoid = [];
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('personnel') || card.type.includes('civilian') || card.type.includes('captain')) {
          characters.push(card);
        }
        if (card.specialty.includes('counselor') || card.lifeform.includes('betazoid')) {
          counselorOrBetazoid.push(card);
        }
      }
      if (characters.length >= 2) {
        total += 8;
        var nonCounselorOrBetazoidCharacters = characters.filter(c => !counselorOrBetazoid.includes(c));
        total += (counselorOrBetazoid.length + Math.min(0, nonCounselorOrBetazoidCharacters.length - 2)) * 6;
        if (hand.contains('Quarters')) {
          total += 6;
        }
      }
      return total;
    }
  },
  'M20': {
    id: 'M20',
    name: 'Scientific Puzzle',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.type.includes('artifact') || card.specialty.includes('cosmic') || card.specialty.includes('science')) {
          total += 6;
        }
      }
      return total;
    }
  },
  'M21': {
    id: 'M21',
    name: 'Space Confrontation',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    blankedIf: function(hand) {
      for (const card of hand.nonBlankedCards()) {
        if (!card.affiliation.includes('federation') && (card.type.includes('captain') || card.type.includes('entity'))) {
          return false;
        }
      }
      return true;
    },
    calculateScore: function(hand) {
      var total = 0;
      var nonCommandNonCombatUnblankerFound = false;
      for (const card of hand.nonBlankedCards()) {
        if (card.specialty.includes('command') || card.specialty.includes('combat')) {
          total += 6;
        } else if (!card.affiliation.includes('federation') && (card.type.includes('captain') || card.type.includes('entity'))) {
          nonCommandNonCombatUnblankerFound = true;
        }
      }
      if (!nonCommandNonCombatUnblankerFound) {
        total -= 6;
      }
      return total;
    }
  },
  'M22': {
    id: 'M22',
    name: 'The Lure of Profit',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('ferengi-alliance') || card.type.includes('artifact') || card.specialty.includes('archaeologist')) {
          total += 7;
        }
      }
      return total;
    }
  },
  'M23': {
    id: 'M23',
    name: 'Time Distortion',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      var total = 0;
      for (const card of hand.nonBlankedCards()) {
        if (card.name === 'Ten-Forward' || card.specialty.includes('cosmic')) {
          total += 10;
        }
      }
      return total;
    }
  },
  'M24': {
    id: 'M24',
    name: 'Trapped on the Holodeck',
    type: ['mission'],
    specialty: [],
    lifeform: [],
    affiliation: [],
    calculateScore: function(hand) {
      if (!hand.contains('Holodeck 1') && !hand.contains('Holodeck 2')) {
        return 0;
      }
      for (const card of hand.nonBlankedCards()) {
        if (card.affiliation.includes('federation') && (card.type.includes('personnel') || card.type.includes('captain'))) {
          return 15;
        }
      }
      return 0;
    }
  }
}

var deck = {
  galaxyCards: galaxyCards,
  missions: missions,
  getCardByName: function(cardName) {
    for (const id in this.galaxyCards) {
      const card = this.galaxyCards[id];
      if (card.name === cardName) {
        return card;
      }
    }
    for (const id in this.missions) {
      const card = this.missions[id];
      if (card.name === cardName) {
        return card;
      }
    }
  },
  getCardById: function(id) {
    return this.galaxyCards[id] || this.missions[id];
  },
  getCardsByType: function(types) {
    var cardsByType = {};
    for (const cardType of allTypes()) {
      if (types === undefined || types.includes(cardType)) {
        cardsByType[cardType] = [];   
      }
    }
    for (const id in this.galaxyCards) {
      const card = this.galaxyCards[id];
      for (const cardType of card.type) {
        if (types === undefined || types.includes(cardType)) {
          cardsByType[cardType].push(card);
        }
      }
    }
    if (types === undefined || types.includes('mission')) {
      for (const id in this.missions) {
        const card = this.missions[id];
        cardsByType['mission'].push(card);
      }
    }
    return cardsByType;

  }
};

function allTypes() {
    return ['mission', 'captain', 'personnel', 'civilian', 'equipment', 'system', 'location', 'artifact', 'entity', 'wild'];
}

function countUniqueTags(cards, tag) {
  cards = cards.sort((a, b) => a[tag].length - b[tag].length);
  var uniqueTags = [];
  for (const card of cards) {
    for (const t of card[tag]) {
      if (!uniqueTags.includes(t)) {
        uniqueTags.push(t);
        break;
      }
    }
  }
  return uniqueTags.length;
}

function hasUniqueCards(cardSets) {
  cardSets = cardSets.sort((a, b) => a.length - b.length);
  var uniqueCards = [];
  for (const cardSet of cardSets) {
    for (const card of cardSet) {
      if (!uniqueCards.includes(card)) {
        uniqueCards.push(card);
        break;
      }
    }
  }
  return uniqueCards.length == cardSets.length;
}

function calculateCombatSystemScore(id, hand) {
  var total = 0;
  var nonFederationCaptains = [];
  for (const card of hand.nonBlankedCards()) {
    if (!card.affiliation.includes('federation') && card.type.includes('captain')) {
      nonFederationCaptains.push(card);
    }
    if (card.id !== id && card.specialty.includes('combat')) {
      total += 2;
    }
  }
  if (nonFederationCaptains.length > 0) {
    total += 6;
    var nonCombatNonFederationCaptainFound = false;
    for (const nonFederationCaptain of nonFederationCaptains) {
      if (!nonFederationCaptain.specialty.includes('combat')) {
        nonCombatNonFederationCaptainFound = true;
        break;
      }
    }
    if (!nonCombatNonFederationCaptainFound) {
      total -= 2;
    }
  }
  return total;
}

var NONE = -1;
var THOUGHT_MAKER = 'G41';
var UNIDENTIFIED_SHIP = 'G48';
var BORG_CUBE = 'M02';
var MEDDLESOME_Q = 'M18';

var ACTION_ORDER = [UNIDENTIFIED_SHIP, THOUGHT_MAKER, BORG_CUBE];
