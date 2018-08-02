import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import $ from 'jquery'

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
      '1': {
        'id': 1,
        'game_time': '2017-09-07T00:00:00Z',
        'network': 'Fox',
        'money_line_home': '-180',
        'money_line_away': '+200',
        'spread_home': '+5',
        'over_under': '42.0',
        'away_final': null,
        'home_final': null,
        'timestamp': '2018-04-04T01:21:33.279401Z',
        'updated': '2018-04-04T01:21:33.279419Z',
        'week': 's2017.w1',
        'away': 'KC',
        'home': 'NE'
      },
      '2': {
        'id': 2,
        'game_time': '2017-09-08T00:30:00Z',
        'network': '',
        'money_line_home': '-441',
        'money_line_away': '+378',
        'spread_home': '-8.0',
        'over_under': '47.5',
        'away_final': 42,
        'home_final': 27,
        'timestamp': '2018-04-24T09:11:44.044898Z',
        'updated': '2018-04-24T09:25:10.103288Z',
        'week': 's2017.w1',
        'away': 'KC',
        'home': 'NE'
      },
      '3': {
        'id': 3,
        'game_time': '2017-09-10T17:00:00Z',
        'network': '',
        'money_line_home': '-350',
        'money_line_away': '+305',
        'spread_home': '-7.0',
        'over_under': '42.0',
        'away_final': 12,
        'home_final': 21,
        'timestamp': '2018-04-24T09:11:44.050208Z',
        'updated': '2018-04-24T09:25:10.108208Z',
        'week': 's2017.w1',
        'away': 'NYJ',
        'home': 'BUF'
      }
    },
    season_schedule: {},
    current_week: 7,
    selected_week: 7
  },
  mutations: {
    read_game_data (state) {
      /*
      $.ajax({
        url: 'http://192.168.0.162:8000/gameswithid/',
        async: true,
        crossDomain: true,
        success: function(response) {
           console.log(response)
           state.game_data = response;
        },
        error: function(request, status, error) {
          console.log(status + " " + error)
        }
      })

      $.ajax({
        url: 'http://192.168.0.162:8000/seasonschedule/',
        async: true,
        crossDomain: true,
        success: function(response) {
           console.log(response)
           state.season_schedule = response
        },
        error: function(request, status, error) {
          console.log(status + " " + error)
        }
      })
      */

      axios
        .get('http://192.168.0.162:8000/gameswithid/')
        .then(response => {
          state.game_data = response.data
        })
        .catch(error => console.log(error))

      axios
        .get('http://192.168.0.162:8000/seasonschedule/')
        .then(response => {
          state.season_schedule = response.data
        })
        .catch(error => console.log(error))
    },

    set_selected_week (state, week) {
      state.selected_week = week
    }
  },
  actions: {

  }
})
