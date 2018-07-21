import React from 'react'
import Link from 'gatsby-link'
import { Container, Columns, Column, Title} from 'bloomer'

const AppHeader = () => (
  <Container>
    <Columns isCentered>
      <Column isSize='6/12'>
        <Title>DailyQuote</Title>
      </Column>
    </Columns>
  </Container>
)

export default AppHeader
