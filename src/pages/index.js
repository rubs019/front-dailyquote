import React from 'react'
import Link from 'gatsby-link'
import { Container, Title, Tag, Box, Icon, Columns, Column, Content } from 'bloomer'
import Moment from 'moment'
import AppTimer from '../components/Timer'

const url = 'https://dailyquotes-api.herokuapp.com'

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      animate: ['.'],
      counter: null,
      timer: null
    }

    this.playAnimation = this.playAnimation.bind(this)
  }

  componentDidMount() {

    this.playAnimation()

    this.getQuote()
  }


  getQuote() {
    return fetch(`${url}/quotes`)
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
      <Container hasTextAlign="centered" id='box-quote-elem'>
        <AppTimer />
        <Box>
          <Title isSize="2">"{ this.state.quote.data.message }"</Title>
          <Columns isVCentered hasTextAlign="right">

            <Column>
              <Content>
                <Title isSize="5">
                  <b>{ this.state.quote.data.name }</b>
                  <span>- { this.state.quote.data.job } ({ this.state.quote.data.born.split('/')[2] } - { this.state.quote.data.died.split('/')[2] }) </span>
                </Title>
              </Content>
            </Column>
          </Columns>
          <Columns>


            <Column isSize="5">
              <Tag isColor='success' isSize="medium">24 Interprations</Tag>
            </Column>

            <Column>
                <Tag isColor='danger' isSize="medium">
                  <Icon className="fa fa-heart fa" isSize="large" />
                  1324 Like
                </Tag>
            </Column>

            <Column>
              <Tag isColor='warning' isSize="medium">
                <Icon className="fa fa-share fa" isSize="large" />
                Partagez
              </Tag>
            </Column>

          </Columns>
        </Box>
      </Container>
    )
  }
}

export default IndexPage
