import React from 'react'
import Moment from 'moment/moment'

const url = 'https://dailyquotes-api.herokuapp.com'

class AppTimer extends React.Component {

  constructor(props) {
    super(props)

    console.log(this)

    this.state =  {
      counter: null
    }

    this.counterToNextQuote = this.counterToNextQuote.bind(this)
  }

  componentDidMount() {
    setInterval(this.counterToNextQuote, 1000)

    this.getTimer()
  }

  counterToNextQuote() {
    const counterForNextQuote = new Moment(this.state.timer.data.dateNextQuote)
    this.setState((state) => {
      let expire = Moment.duration(counterForNextQuote.diff(Moment.now()))
      let hours = expire.hours() < 10 ? `0${expire.hours()}` : expire.hours()
      let minutes = expire.minutes() < 10 ? `0${expire.minutes()}` : expire.minutes()
      let seconds = expire.seconds() < 10 ? `0${expire.seconds()}` : expire.seconds()

      state.counter = `${hours} : ${minutes} : ${seconds}`
    })
  }

  getTimer() {

    fetch(`${url}/timer`)
      .then(timer => timer.json())
      .then(timer => {
        this.setState({
          timer
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <p id="clock-timer">Prochaine citations dans { !this.state.counter ? `00:00:00` : this.state.counter}</p>
    )
  }
}

export default AppTimer