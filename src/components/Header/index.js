import React from 'react'
import Link from 'gatsby-link'
import { Container, Button, Columns, Column, Title} from 'bloomer'

const AppHeader = () => (
  <Container>
    <Columns isCentered>
      <Column isSize='6/12'>
        <Title>DailyQuote</Title>
      </Column>
      {/*<Column>
        <Button>
          <p>Disable transitions</p>
        </Button>
      </Column>*/}
    </Columns>
  </Container>
)

export default AppHeader
