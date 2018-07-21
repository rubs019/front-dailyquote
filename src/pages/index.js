import React from 'react'
import Link from 'gatsby-link'
import { Container, Title } from 'bloomer'

const urlQuote = 'https://dailyquotes-api.herokuapp.com/quotes'
//const urlQuote = 'http://localhost:8003/quotes'

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      animate: ['.']
    }

    this.playAnimation = this.playAnimation.bind(this)
  }

  playAnimation() {
    let previouState = this.state.animate.length
    const interval = setInterval(() => {
      if (this.state.quote) clearInterval(interval)

      switch (this.state.animate.length) {
        case 1 : {
          previouState = 1
          this.setState((state) => {
            state.animate.push('.')
          })
          break
        }
        case 2 : {
          this.setState((state) => {
            if(previouState === 1) state.animate.push('.')
            if(previouState === 3) state.animate.pop()
          })
          break
        }
        case 3 : {
          previouState = 3
          this.setState((state) => {
            state.animate.pop()
          })
          break
        }

      }
    }, 1000)
  }
  componentDidMount() {

    this.playAnimation()

    fetch(urlQuote)
    // Retrieve its body as ReadableStream
      .then(response => response.body)
      .then(body => {
        const reader = body.getReader();

        return new ReadableStream({
          start(controller) {
            return pump();

            function pump() {
              return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                  controller.close();
                  return;
                }

                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
              });
            }
          }
        })
      })
      .then(stream => new Response(stream))
      .then(response => response.json())
      .then(quote => {
        this.setState({
          quote
        })
      })
      .catch(err => console.error(err))
  }

  render() {
    if (!this.state.quote) {
      return(
        <Container hasTextAlign="centered">
          <Title isSize="3">
            <strong>
              <span>Chargement </span>
              <p style={{width: '25px', display: 'inline-block'}}>{ this.state.animate }</p></strong>
          </Title>
        </Container>
      )
    }

    return (
      <Container hasTextAlign="centered">
        <Title isSize="1">"{ this.state.quote.data.message }"</Title>
        <Title isSize="3">
          <strong>{ this.state.quote.data.name }</strong> - { this.state.quote.data.job } &#x2690;
        </Title>
        <Title isSize="4">{ this.state.quote.data.born } - { this.state.quote.data.died }</Title>
      </Container>
    )
  }
}

export default IndexPage
