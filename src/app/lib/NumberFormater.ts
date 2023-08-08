export class NumberFormatter {
  public static format(value: number): string {
    if (Math.abs(value) >= 1e72) {
      return `${(Math.abs(value) / 1e72).toFixed(2)} duotrigintillion`;
    }

    if (Math.abs(value) >= 1e69) {
      return `${(Math.abs(value) / 1e69).toFixed(2)} nonvigintillion`;
    }

    if (Math.abs(value) >= 1e66) {
      return `${(Math.abs(value) / 1e66).toFixed(2)} octovigintillion`;
    }
    if (Math.abs(value) >= 1e63) {
      return `${(Math.abs(value) / 1e63).toFixed(2)} septenvigintillion`;
    }
    if (Math.abs(value) >= 1e60) {
      return `${(Math.abs(value) / 1e60).toFixed(2)} sexvigintillion`;
    }
    if (Math.abs(value) >= 1e57) {
      return `${(Math.abs(value) / 1e57).toFixed(2)} quinvigintillion`;
    }
    if (Math.abs(value) >= 1e54) {
      return `${(Math.abs(value) / 1e54).toFixed(2)} septendecillion`;
    }
    if (Math.abs(value) >= 1e51) {
      return `${(Math.abs(value) / 1e51).toFixed(2)} sexdecillion`;
    }
    if (Math.abs(value) >= 1e48) {
      return `${(Math.abs(value) / 1e48).toFixed(2)} quinquadecillion`;
    }

    if (Math.abs(value) >= 1e45) {
      return `${(Math.abs(value) / 1e45).toFixed(2)} quattuordecillion`;
    }

    if (Math.abs(value) >= 1e42) {
      return `${(Math.abs(value) / 1e42).toFixed(2)} tredecillion`;
    }
    if (Math.abs(value) >= 1e39) {
      return `${(Math.abs(value) / 1e39).toFixed(2)} duodecillion`;
    }

    if (Math.abs(value) >= 1e36) {
      return `${(Math.abs(value) / 1e36).toFixed(2)} undecillion`;
    }
    if (Math.abs(value) >= 1e33) {
      return `${(Math.abs(value) / 1e33).toFixed(2)} decillion`;
    }
    if (Math.abs(value) >= 1e30) {
      return `${(Math.abs(value) / 1e30).toFixed(2)} nonillion`;
    }

    if (Math.abs(value) >= 1e27) {
      return `${(Math.abs(value) / 1e27).toFixed(2)} octillion`;
    }
    if (Math.abs(value) >= 1e24) {
      return `${(Math.abs(value) / 1e24).toFixed(2)} septillion`;
    }
    if (Math.abs(value) >= 1e21) {
      return `${(Math.abs(value) / 1e21).toFixed(2)} sextillion`;
    }

    if (Math.abs(value) >= 1e18) {
      return `${(Math.abs(value) / 1e18).toFixed(2)} quintillion`;
    }
    if (Math.abs(value) >= 1e15) {
      return `${(Math.abs(value) / 1e15).toFixed(2)} quadrillion`;
    }
    if (Math.abs(value) >= 1e12) {
      return `${(Math.abs(value) / 1e12).toFixed(2)} trillion`;
    }
    if (Math.abs(value) >= 1e9) {
      return `${(Math.abs(value) / 1e9).toFixed(2)} billion`;
    }
    if (Math.abs(value) >= 1e6) {
      return `${(Math.abs(value) / 1e6).toFixed(2)} million`;
    }
    if (Math.abs(value) >= 1e3) {
      return `${(Math.abs(value) / 1e3).toFixed(2)} thousand`;
    }
    return `${value.toString()}`;
  }
}
