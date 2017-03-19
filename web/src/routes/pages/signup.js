import React, { PropTypes } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import { setPropTypes } from 'recompose'
import { compose } from 'lodash/fp'

import { withSimpleInputState, withFormSubmitHandlers } from '../../lib/hocs'

/**
 * responsibility: let user signup
 * work:
 * - gather user data
 * - call service to signup
 */
export default () => (
  <Container>
    <h1>Signup</h1>
    <SignupForm onSubmit={console.log}/>
  </Container>
)

/**
 * responsibility: gather user data
 */
const SignupForm = compose(
  setPropTypes({
    // func({email, password})
    onSubmit: PropTypes.func.isRequired,
  }),
  withSimpleInputState('email', ''),
  withSimpleInputState('password', ''),
  withFormSubmitHandlers({
    onSubmit: ({onSubmit, email, password}) => onSubmit({email, password})
  }),
)(({onSubmit, email, password, onEmailChange, onPasswordChange}) => (
  <Form onSubmit={onSubmit}>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' value={email} onChange={onEmailChange}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" placeholder='Password' value={password} onChange={onPasswordChange}/>
    </Form.Field>
    <Button primary type='submit'>Signup</Button>
  </Form>
))
