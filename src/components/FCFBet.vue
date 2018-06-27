<template>
  <div class="combo-bet">
    <span><label class="heading-label">Bankroll: </label>{{bankroll.toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0}) }}</span><br>
    <label class="heading-label">Placed Bets:</label>
    <div class="previous-bets" v-for="b in placed_bets" :key="b.datetime">
        <span v-html="PrintHTMLBet(b)"></span><br>
    </div>
    <legend>You can place combo bets on up to 10 games</legend>
    <p v-if="errors.length">
      <b class="errormessage">Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" class="errormessage" :key=error>{{ error }}</li>
      </ul>
    </p>

        <div style="position: relative;">
            <v-toolbar
              dense
              absolute
              color="primary"
              dark
              height="30px"
              style="line-height:26px"
            >
              <v-toolbar-items style="padding: 4px; verticle-align: middle">
                      <h3>Bet $ </h3>
                      <input style="background-color: white;" type="number" min="0" inputmode="numeric" pattern="[0-9]*" v-model="bet_amount" placeholder="e.g. 2500" class="bet-box">
                      <h3>&nbsp;&nbsp;Odds:&nbsp;</h3><span>{{odds.oddsString}} </span>
                      <h3>&nbsp;&nbsp;Pay:&nbsp;</h3> <span>${{ (win_amount + Number(bet_amount)).toLocaleString() }}</span>
              </v-toolbar-items>
            </v-toolbar>
            <div
              style="max-height: 550px;"
              class="scroll-y"
              id="scrolling-techniques"
            >
              <v-container style="margin-top: 32px; padding: 0">

        <table class="fcf-bet-card">
        <thead>
          <tr>
            <th>Game</th>
            <th>Money Line</th>
            <th>Spread (10:11)</th>
            <th>Total (10:11)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in games_of_the_week" :key="game.id">
              <td class="game-header">
                <div class="matchup">{{game.away}} @ {{game.home}}</div>
                <div class="gamedate">{{game.game_time | weekdayshortdate}}</div>
                <div class="gametime">{{game.game_time | timewithzone}}</div>
                <div class="network">{{game.network}}</div>
              </td>
              <td class="button-group">
                <div id="ck-button">
                  <label v-bind:for="game.id + '.ml1'">
                    <input type="checkbox"
                      v-bind:id="game.id + '.ml1'"
                      v-bind:value="{game:game.id, leg_type:'moneyline', leg_line:game.away + ' ' + game.money_line_away, odds:game.money_line_away}"
                      v-model="legs"
                      v-on:change="ToggleLeg($event); UpdateOdds()">
                    <span>{{game.away}} {{game.money_line_away}}</span>
                  </label>
                </div>
                <div id="ck-button">
                  <label v-bind:for="game.id + '.ml2'">
                    <input type="checkbox"
                      v-bind:id="game.id + '.ml2'"
                      v-bind:value="{game:game.id, leg_type:'moneyline', leg_line:game.home + ' ' + game.money_line_home, odds:game.money_line_home}"
                      v-model="legs"
                      v-on:change="ToggleLeg($event); UpdateOdds()">
                    <span>{{game.home}} {{game.money_line_home}}</span>
                  </label>
                </div>
              </td>
              <td class="button-group">
                <div id="ck-button">
                  <label v-bind:for="game.id + '.sb1'">
                    <input type="checkbox"
                      v-bind:id="game.id + '.sb1'"
                      v-bind:value="{game:game.id, leg_type:'spread', leg_line:game.away + ' ' + AwaySpread(game.spread_home), odds:'-110'}"
                      v-model="legs"
                      v-on:change="ToggleLeg($event); UpdateOdds()">
                    <span>{{game.away + ' ' + AwaySpread(game.spread_home)}}</span>
                  </label>
                </div>
                <div id="ck-button">
                  <label v-bind:for="game.id + '.sb2'">
                    <input type="checkbox"
                      v-bind:id="game.id + '.sb2'"
                      v-bind:value="{game:game.id, leg_type:'spread', leg_line:game.home + ' ' + game.spread_home, odds:'-110'}"
                      v-model="legs"
                      v-on:change="ToggleLeg($event); UpdateOdds()">
                    <span>{{game.home + ' ' + game.spread_home}}</span>
                  </label>
                </div>
              </td>
              <td class="button-group">
                <div id="ck-button">
                  <label v-bind:for="game.id + '.ou1'">
                    <input type="checkbox"
                      v-bind:id="game.id + '.ou1'"
                      v-bind:value="{game:game.id, leg_type:'total', leg_line:'▲' + game.over_under, odds:'-110'}"
                      v-model="legs"
                      v-on:change="ToggleLeg($event); UpdateOdds()">
                    <span>{{'▲' + game.over_under}}</span>
                  </label>
                </div>
                <div id="ck-button">
                  <label v-bind:for="game.id + '.ou2'">
                    <input type="checkbox"
                    v-bind:id="game.id + '.ou2'"
                    v-bind:value="{game:game.id, leg_type:'total', leg_line:'▼' + game.over_under, odds:'-110'}"
                    v-model="legs"
                    v-on:change="ToggleLeg($event); UpdateOdds()">
                    <span>{{'▼' + game.over_under}}</span>
                  </label>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
      </v-container>
      </div>
      </div>
      <p>
        <v-btn class="white--text"
          id="btnPlaceBet"
          color="green"
          @click="checkForm()"> Place Bet
        </v-btn>
      </p>

      <!-- Modal, initally hidden -->
      <v-layout row justify-center>
          <v-dialog v-model="bet_confirmation" max-width="290">
            <v-card>
              <v-card-title class="headline">Submit the Following Bet?</v-card-title>
              <v-card-text style="text-align:left" v-html="PrintHTMLBet(current_bet)"></v-card-text>
              <v-card-actions>
                <v-btn color="red" dark @click.native="bet_confirmation = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green" dark @click.native="bet_confirmation = false; PlaceBet()">Continue</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

  </div>
