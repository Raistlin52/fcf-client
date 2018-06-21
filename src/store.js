import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Globals
    ODDS_TABLE: [
      '10:11', // Index zero, when no bets are picked, default
      '10:11',
      '13:5',
      '6:1',
      '10:1',
      '20:1',
      '40:1',
      '75:1',
      '150:1',
      '300:1',
      '700:1',
      '1100:1'
    ],
    MAX_COMBO_LEGS: 10,
    game_data: {
      's2017.w6.g1': {
        'away': 'PHI',
        'home': 'CAR',
        'gamedate': '2017-10-12T00:02:59.881Z',
        'network': 'CBS/NFLN',
        'ml1': {team: 'PHI', odds: '+129'},
        'ml2': {team: 'CAR', odds: '-143'},
        'sb1': 'PHI +3.0',
        'sb2': 'CAR -3.0',
        'ou1': '▲ 44',
        'ou2': '▼ 44'
      },
      's2017.w6.g2': {
        'away': 'CHI',
        'home': 'BAL',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'CHI', odds: '+197'},
        'ml2': {team: 'BAL', odds: '-220'},
        'sb1': 'CHI +5.5',
        'sb2': 'BAL -5.5',
        'ou1': '▲ 39.5',
        'ou2': '▼ 39.5'
      },
      's2017.w6.g3': {
        'away': 'DET',
        'home': 'NO',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'DET', odds: '+205'},
        'ml2': {team: 'NO', odds: '-230'},
        'sb1': 'DET +6',
        'sb2': 'NO -6',
        'ou1': '▲ 50.5',
        'ou2': '▼ 50.5'
      },
      's2017.w6.g4': {
        'away': 'NE',
        'home': 'NYJ',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'NE', odds: '-400'},
        'ml2': {team: 'NYJ', odds: '+346'},
        'sb1': 'NE',
        'sb2': 'NYJ',
        'ou1': '▲ 48.5',
        'ou2': '▼ 48.5'
      },
      's2017.w6.g5': {
        'away': 'MIA',
        'home': 'ATL',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'MIA', odds: '+638'},
        'ml2': {team: 'ATL', odds: '-800'},
        'sb1': 'MIA +14',
        'sb2': 'ATL -14',
        'ou1': '▲ 46',
        'ou2': '▼ 46'
      },
      's2017.w6.g6': {
        'away': 'CLE',
        'home': 'HOU',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'CLE', odds: '+289'},
        'ml2': {team: 'HOU', odds: '-330'},
        'sb1': 'CLE +7.5',
        'sb2': 'HOU -7.5',
        'ou1': '▲ 46',
        'ou2': '▼ 46'
      },
      's2017.w6.g7': {
        'away': 'SF',
        'home': 'WAS',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'SF', odds: '+442'},
        'ml2': {team: 'WAS', odds: '-525'},
        'sb1': 'SF +12',
        'sb2': 'WAS -12',
        'ou1': '▲ 46',
        'ou2': '▼ 46'
      },
      's2017.w6.g8': {
        'away': 'GB',
        'home': 'MIN',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'GB', odds: '-150'},
        'ml2': {team: 'MIN', odds: '+136'},
        'sb1': 'GB -3',
        'sb2': 'MIN +3',
        'ou1': '▲ 46',
        'ou2': '▼ 46'
      },
      's2017.w6.g9': {
        'away': 'LAR',
        'home': 'JAX',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'LAR', odds: '+104'},
        'ml2': {team: 'JAX', odds: '-115'},
        'sb1': 'LAR +1',
        'sb2': 'JAX -1',
        'ou1': '▲ 42',
        'ou2': '▼ 42'
      },
      's2017.w6.g10': {
        'away': 'TB',
        'home': 'ARI',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'TB', odds: '-134'},
        'ml2': {team: 'ARI', odds: '+121'},
        'sb1': 'TB -2.5',
        'sb2': 'ARI +2.5',
        'ou1': '▲ 46.5',
        'ou2': '▼ 46.5'
      },
      's2017.w6.g11': {
        'away': 'LAC',
        'home': 'OAK',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'LAC', odds: '+140'},
        'ml2': {team: 'OAK', odds: '-155'},
        'sb1': 'LAC +3',
        'sb2': 'OAK -3',
        'ou1': '▲ 48.5',
        'ou2': '▼ 48.5'
      },
      's2017.w6.g12': {
        'away': 'PIT',
        'home': 'KC',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'PIT', odds: '+157'},
        'ml2': {team: 'KC', odds: '-174'},
        'sb1': 'PIT +3.5',
        'sb2': 'KC -3.5',
        'ou1': '▲ 46',
        'ou2': '▼ 46'
      },
      's2017.w6.g13': {
        'away': 'NYG',
        'home': 'DEN',
        'gamedate': '2017-10-15T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'NYG', odds: '+581'},
        'ml2': {team: 'DEN', odds: '-717'},
        'sb1': 'NYG +13.5',
        'sb2': 'DEN -13.5',
        'ou1': '▲ 37.5',
        'ou2': '▼ 37.5'
      },
      's2017.w6.g14': {
        'away': 'IND',
        'home': 'TEN',
        'gamedate': '2017-10-16T00:02:59.881Z',
        'network': 'CBS',
        'ml1': {team: 'IND', odds: '+245'},
        'ml2': {team: 'TEN', odds: '-277'},
        'sb1': 'IND +7',
        'sb2': 'TEN -7',
        'ou1': '▲ 46',
        'ou2': '▼ 46'
      },
      's2017.w7.g1': {
        'away': 'KC',
        'home': 'OAK',
        'gamedate': '2017-10-20T00:25:00Z',
        'network': 'CBS/NFLN',
        'ml1': {team: 'KC', odds: '-153'},
        'ml2': {team: 'OAK', odds: '+138'},
        'sb1': 'KC -3',
        'sb2': 'OAK +3',
        'ou1': '▲ 46.5',
        'ou2': '▼ 46.5'
      },
      's2017.w7.g2': {
        'away': 'TB',
        'home': 'BUF',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'Fox',
        'ml1': {team: 'TB', odds: '+150'},
        'ml2': {team: 'BUF', odds: '-166'},
        'sb1': 'TB +3',
        'sb2': 'BUF -3',
        'ou1': '▲ 46.5',
        'ou2': '▼ 46.5'
      },
      's2017.w7.g3': {
        'away': 'CAR',
        'home': 'CHI',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'Fox',
        'ml1': {team: 'CAR', odds: '-139'},
        'ml2': {team: 'CHI', odds: '+126'},
        'sb1': 'CAR -2.5',
        'sb2': 'CHI +2.5',
        'ou1': '▲ 39.5',
        'ou2': '▼ 39.5'
      },
      's2017.w7.g4': {
        'away': 'TEN',
        'home': 'CLE',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'CBS',
        'ml1': {team: 'TEN', odds: '-230'},
        'ml2': {team: 'CLE', odds: '+205'},
        'sb1': 'TEN -6',
        'sb2': 'CLE +6',
        'ou1': '▲ 42.5',
        'ou2': '▼ 42.5'
      },
      's2017.w7.g5': {
        'away': 'NO',
        'home': 'GB',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'Fox',
        'ml1': {team: 'NO', odds: '-190'},
        'ml2': {team: 'GB', odds: '+171'},
        'sb1': 'NO -3.5',
        'sb2': 'GB +3.5',
        'ou1': '▲ 45.5',
        'ou2': '▼ 45.5'
      },
      's2017.w7.g6': {
        'away': 'JAX',
        'home': 'IND',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'CBS',
        'ml1': {team: 'JAX', odds: '-156'},
        'ml2': {team: 'IND', odds: '+141'},
        'sb1': 'JAX -3',
        'sb2': 'IND +3',
        'ou1': '▲ 41',
        'ou2': '▼ 41'
      },
      's2017.w7.g7': {
        'away': 'ARI',
        'home': 'LAR',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'Fox',
        'ml1': {team: 'ARI', odds: '+148'},
        'ml2': {team: 'LAR', odds: '-164'},
        'sb1': 'ARI +3',
        'sb2': 'LAR -3',
        'ou1': '▲ 45.5',
        'ou2': '▼ 45.5'
      },
      's2017.w7.g8': {
        'away': 'NYJ',
        'home': 'MIA',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'Fox',
        'ml1': {team: 'NYJ', odds: '+144'},
        'ml2': {team: 'MIA', odds: '-160'},
        'sb1': 'NYJ +3',
        'sb2': 'MIA -3',
        'ou1': '▲ 40',
        'ou2': '▼ 40'
      },
      's2017.w7.g9': {
        'away': 'BAL',
        'home': 'MIN',
        'gamedate': '2017-10-22T17:00:00Z',
        'network': 'CBS',
        'ml1': {team: 'BAL', odds: '+197'},
        'ml2': {team: 'MIN', odds: '-220'},
        'sb1': 'BAL +5',
        'sb2': 'MIN -5',
        'ou1': '▲ 37.5',
        'ou2': '▼ 37.5'
      },
      's2017.w7.g10': {
        'away': 'CIN',
        'home': 'PIT',
        'gamedate': '2017-10-22T20:25:00Z',
        'network': 'CBS',
        'ml1': {team: 'CIN', odds: '+179'},
        'ml2': {team: 'PIT', odds: '-199'},
        'sb1': 'CIN +4.5',
        'sb2': 'PIT -4.5',
        'ou1': '▲ 40',
        'ou2': '▼ 40'
      },
      's2017.w7.g11': {
        'away': 'DAL',
        'home': 'SF',
        'gamedate': '2017-10-22T20:05:00Z',
        'network': 'Fox',
        'ml1': {team: 'DAL', odds: '-265'},
        'ml2': {team: 'SF', odds: '+235'},
        'sb1': 'DAL -6',
        'sb2': 'SF +6',
        'ou1': '▲ 48',
        'ou2': '▼ 48'
      },
      's2017.w7.g12': {
        'away': 'DEN',
        'home': 'LAC',
        'gamedate': '2017-10-22T20:25:00Z',
        'network': 'CBS',
        'ml1': {team: 'DEN', odds: '-110'},
        'ml2': {team: 'LAC', odds: '-100'},
        'sb1': 'DEN -1',
        'sb2': 'LAC +1',
        'ou1': '▲ 41',
        'ou2': '▼ 41'
      },
      's2017.w7.g13': {
        'away': 'SEA',
        'home': 'NYG',
        'gamedate': '2017-10-22T20:25:00Z',
        'network': 'CBS',
        'ml1': {team: 'NYG', odds: '+181'},
        'ml2': {team: 'SEA', odds: '-202'},
        'sb1': 'NYG +3.5',
        'sb2': 'SEA -3.5',
        'ou1': '▲ 38.5',
        'ou2': '▼ 38.5'
      },
      's2017.w7.g14': {
        'away': 'ATL',
        'home': 'NE',
        'gamedate': '2017-10-23T00:30:00Z',
        'network': 'NBC',
        'ml1': {team: 'ATL', odds: '+129'},
        'ml2': {team: 'NE', odds: '-143'},
        'sb1': 'ATL +2.5',
        'sb2': 'NYG -2.5',
        'ou1': '▲ 56.5',
        'ou2': '▼ 56.5'
      },
      's2017.w7.g15': {
        'away': 'WAS',
        'home': 'PHI',
        'gamedate': '2017-10-24T00:30:00Z',
        'network': 'ESPN',
        'ml1': {team: 'WAS', odds: '+205'},
        'ml2': {team: 'PHI', odds: '-230'},
        'sb1': 'WAS +5.5',
        'sb2': 'PHI -5.5',
        'ou1': '▲ 48.5',
        'ou2': '▼ 48.5'
      }
    }
  },
  mutations: {

  },
  actions: {

  }
})
