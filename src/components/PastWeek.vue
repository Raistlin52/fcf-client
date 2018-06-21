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
            <tr :key="b+'-spacer'"><td colspan=3></td></tr>
            <tr :key="b+'-header'" :class="'bet-' + b.result">
                <td colspan=2 v-html="PrintHTMLBetHeader(b)"></td>
                <td class="money-column">{{( b.payout > 0 ? b.payout : -1 * b.amount).toLocaleString({}, {style: "currency", currency: "USD", minimumFractionDigits: 0})}}</td>
            </tr>
            <tr v-for="l in b.legs" :key="l" :class="'leg-' + l.result">
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
      placed_bets: [
        {
          'datetime': 'Fri Mar 02 2018 01:17:30 GMT-0600 (CST)',
          'amount':50000,
          'bet_type': 'moneyline',
          'oddsString': '+205',
          'result': 'lose',
          'payout': 0,
          'legs': [
            {
              'game': 's2017.w6.g3',
              'leg_type': 'moneyline',
              'leg_line': 'DET +205',
              'odds': '+205',
              'final_score': '38 - 52',
              'result': 'lose'
              
            }
          ]
        },
        {
          'datetime': 'Fri Mar 02 2018 01:17:59 GMT-0600 (CST)',
          'amount':500000,
          'bet_type': 'parlay',
          'oddsString': '6:1',
          'result': 'lose',
          'payout': 0,
          'legs': [
            {
              'game': 's2017.w6.g9',
              'leg_type': 'spread',
              'leg_line': 'LAR +1',
              'odds': '-110',
              'final_score': '27 - 17',
              'result': 'win'
            },
            {
              'game': 's2017.w6.g11',
              'leg_type': 'total',
              'leg_line': '▲ 48.5',
              'odds': '-110',
              'final_score': '17 - 16',
              'result': 'lose'
            },
            {
              'game': 's2017.w6.g14',
              'leg_type': 'spread',
              'leg_line': 'IND +7',
              'odds': '-110',
              'final_score': '22 - 36',
              'result': 'lose'
            }
          ]
        },
        {
          'datetime': 'Fri Mar 02 2018 01:18:20 GMT-0600 (CST)',
          'amount':50000,
          'bet_type': 'moneyline',
          'oddsString': '-717',
          'result': 'lose',
          'payout': 0,
          'legs': [
            {
              'game': 's2017.w6.g13',
              'leg_type': 'moneyline',
              'leg_line': 'DEN -717',
              'odds': '-717',
              'final_score': '23 - 10',
              'result': 'lose'
            }
          ]
        },
        {
          'datetime': 'Fri Mar 02 2018 01:18:36 GMT-0600 (CST)',
          'amount':10000,
          'bet_type': 'parlay',
          'oddsString': '10:1',
          'result': 'win',
          'payout': 70000,
          'legs': [
            {
              'game': 's2017.w6.g8',
              'leg_type': 'total',
              'leg_line': '▲ 46',
              'odds': '-110',
              'final_score': '13 - 33',
              'result': 'push'
            },
            {
              'game': 's2017.w6.g10',
              'leg_type': 'total',
              'leg_line': '▲ 46.5',
              'odds': '-110',
              'final_score': '33 - 38',
              'result': 'win'
            },
            {
              'game': 's2017.w6.g12',
              'leg_type': 'spread',
              'leg_line': 'PIT +3.5',
              'odds': '-110',
              'final_score': '19 - 13',
              'result': 'win'
            },
            {
              'game': 's2017.w6.g13',
              'leg_type': 'total',
              'leg_line': '▼ 37.5',
              'odds': '-110',
              'final_score': '23 - 10',
              'result': 'win'
            }
          ]
        },
        {
          'datetime': 'Fri Mar 02 2018 01:18:56 GMT-0500 (EST)',
          'amount':50000,
          'bet_type': 'parlay',
          'oddsString': '13:1',
          'result': 'lose',
          'payout': 0,
          'legs': [
            {
              'game': 's2017.w6.g8',
              'leg_type': 'moneyline',
              'leg_line': 'GB -150',
              'odds': '-150',
              'final_score': '10 - 23',
              'result': 'lose'
            },
            {
              'game': 's2017.w6.g5',
              'leg_type': 'spread',
              'leg_line': 'MIA +14',
              'odds': '-110',
              'final_score': '20 - 17',
              'result': 'win'
            },
            {
              'game': 's2017.w6.g4',
              'leg_type': 'moneyline',
              'leg_line': 'NE -400',
              'odds': '-400',
              'final_score': '24 - 17',
              'result': 'win'
            },
            {
              'game': 's2017.w6.g3',
              'leg_type': 'total',
              'leg_line': '▼ 50.5',
              'odds': '-110',
              'final_score': '38 - 52',
              'result': 'lose'
            },
            {
              'game': 's2017.w6.g12',
              'leg_type': 'total',
              'leg_line': '▲ 46',
              'odds': '-110',
              'final_score': '19 - 13',
              'result': 'lose'
            }
          ]
        },
        {
          'datetime': 'Fri Mar 02 2018 01:19:26 GMT-0600 (CST)',
          'amount': 50000,
          'bet_type': 'moneyline',
          'oddsString': '+140',
          'result': 'win',
          'payout': 120000,
          'legs': [
            {
              'game': 's2017.w6.g11',
              'leg_type': 'moneyline',
              'leg_line': 'LAC +140',
              'odds': '+140',
              'final_score': '17 - 16',
              'result': 'win'
            }
          ]
        },
        {
          'datetime': 'Fri Mar 02 2018 01:19:26 GMT-0600 (CST)',
          'amount': 52000,
          'bet_type': 'interest',
          'result': 'lose',
          'payout': 0
        }
      ]
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
