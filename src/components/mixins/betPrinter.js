export const betPrinter = {
  mixins: [],
  computed: {
    game_data: function () {
      return this.$store.state.game_data
    }
  },
  methods: {
    PrintHTMLBet: function (bet) {
      // This Prints Interest Charges as well
      let m = this.PrintHTMLBetHeader(bet)
      m += '<span>'
      for (let l of bet.legs) {
        m += '&nbsp;&nbsp;' + this.PrintHTMLLeg(l) + '<br>'
      }
      m += '</span>'
      return m
    },
    PrintHTMLBetHeader: function (bet) {
      let d = new Date(bet.datetime)
      let m = '<span>'

      // This prints Interest Charges as well
      if (bet.bet_type === 'interest') {
        m += (d.getMonth() + 1) + '/' + d.getDate() + ' 20pts on $' + Math.floor(bet.amount / 0.2).toLocaleString() + ' Loan from "Vinny"'
      } else {
        m += (d.getMonth() + 1) + '/' + d.getDate() + ' $' + bet.amount.toLocaleString() + ' ' + bet.bet_type.toUpperCase() + ' Bet ' + bet.oddsString + '<br>'
      }
      m += '</span>'
      return m
    },
    PrintHTMLLeg: function (leg) {
      let d = new Date(this.game_data[leg.game].gamedate)
      let m = (d.getMonth() + 1) + '/' + d.getDate() + ' '
      m += this.min3HTML(this.game_data[leg.game].away) + ' @ ' + this.min3HTML(this.game_data[leg.game].home) + ': '

      if (leg.leg_type === 'spread' || leg.leg_type === 'total') {
        m += leg.leg_line
      } else if (leg.leg_type === 'moneyline') {
        m += leg.leg_line.split(' ')[0] + ' Win'
      }
      return m
    },
    PrintBet: function (bet) {
      // This Prints Interest Charges as well
      let m = this.PrintBetHeader(bet)
      for (let l of bet.legs) {
        m += '    ' + this.PrintLeg(l) + '\n'
      }
      return m
    },
    PrintBetHeader: function (bet) {
      let d = new Date(bet.datetime)
      let m = ''

      // This prints Interest Charges as well
      if (bet.bet_type === 'interest') {
        m += (d.getMonth() + 1) + '/' + d.getDate() + ' 20pts on $' + Math.floor(bet.amount / 0.2).toLocaleString() + ' Loan from "Vinny"'
      } else {
        m += (d.getMonth() + 1) + '/' + d.getDate() + ' $' + bet.amount.toLocaleString() + ' ' + bet.bet_type.toUpperCase() + ' Bet ' + bet.oddsString
      }
      m += '\n'
      return m
    },
    PrintLeg: function (leg) {
      let d = new Date(this.game_data[leg.game].gamedate)
      let m = (d.getMonth() + 1) + '/' + d.getDate() + ' '
      m += this.min3(this.game_data[leg.game].away) + ' @ ' + this.min3(this.game_data[leg.game].home) + ': '

      if (leg.leg_type === 'spread' || leg.leg_type === 'total') {
        m += leg.leg_line
      } else if (leg.leg_type === 'moneyline') {
        m += leg.leg_line.split(' ')[0] + ' Win'
      }
      return m
    },
    min3: function (thing) {
      let x = 3 - thing.length
      while (x > 0) {
        thing += ' '
        x--
      }
      return thing
    },
    min3HTML: function (thing) {
      let x = 3 - thing.length
      while (x > 0) {
        thing += '&nbsp;'
        x--
      }
      return thing
    }
  }
}
