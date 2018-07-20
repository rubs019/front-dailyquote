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
    fetch(urlQuote)
      .then(quote => quote.json())
      .then(quote => {
        this.setState({
          quote
        })
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
