<template>

  <div>
    <div v-if="!past_week_view" class="combo-bet">
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
                        v-bind:value="{game:game.id, leg_type:'spread', leg_line:game.away + ' ' + ReverseSpread(game.spread_home), odds:'-110'}"
                        v-model="legs"
                        v-on:change="ToggleLeg($event); UpdateOdds()">
                      <span>{{game.away + ' ' + (game.spread_home === "0" ? "(Pick)" : ReverseSpread(game.spread_home))}}</span>
                    </label>
                  </div>
                  <div id="ck-button">
                    <label v-bind:for="game.id + '.sb2'">
                      <input type="checkbox"
                        v-bind:id="game.id + '.sb2'"
                        v-bind:value="{game:game.id, leg_type:'spread', leg_line:game.home + ' ' + game.spread_home, odds:'-110'}"
                        v-model="legs"
                        v-on:change="ToggleLeg($event); UpdateOdds()">
                      <span>{{game.home + ' ' + (game.spread_home === "0" ? "(Pick)" : game.spread_home)}}</span>
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
          <v-btn v-if="placed_bets.length > 0" class="white--text"
            id="btnClearBets"
            color="red"
            @click="clearBets()"> Clear Bets
          </v-btn>
          <v-btn v-if="placed_bets.length > 0" class="white--text"
            id="btnShowResults"
            color="green"
            @click="showResults()"> Show Results
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
                  <v-btn color="green" dark @click.native="bet_confirmation = false; placeBet()">Continue</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>

    </div>

    <div v-if="past_week_view">
      <h1>Week {{$store.state.selected_week}}</h1>
      <table class="pure-table pure-table-bordered">
          <thead>
              <tr>
                <th>Bets / Legs</th>
                <th>Final</th>
                <th>Win / Loss</th>
              </tr>
          </thead>
          <tr class="bet-push">
              <td colspan=2>Week Starting Bankroll</td>
              <td class="money-column">{{bankroll.toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0}) }}</td>
          </tr>
          <template v-for="b in placed_bets">
              <tr :key="b.datetime+'-spacer'"><td colspan=3></td></tr>
              <tr :key="b.datetime+'-header'" :class="'bet-' + b.result">
                  <td colspan=2 v-html="PrintHTMLBetHeader(b)"></td>
                  <td class="money-column">{{b.winloss.toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0})}}</td>
              </tr>
              <tr v-for="l in b.legs" :key="l.game+l.leg_line" :class="'leg-' + l.result">
                  <td v-html="'&nbsp;&nbsp;' + l.result[0].toUpperCase() + ': ' + PrintHTMLLeg(l)"></td>
                  <td>{{l.final_score}}</td>
                  <td></td>
              </tr>
          </template>
          <tr><td colspan=3></td></tr>
          <tr class="bet-push">
            <td colspan=2>Week Ending Bankroll</td>
            <td class="money-column">{{ closing_bankroll.toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0}) }}</td>
          </tr>
      </table>
      <p>
        <v-btn class="white--text"
          id="btnClearBets"
          color="red"
          @click="clearBets()"> Clear Bets
        </v-btn>
      </p>

    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Odds from "./Odds";
import Vue from "vue";
import { betPrinter } from "./mixins/betPrinter";
import moment from "moment-timezone";
import axios from "axios";

Vue.filter("weekdayshortdate", function(value) {
  if (value) {
    return moment(String(value)).format("ddd MM/DD");
  }
});

Vue.filter("timewithzone", function(value) {
  if (value) {
    return moment(String(value))
      .tz("America/New_York")
      .format("h:mm a z");
  }
});

