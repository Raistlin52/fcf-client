<template>
  <div>
     <h1>Week 6</h1>
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
            <td class="money-column">{{starting_bankroll.toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0}) }}</td>
        </tr>
        <template v-for="b in placed_bets">
            <tr :key="b.datetime+'-spacer'"><td colspan=3></td></tr>
            <tr :key="b.datetime+'-header'" :class="'bet-' + b.result">
                <td colspan=2 v-html="PrintHTMLBetHeader(b)"></td>
                <td class="money-column">{{( b.payout > 0 ? b.payout : -1 * b.amount).toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0})}}</td>
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

  </div>
</template>

<script>
/* eslint-disable */
// import Odds from './Odds'
import { betPrinter } from "./mixins/betPrinter";

export default {
  name: "PastWeek",
  mixins: [betPrinter],

  data() {
    return {
      starting_bankroll: 200000,
      closing_bankroll: -312000,
      placed_bets: [     // Need to add 'result' and 'payout' to bet and 'final_score' and 'result' to legs
        {
          datetime: "Tue Jul 03 2018 15:46:40 GMT-0500 (Central Daylight Time)",
          amount: 500000,
          bet_type: "parlay",
          oddsString: "26:1",
          result: "lose",
          payout: 0,
          legs: [
            {
              game: 46,
              leg_type: "moneyline",
              leg_line: "MIA +638",
              odds: "+638",
              final_score: "20 - 17",
              result: "win"
            },
            {
              game: 99,
              leg_type: "spread",
              leg_line: "WAS -12.0",
              odds: "-110",
              final_score: "24 - 26",
              result: "win"
            },
            {
              game: 11,
              leg_type: "total",
              leg_line: "▼44.0",
              odds: "-110",
              final_score: "28 - 23",
              result: "lose"
            }
          ]
        },
        {
          datetime: "Tue Jul 03 2018 15:46:48 GMT-0500 (Central Daylight Time)",
          amount: 600000,
          bet_type: "moneyline",
          oddsString: "-143",
          result: "lose",
          payout: 0,
          legs: [
            {
              game: 11,
              leg_type: "moneyline",
              leg_line: "CAR -143",
              odds: "-143",
              final_score: "28 - 23",
              result: "lose"
            }
          ]
        },
        {
          datetime: "Tue Jul 03 2018 15:47:00 GMT-0500 (Central Daylight Time)",
          amount: 600000,
          bet_type: "moneyline",
          oddsString: "+129",
          result: "win",
          payout: 1374000,
          legs: [
            {
              game: 11,
              leg_type: "moneyline",
              leg_line: "PHI +129",
              odds: "+129",
              final_score: "28 - 23",
              result: "win"
            }
          ]
        },
        {
          datetime: "Fri Mar 02 2018 01:19:27 GMT-0600 (CST)",
          amount: 52000,
          bet_type: "interest",
          result: "lose",
          payout: 0
        }
      ]
    };
  }
};
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

th {
  padding: 0.5em 0.5em;
  border: 1px solid #cbcbcb;
}

td {
  border-left: 0px;
  font-size: 0.9em;
  padding: 0.3em 0.3em;
}

.bet-amount {
  font-weight: bold;
}
</style>
