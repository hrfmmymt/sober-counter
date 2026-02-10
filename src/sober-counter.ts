import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

const startDate = new Date('2019-01-03T00:00:00Z')

@customElement('sober-counter')
export class SoberCounter extends LitElement {
  @state()
  private years = 0

  @state()
  private days = 0

  @state()
  private hours = 0

  @state()
  private minutes = 0

  @state()
  private seconds = 0

  private intervalId?: ReturnType<typeof setInterval>

  connectedCallback() {
    super.connectedCallback()
    this.updateCounter()
    this.intervalId = setInterval(() => this.updateCounter(), 1000)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  private updateCounter() {
    const now = new Date()
    const diff = now.getTime() - startDate.getTime()

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
    this.years = Math.floor(totalDays / 365)
    this.days = totalDays % 365
    this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    this.seconds = Math.floor((diff % (1000 * 60)) / 1000)
  }

  private pluralize(value: number, unit: string) {
    return `${value} ${unit}${value === 1 ? '' : 's'}`
  }

  render() {
    return html`
      <div id="counter">
        hrfmmymt has been sober for ${this.pluralize(this.years, 'year')}, ${this.pluralize(this.days, 'day')}, ${this.pluralize(this.hours, 'hour')}, ${this.pluralize(this.minutes, 'minute')}, and ${this.pluralize(this.seconds, 'second')}
      </div>
    `
  }

  static styles = css`
    :host {
      display: block;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'sober-counter': SoberCounter
  }
}
