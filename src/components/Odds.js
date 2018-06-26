export default class Odds {
  constructor (stringRepresentation) {
    this._oddsString = stringRepresentation
  }

  set oddsString (newVal) {
    this._oddsString = newVal
  }

  get oddsString () {
    return this._oddsString
  }

  get winMultiple () {
    return this.calcWinFactor()
  }

  calcWinFactor () {
    let m = NaN

    if (this.oddsString[0] === '-') {
      // must bet this amount to win 100
      m = 100 / Math.abs(Number(this.oddsString))
    } else if (this.oddsString[0] === '+') {
      // betting 100 wins this amount
      m = Math.abs(Number(this.oddsString)) / 100
    } else if (this.oddsString.includes(':')) {
      // X to Y bet, e.g. 20:1
      let stringparts = this.oddsString.split(':')
      let numerator = stringparts[0]
      let denominator = stringparts[1]
      m = numerator / denominator
    } else {
      // Something went wrong or the bet has been cleared.
      m = 0
    }

    return m
  }
}
