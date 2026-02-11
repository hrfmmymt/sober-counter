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

  private pad(num: number, size: number = 2): string {
    return num.toString().padStart(size, '0')
  }

  render() {
    const years = this.pad(this.years)
    const days = this.pad(this.days, 3)
    const hours = this.pad(this.hours)
    const minutes = this.pad(this.minutes)
    const seconds = this.pad(this.seconds)

    return html`
      <h1 class="title">hrfmmymt has been sober for</h1>
      <div class="display-container">
        <div class="display">
          <div class="unit">
            <span class="digits">${years}</span>
            <span class="label">Years</span>
          </div>
          <span class="colon"><span class="dot"></span><span class="dot"></span></span>
          <div class="unit">
            <span class="digits">${days}</span>
            <span class="label">Days</span>
          </div>
          <span class="colon"><span class="dot"></span><span class="dot"></span></span>
          <div class="unit">
            <span class="digits">${hours}</span>
            <span class="label">Hours</span>
          </div>
          <span class="colon"><span class="dot"></span><span class="dot"></span></span>
          <div class="unit">
            <span class="digits">${minutes}</span>
            <span class="label">Minutes</span>
          </div>
          <span class="colon"><span class="dot"></span><span class="dot"></span></span>
          <div class="unit">
            <span class="digits">${seconds}</span>
            <span class="label">Seconds</span>
          </div>
        </div>
      </div>
      <div class="motto">EVERY SECOND COUNTS</div>
      <p class="credit">Quote from <a href="https://www.fxnetworks.com/shows/the-bear" target="_blank" rel="noopener noreferrer">The Bear</a></p>
    `
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: 'DSEG7-Modern', monospace;
      font-style: italic;
    }

    .title {
      font-family: system-ui, sans-serif;
      font-style: normal;
      font-size: 2rem;
      font-weight: 500;
      color: #333;
      text-align: center;
      margin: 0 0 40px 0;
    }

    .display-container {
      background: #0a0a0a;
      padding: 24px 32px;
      border-radius: 2px;
      border: 6px solid #2a2a2a;
      box-shadow:
        inset 0 2px 10px rgba(0, 0, 0, 0.8),
        0 4px 20px rgba(0, 0, 0, 0.5);
      outline: 2px solid #1a1a1a;
    }

    .display {
      display: flex;
      align-items: flex-start;
      font-size: 4rem;
      color: #7fdbff;
      text-shadow:
        0 0 5px #7fdbff,
        0 0 10px rgba(127, 219, 255, 0.5);
      letter-spacing: 0.05em;
    }

    .unit {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .digits {
      font-family: 'DSEG7-Modern', monospace;
    }

    .label {
      font-family: system-ui, sans-serif;
      font-style: normal;
      font-size: 0.7rem;
      color: #7fdbff;
      text-shadow: none;
      margin-top: 8px;
      letter-spacing: 0.05em;
    }

    .colon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      margin: 0 0.3em;
      align-self: center;
    }

    .dot {
      width: 6px;
      height: 10px;
      background-color: #7fdbff;
      box-shadow:
        0 0 5px #7fdbff,
        0 0 10px rgba(127, 219, 255, 0.5);
      transform: skewX(-12deg);
    }

    .dot:first-child {
      transform: skewX(-6deg) translateX(0px);
    }

    .dot:last-child {
      transform: skewX(-6deg) translateX(-2px);
    }

    .motto {
      margin-top: 40px;
      align-self: center;
      max-width: 60%;
      background: linear-gradient(to bottom, #1a3a5c, #0d2840);
      color: #fff;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-style: normal;
      font-size: 2.2rem;
      font-weight: 400;
      letter-spacing: 0.001em;
      padding: 40px 16px;
      text-align: center;
      border-radius: 2px;
      border: 2px solid #2a2a2a;
      outline: 1px solid #1a1a1a;
      box-shadow:
        inset 0 2px 10px rgba(0, 0, 0, 0.5),
        0 4px 20px rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 768px) {
      .title {
        font-size: 1.2rem;
        padding: 0 16px;
      }

      .display-container {
        padding: 12px 8px;
        border-width: 4px;
        max-width: calc(100vw - 32px);
        box-sizing: border-box;
      }

      .display {
        font-size: clamp(1.2rem, 7.8vw, 4rem);
      }

      .colon {
        margin: 0 0.1em;
        gap: 6px;
      }

      .dot {
        width: 3px;
        height: 5px;
      }

      .label {
        font-size: 0.45rem;
        margin-top: 4px;
      }

      .motto {
        margin-top: 24px;
        max-width: 90%;
        font-size: 1.2rem;
        padding: 24px 12px;
      }
    }

    .credit {
      position: fixed;
      bottom: 24px;
      font-family: system-ui, sans-serif;
      font-style: normal;
      font-size: 0.85rem;
      color: #666;
    }

    .credit a {
      color: #666;
      text-decoration: underline;
    }

    .credit a:hover {
      color: #333;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'sober-counter': SoberCounter
  }
}
