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
            // eslint-plugin-vue-disable-next-line
            <tr><td colspan=3></td></tr>
            // eslint-plugin-vue-disable-next-line
            <tr :class="'bet-' + b.result">
                <td colspan=2 v-html="PrintHTMLBetHeader(b)"></td>
                <td class="money-column">{{( b.payout > 0 ? b.payout : -1 * b.amount).toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0})}}</td>
            </tr>
            <tr v-for="l in b.legs" :key="l.id" :class="'leg-' + l.result">
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
import {betPrinter} from './mixins/betPrinter'

export default {
  name: 'PastWeek',
  mixins: [betPrinter],

  data () {
    return {      
      starting_bankroll: 200000,
      closing_bankroll: -312000,
      placed_bets: [],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
  background-color: #00B000;
  text-align:left;
}

.bet-push {
  background-color: #B0B0B0;
  text-align:left;
}

.bet-lose {
  background-color: #FF5050;
  text-align:left;
}

.leg-win {
  background-color: #A0F0A0;
  text-align:left;
}

.leg-push {
  background-color: #D0D0D0;
  text-align:left;
}

.leg-lose {
  background-color: #FF9090;
  text-align:left;
}

.heading-label {
  font-weight: bold;
}

th {
  padding: 0.5em 0.5em;
  border:1px solid #cbcbcb;
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
