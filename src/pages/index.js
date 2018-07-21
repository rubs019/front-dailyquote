import React from 'react'
import Link from 'gatsby-link'
import { Container, Title } from 'bloomer'

const urlQuote = 'https://dailyquotes-api.herokuapp.com/quotes'
//const urlQuote = 'http://localhost:8003/quotes'

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    // Original function
    /*fetch(urlQuote)
      .then(quote => quote.json())
      .then(quote => {
        this.setState({
          quote
        })
      })
      .catch(err => {
        console.log(err)
      })*/

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
                  console.log('stream complete')
                  controller.close();
                  return;
                }

                console.log(value)

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
      .catch(err => console.error(err));
  }

  fetchStream(stream) {
    const reader = stream.body.getReader()
    let result
    let charsReceived = 0

    return reader.read()
      .then(function processText({done, value}) {
        if (done) {
          console.log('stream complete')
          console.log(value)
          return stream
        }

        charsReceived += value.length
        const chunk = value
        console.log(`Received ${charsReceived} characters so far. Current chunk = ${chunk}`)

        result += chunk

        return reader.read().then(processText)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (!this.state.quote) return <p>Chargement...</p>
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