export default {
  name: "FCFBet",
  mixins: [betPrinter],
  data() {
    return {
      past_week_view: false,
      bet_confirmation: false,
      errors: [],
      bankroll: 2000000,
      closing_bankroll: 6666,
      bet_amount: "",
      weekly_result: 0,
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
      legs: [],
      odds: new Odds("10:11")
    };
  },

  watch: {
    $route(to, from) {
      this.$store.commit("set_selected_week", this.$route.params.week_num);
      this.refreshGames();
      this.clearBets();
    }
  },

  computed: {
    num_legs: function() {
      return Math.max(this.legs.length, 1);
    },

    win_amount: function() {
      return this.bet_amount
        ? Math.floor(this.bet_amount * this.odds.winMultiple)
        : 0;
    },

    current_bet: function() {
      let wrapper = {
        datetime: Date().toString(),
        amount: Number(this.bet_amount),
        bet_type: "",
        oddsString: this.odds.oddsString,
        // JSON below is needed for Deep Copy - important when saving    // There's a better way to so this
        legs: JSON.parse(JSON.stringify(this.legs))
      };

      if (this.legs.length === 1) wrapper.bet_type = this.legs[0].leg_type;
      else wrapper.bet_type = "parlay";

      return wrapper;
    },

    ODDS_TABLE: function() {
      return this.$store.state.ODDS_TABLE;
    },

    MAX_COMBO_LEGS: function() {
      return this.$store.state.MAX_COMBO_LEGS;
    },

    game_data: function() {
      return this.$store.state.game_data;
    }
  },

  created: function() {
    // What to do when this object is created
    this.$store.commit("set_selected_week", this.$route.params.week_num);
    this.refreshGames();
  },

  mounted: function() {
    // After the page has rendered
  },

  methods: {
    refreshGames: function() {
      //Clear current rebuild the games_of_the_week object
      this.games_of_the_week = {};

      // this sometimes loses context
      var $vm = this

      axios
        .get(
          process.env.VUE_APP_FCF_SERVER + '/games/week/s2017.w' +
            this.$store.state.selected_week + '/'
        )
        .then(response => {
          this.games_of_the_week = response.data
        })
        .catch(error => console.log(error)) 
        
    }, 

    ReverseSpread: function(spread) {
      if (spread.charAt(0) === "-") {
        return "+" + spread.slice(1, spread.length)
      } else if (spread.charAt(0) === "+") {
        return "-" + spread.slice(1, spread.length)
      } else {
        return spread;
      }
    },

    ToggleLeg: function(event) {
      // buttons and checkboxes carry their values differently, get either one
      let newLeg = event.target._value
        ? event.target._value
        : event.target.value;

      // loop backwards through existing legs, splicing out any of the same type for the same game
      let i = Math.max(this.legs.length - 1, 0); // On Change means the last item in the list is itself
      while (i--) {
        if (
          this.legs[i].game === newLeg.game &&
          this.legs[i].leg_type === newLeg.leg_type
        ) {
          this.legs.splice(i, 1);
        } else {
          // also check if they are betting both win and spread for the same team
          if (this.legs[i].game === newLeg.game) {
            // check for forbidden bet combinations
            if (
              (this.legs[i].leg_type === "moneyline" &&
                newLeg.leg_type === "spread") ||
              (this.legs[i].leg_type === "spread" &&
                newLeg.leg_type === "moneyline")
            ) {
              // check for same team
              if (
                this.legs[i].leg_line.slice(0, 2) ===
                newLeg.leg_line.slice(0, 2)
              ) {
                this.legs.splice(i, 1);
              }
            }
          }
        }
      }

      // check for too many legs
      if (this.legs.length > this.MAX_COMBO_LEGS) {
        alert(
          "Too Many Legs, you can only have " + this.MAX_COMBO_LEGS + " legs."
        );
        this.legs.splice(this.MAX_COMBO_LEGS, 1);
      }
    },

    UpdateOdds: function(event) {
      this.odds = new Odds(this.calculateOdds(this.legs));
    },

    calculateOdds: function(legs) {
      // if we only have one moneyline leg, preserve the odds
      if (legs.length === 1 && legs[0].leg_type === "moneyline") {
        return legs[0].odds;
      } else {
        // loop through the array pulling odds
        let onlySimpleLegs = true;
        let totalOdds = 1;
        for (var i = 0, len = legs.length; i < len; i++) {
          onlySimpleLegs =
            onlySimpleLegs &&
            (legs[i].leg_type === "spread" || legs[i].leg_type === "total");
          let oddsObj = new Odds(legs[i].odds);
          totalOdds *= 1 + oddsObj.winMultiple;
        }

        // subtract 1 (original bet payback isn't shown in traditional odds)
        totalOdds -= 1;

        if (onlySimpleLegs) {
          return this.ODDS_TABLE[legs.length];
        } else {
          // calculate the odds
          if (totalOdds < 10) {
            return Math.round(totalOdds * 10) / 10 + ":1";
          } else {
            return Math.round(totalOdds) + ":1";
          }
        }
      }
    },

    checkForm: function(event) {
      this.errors = [];
      if (this.legs.length === 0) this.errors.push("Select at least one game.");
      if (this.bet_amount < 1000) this.errors.push("Minimum bet is $1000");
      if (!this.errors.length) this.bet_confirmation = true;
    },

    placeBet: function(event) {
      // move bet to placed bets and clear page for next bet
      this.placed_bets.push(this.current_bet);
      this.legs = [];
      this.bet_amount = "";
      this.odds = new Odds("10:11");
    },

    clearBets: function(event) {
      // move bet to placed bets and clear page for next bet
      this.placed_bets = [];
      this.legs = [];
      this.bet_amount = "";
      this.odds = new Odds("10:11");
      this.past_week_view = false
    },

    showResults: function(event) {
      this.calcResults();

      // set the flag to redraw screen as past week
      this.past_week_view = true;
    },

    /**
     * Determine the bet results give all the leg results
     * @param {Array.<string>} leg_results all the 'win', 'lose', or 'push' results
     */
    determineBetResult: function(leg_results) {
      function isWin(currentValue) {
        return currentValue === "win";
      }

      function isLose(currentValue) {
        return currentValue === "lose";
      }

      function isPush(currentValue) {
        return currentValue === "push";
      }

      if (leg_results.some(isLose)) {
        return "lose";
      } else if (leg_results.some(isWin)) {
        return "win";
      } else {
        return "push";
      }
    },

    calcResults: function() {
      // Add 'result' and 'payout' to bet and 'final_score' and 'result' to legs
      // change odds for the bet if any leg pushes

      // reference vue component methods because 'this' scope is
      // changed in the .forEach() method calls
      let getFinalScore = this.getFinalScore;
      let determineBetResult = this.determineBetResult;
      let determineLegResult = this.determineLegResult;
      let calculateOdds = this.calculateOdds;
      let total_winloss = 0

      this.placed_bets.forEach(function(bet) {
        let leg_results = [];
        let win_loss_legs = [];

        bet.legs.forEach(function(leg) {
          leg["final_score"] = getFinalScore(leg.game);
          let result = determineLegResult(leg);
          leg["result"] = result;
          leg_results.push(result);
          if (result === "win" || result === "lose") {
            win_loss_legs.push(leg)
          }
        })

        // Recalc odds in case of a push
        bet.oddsString = calculateOdds(win_loss_legs)

        bet.result = determineBetResult(leg_results)

        switch(bet.result) {
          case 'win':
            let o = new Odds(bet.oddsString)
            bet.winloss = Math.floor(bet.amount * o.winMultiple)
            break;
          case 'lose':
            bet.winloss = -1 * bet.amount
            break;
          case 'push':
            bet.winloss = 0
            break;
        }
        total_winloss += bet.winloss
      })

      this.closing_bankroll = this.bankroll + total_winloss
    },
    
    determineLegResult: function(leg) {
      if (leg.leg_type === "moneyline") {
        return this.determineMoneylineResult(leg);
      } else if (leg.leg_type === "spread") {
        return this.determineSpreadResult(leg);
      } else if (leg.leg_type === "total") {
        return this.determineTotalResult(leg);
      } else {
        // Not a 'moneyline', 'spread', or 'total'. Something went wrong
        console.log("can't determine leg type");
        return "error";
      }
    },

    determineMoneylineResult: function(leg) {
      let away_final = this.$store.state.game_data[leg.game].away_final;
      let home_final = this.$store.state.game_data[leg.game].home_final;

      if (this.homeOrAway(leg) === "home") {
        if (home_final > away_final) {
          return "win";
        } else if (home_final < away_final) {
          return "lose";
        } else {
          return "push";
        }
      } else if (this.homeOrAway(leg) === "away") {
        if (away_final > home_final) {
          return "win";
        } else if (away_final < home_final) {
          return "lose";
        } else {
          return "push";
        }
      } else {
        return "error";
      }
    },

    determineSpreadResult: function(leg) {
      let away_final = this.$store.state.game_data[leg.game].away_final;
      let home_final = this.$store.state.game_data[leg.game].home_final;

      if (this.homeOrAway(leg) === "home") {
        if (this.parseValue(leg.leg_line) < home_final - away_final) {
          return "win";
        } else if (this.parseValue(leg.leg_line) > home_final - away_final) {
          return "lose";
        } else {
          return "push";
        }
      } else if (this.homeOrAway(leg) === "away") {
        if (this.parseValue(leg.leg_line) < away_final - home_final) {
          return "win";
        } else if (this.parseValue(leg.leg_line) > away_final - home_final) {
          return "lose";
        } else {
          return "push";
        }
      } else {
        return "error";
      }
    },

    determineTotalResult: function(leg) {
      let total_score =
        this.$store.state.game_data[leg.game].away_final +
        this.$store.state.game_data[leg.game].home_final;

      if (leg.leg_line.charAt(0) === "▲") {
        if (total_score > parseFloat(leg.leg_line.slice(1))) {
          return "win";
        } else if (total_score < parseFloat(leg.leg_line.slice(1))) {
          return "lose";
        } else {
          return "push";
        }
      } else if (leg.leg_line.charAt(0) === "▼") {
        if (total_score < parseFloat(leg.leg_line.slice(1))) {
          return "win";
        } else if (total_score > parseFloat(leg.leg_line.slice(1))) {
          return "lose";
        } else {
          return "push";
        }
      } else {
        // Not an expected total bet line
        return "error";
      }
    },

    /**
     * Determine if the team at the begining of the leg line is home or away
     * @param {string} leg_line the spread or moneyline bet line
     * @returns {string} 'home', 'away', or 'error'
     */
    homeOrAway: function(leg) {
      if (leg.leg_line.slice(0, 3).trim() === this.game_data[leg.game].home) {
        return "home";
      } else if (
        leg.leg_line.slice(0, 3).trim() === this.game_data[leg.game].away
      ) {
        return "away";
      } else {
        return "error";
      }
    },

    /**
     * Return the number on the right hand side of a bet string
     * @param {string} leg_line the spread or total bet line
     * @returns {number} the numberic value of the string
     */
    parseValue: function(leg_line) {
      let number_string = "";
      let digit_chars = "1234567890.+-";

      for (let x = 0; x < leg_line.length; x++) {
        if (digit_chars.indexOf(leg_line.charAt(x)) > -1) {
          number_string += leg_line.charAt(x);
        }
      }

      return parseFloat(number_string);
    },

    /**
     * Generate the final score from the Vuex 'game_data'
     * @param {number} game_id integer for the game id
     * @returns {string} the final score for display
     */
    getFinalScore: function(game_id) {
      let final_score =
        this.$store.state.game_data[game_id].away_final +
        " - " +
        this.$store.state.game_data[game_id].home_final;

      return final_score;
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.money-column {
  text-align: right;
  font-weight: bold;
}

.bet-win {
  background-color: #00b000;
  text-align: left;
}

.bet-push {
  background-color: #b0b0b0;
  text-align: left;
}

.bet-lose {
  background-color: #ff5050;
  text-align: left;
}

.leg-win {
  background-color: #a0f0a0;
  text-align: left;
}

.leg-push {
  background-color: #d0d0d0;
  text-align: left;
}

.leg-lose {
  background-color: #ff9090;
  text-align: left;
}

.heading-label {
  font-weight: bold;
}

td {
  border-left: 0px;
  font-size: 0.9em;
  padding: 0.3em 0.3em;
}

.bet-amount {
  font-weight: bold;
}

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
  font-family: "Courier New", Courier, monospace;
  border-color: inherit;
  flood-color: grey;
}

.game-header {
  padding: 0.25em;
  min-width: 90px;
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
  margin-right: 100px;
}

#ck-button {
  margin: 2px;
  background-color: #efefef;
  border-radius: 4px;
  border: 1px solid #d0d0d0;
  overflow: auto;
  float: left;
}

#ck-button label {
  float: left;
  width: 4em;
  min-width: 80px;
}

#ck-button label span {
  text-align: center;
  padding: 1px 0px;
  display: block;
  border-radius: 4px;
}

#ck-button label input {
  position: absolute;
  top: -20px;
  display: none;
}

#ck-button input:hover + span {
  background-color: #efe0e0;
}

#ck-button input:checked + span {
  background-color: #191;
  font-weight: bold;
  color: #fff;
}

#ck-button input:checked:hover + span {
  background-color: #1c1;
  color: #fff;
}
</style>   