</template>

<script>
/* eslint-disable */
import Odds from './Odds'
import Vue from 'vue'
import {betPrinter} from './mixins/betPrinter'
import moment from 'moment-timezone'
import axios from 'axios'

Vue.filter('weekdayshortdate', function(value) {
  if (value) {
    return moment(String(value)).format('ddd MM/DD')
  }
})

Vue.filter('timewithzone', function(value) {
  if (value) {
    return moment(String(value)).tz('America/New_York').format('h:mm a z')
  }
})

export default {
  name: 'FCFBet',
  mixins: [betPrinter],
  data () {
    return {
      bet_confirmation: false,
      errors: [],
      bankroll: 2000000,
      bet_amount: '',
      weekly_schedule: [
        's2017.w7.g1',
        's2017.w7.g2',
        's2017.w7.g3',
        's2017.w7.g4',
        's2017.w7.g5',
        's2017.w7.g6',
        's2017.w7.g7',
        's2017.w7.g8',
        's2017.w7.g9',
        's2017.w7.g10',
        's2017.w7.g11',
        's2017.w7.g12',
        's2017.w7.g13',
        's2017.w7.g14',
        's2017.w7.g15'
      ],
      games_of_the_week: {},
      placed_bets: [],
      /* [{
        "datetime":"Fri Mar 02 2018 00:27:56 GMT-0600 (CST)",
        "amount":50000,
        "bet_type":"parlay",
        "oddsString":"6:1",
        "legs":[
          {
          "game":"s2017.w7.g2",
          "leg_type":"spread",
          "leg_line":"TB +3",
          "odds":"-110"
          },
          {
            "game":"s2017.w7.g3",
            "leg_type":"total",
            "leg_line":"▲ 39.5",
            "odds":"-110"
          },
          {
            "game":"s2017.w7.g6",
            "leg_type":"spread",
            "leg_line":"IND +3",
            "odds":"-110"
          }
        ]
        },
        {"datetime":"Fri Mar 02 2018 00:28:43 GMT-0600 (CST)",
        "amount":440000,
        "bet_type":"moneyline",
        "oddsString":"-110",
        "legs":
          [{"game":"s2017.w7.g12",
          "leg_type":"moneyline",
          "leg_line":"DEN -110",
          "odds":"-110"}
          ]},
        {"datetime":"Fri Mar 02 2018 00:29:02 GMT-0600 (CST)",
        "amount":100000,
        "bet_type":"parlay",
        "oddsString":"8:1",
        "legs":
          [{"game":"s2017.w7.g7",
          "leg_type":"moneyline",
          "leg_line":"ARI +148",
          "odds":"+148"},
          {"game":"s2017.w7.g8",
          "leg_type":"spread",
          "leg_line":"NYJ +3","odds":"-110"},
          {"game":"s2017.w7.g10",
          "leg_type":"total",
          "leg_line":"▲ 40",
          "odds":"-110"}
        ]},
        {"datetime":"Fri Mar 02 2018 00:29:34 GMT-0600 (CST)",
        "amount":50000,
        "bet_type":"total",
        "oddsString":"10:11",
        "legs":[{"game":"s2017.w7.g3",
        "leg_type":"total",
        "leg_line":"▲ 39.5",
        "odds":"-110"}]
        }  
      ], */
      legs: [],
      odds: new Odds('10:11')
    }
  },

  watch: {
    '$route' (to, from) {
      this.$store.state.selected_week = this.$route.params.week_num   // need to make selected week a mutator
    }
  },

  computed: {

    num_legs: function () {
      return Math.max(this.legs.length, 1)
    },

    win_amount: function () {
      return (this.bet_amount)
        ? Math.floor(this.bet_amount * this.odds.winMultiple)
        : 0
    },

    current_bet: function () {
      let wrapper = {
        datetime: Date().toString(),
        amount: Number(this.bet_amount),
        bet_type: '',
        oddsString: this.odds.oddsString,
        // JSON below is needed for Deep Copy - important when saving    // There's a better way to so this
        legs: JSON.parse(JSON.stringify(this.legs))
      }

      if (this.legs.length === 1) wrapper.bet_type = this.legs[0].leg_type
      else wrapper.bet_type = 'parlay'

      return wrapper
    },

    ODDS_TABLE: function () {
      return this.$store.state.ODDS_TABLE
    },
    
    MAX_COMBO_LEGS: function () {
      return this.$store.state.MAX_COMBO_LEGS 
    },

    game_data: function () {
      return this.$store.state.game_data
    }
  },

  created: function () {
    // What to do when this object is created

    //Build the games_of_the_week object
    axios
      .get('http://127.0.0.1:8000/games/week/s2017.w7')
      .then(response => {
        this.games_of_the_week = response.data
      })
      .catch(error => console.log(error))

    
    //for (let game of this.weekly_schedule) {
    //  this.games_of_the_week[game] = this.game_data[game]
    //}
  },

  mounted: function () {
    // After the page has rendered

  },
  methods: {

    ToggleLeg: function (event) {
      // buttons and checkboxes carry their values differently, get either one
      let newLeg = event.target._value ? event.target._value : event.target.value

      // loop backwards through existing legs, splicing out any of the same type for the same game
      let i = Math.max(this.legs.length - 1, 0); // On Change means the last item in the list is itself
      while (i--) {
        if (this.legs[i].game === newLeg.game && this.legs[i].leg_type === newLeg.leg_type) {
          this.legs.splice(i, 1)
        } else {
          // also check if they are betting both win and spread for the same team
          if (this.legs[i].game === newLeg.game) {
            // check for forbidden bet combinations
            if ((this.legs[i].leg_type === 'moneyline' && newLeg.leg_type === 'spread') ||
              (this.legs[i].leg_type === 'spread' && newLeg.leg_type === 'moneyline')) {
              // check for same team
              if (this.legs[i].leg_line.slice(0, 2) === newLeg.leg_line.slice(0, 2)) {
                this.legs.splice(i, 1)
              }
            }
          }
        }
      }

      // check for too many legs
      if (this.legs.length > this.MAX_COMBO_LEGS) {
        alert('Too Many Legs, you can only have ' + this.MAX_COMBO_LEGS + ' legs.')
        this.legs.splice(this.MAX_COMBO_LEGS, 1)
      }
    },

    UpdateOdds: function (event) {
      // if we only have one moneyline leg, preserve the odds
      if (this.legs.length === 1 && this.legs[0].leg_type === 'moneyline') {
        this.odds.oddsString = this.legs[0].odds
      } else {
        // loop through the array pulling odds
        let onlySimpleLegs = true
        let totalOdds = 1
        for (var i = 0, len = this.legs.length; i < len; i++) {
          onlySimpleLegs = onlySimpleLegs && (this.legs[i].leg_type === 'spread' || this.legs[i].leg_type === 'total')
          let oddsObj = new Odds(this.legs[i].odds)
          totalOdds *= (1 + oddsObj.winMultiple)
        }

        // subtract 1 (original bet payback isn't shown in traditional odds)
        totalOdds -= 1

        if (onlySimpleLegs) {
          this.odds.oddsString = this.ODDS_TABLE[this.num_legs]
        } else { // calculate the odds
          if (totalOdds < 10) {
            this.odds.oddsString = Math.round(totalOdds * 10) / 10 + ':1'
          } else {
            this.odds.oddsString = Math.round(totalOdds) + ':1'
          }
        }
      }
    },

    AwaySpread: function (homespread) {
      if (homespread[0] === '-') {
        return '+' + homespread.slice(1, homespread.length)
      }
      else if (homespread[0] === '+') {
        return '-' + homespread.slice(1, homespread.length)
      }
      else {
        return homespread
      }
    },

    checkForm: function (event) {
      this.errors = [];
      if(this.legs.length === 0) this.errors.push("Select at least one game.");
      if(this.bet_amount < 1000) this.errors.push('Minimum bet is $1000');
      if(!this.errors.length) this.bet_confirmation = true;
    },

    PlaceBet: function (event) {
      // move bet to placed bets and clear page for next bet
      this.placed_bets.push(this.current_bet)
      this.legs = []
      this.bet_amount = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

tr {
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: black;

}
.combo-bet {
  text-align: left;
}
.heading-label {
  font-weight: bold;
}
  
.previous-bets {
  font-family:'Courier New', Courier, monospace;
  border-color: inherit;
  flood-color: grey;
}

.game-header {
  padding:0.25em;
  min-width: 85px;
  /* text-align: center; */
}

.bet-box {
  width: 5.5em;
  color: black;
}

.matchup {
  font-weight: bold;
}

.gamedate,
.gametime,
.network {
  font-size: 0.8em;
}

.errormessage {
  color: red;
}
/* Playing with the buttons */
div label input {
   margin-right:100px;
}

#ck-button {
    margin:2px;
    background-color:#EFEFEF;
    border-radius:4px;
    border:1px solid #D0D0D0;
    overflow:auto;
    float:left;

}

#ck-button label {
    float:left;
    width:4.0em;
    min-width: 80px;
}

#ck-button label span {
    text-align:center;
    padding:1px 0px;
    display:block;
    border-radius:4px;
}

#ck-button label input {
    position:absolute;
    top:-20px;
    display:none;
}

#ck-button input:hover + span {
    background-color:#efE0E0;
}

#ck-button input:checked + span {
    background-color:#191;
    font-weight: bold;
    color:#fff;
}

#ck-button input:checked:hover + span {
    background-color:#1c1;
    color:#fff;
}

</style>