export class NumberFormatter {
  public static format(value: number): string {
    if (Math.abs(value) >= 1e72) {
      return `${(Math.abs(value) / 1e72).toFixed(3)} duotrigintillion`;
    }

    if (Math.abs(value) >= 1e69) {
      return `${(Math.abs(value) / 1e69).toFixed(3)} nonvigintillion`;
    }

    if (Math.abs(value) >= 1e66) {
      return `${(Math.abs(value) / 1e66).toFixed(3)} octovigintillion`;
    }
    if (Math.abs(value) >= 1e63) {
      return `${(Math.abs(value) / 1e63).toFixed(3)} septenvigintillion`;
    }
    if (Math.abs(value) >= 1e60) {
      return `${(Math.abs(value) / 1e60).toFixed(3)} sexvigintillion`;
    }
    if (Math.abs(value) >= 1e57) {
      return `${(Math.abs(value) / 1e57).toFixed(3)} quinvigintillion`;
    }
    if (Math.abs(value) >= 1e54) {
      return `${(Math.abs(value) / 1e54).toFixed(3)} septendecillion`;
    }
    if (Math.abs(value) >= 1e51) {
      return `${(Math.abs(value) / 1e51).toFixed(3)} sexdecillion`;
    }
    if (Math.abs(value) >= 1e48) {
      return `${(Math.abs(value) / 1e48).toFixed(3)} quinquadecillion`;
    }

    if (Math.abs(value) >= 1e45) {
      return `${(Math.abs(value) / 1e45).toFixed(3)} quattuordecillion`;
    }

    if (Math.abs(value) >= 1e42) {
      return `${(Math.abs(value) / 1e42).toFixed(3)} tredecillion`;
    }
    if (Math.abs(value) >= 1e39) {
      return `${(Math.abs(value) / 1e39).toFixed(3)} duodecillion`;
    }

    if (Math.abs(value) >= 1e36) {
      return `${(Math.abs(value) / 1e36).toFixed(3)} undecillion`;
    }
    if (Math.abs(value) >= 1e33) {
      return `${(Math.abs(value) / 1e33).toFixed(3)} decillion`;
    }
    if (Math.abs(value) >= 1e30) {
      return `${(Math.abs(value) / 1e30).toFixed(3)} nonillion`;
    }

    if (Math.abs(value) >= 1e27) {
      return `${(Math.abs(value) / 1e27).toFixed(3)} octillion`;
    }
    if (Math.abs(value) >= 1e24) {
      return `${(Math.abs(value) / 1e24).toFixed(3)} septillion`;
    }
    if (Math.abs(value) >= 1e21) {
      return `${(Math.abs(value) / 1e21).toFixed(3)} sextillion`;
    }

    if (Math.abs(value) >= 1e18) {
      return `${(Math.abs(value) / 1e18).toFixed(3)} quintillion`;
    }
    if (Math.abs(value) >= 1e15) {
      return `${(Math.abs(value) / 1e15).toFixed(3)} quadrillion`;
    }
    if (Math.abs(value) >= 1e12) {
      return `${(Math.abs(value) / 1e12).toFixed(3)} trillion`;
    }
    if (Math.abs(value) >= 1e9) {
      return `${(Math.abs(value) / 1e9).toFixed(3)} billion`;
    }
    if (Math.abs(value) >= 1e6) {
      return `${(Math.abs(value) / 1e6).toFixed(3)} million`;
    }
    // if (Math.abs(value) >= 1e3) {
    //   return `${(Math.abs(value) / 1e3).toFixed(3)} thousand`;
    // }
    return `${value.toFixed(1)}`;
  }
}
