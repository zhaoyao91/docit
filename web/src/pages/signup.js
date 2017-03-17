import React from 'react'
import { Container, Form, Button } from 'semantic-ui-react'

export default () => (
  <Container>
    <h1>Signup</h1>
    <Form>
      <Form.Field>
        <label>Email</label>
        <input placeholder='Email'/>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input type="password" placeholder='Password'/>
      </Form.Field>
      <Button primary type='submit'>Signup</Button>
    </Form>
  </Container>
)
