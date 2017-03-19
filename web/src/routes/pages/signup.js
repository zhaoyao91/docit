import React, { PropTypes } from 'react'
import { Container, Form, Button } from 'semantic-ui-react'
import { setPropTypes, withHandlers, withState } from 'recompose'
import { compose } from 'lodash/fp'
import { gql, graphql } from 'react-apollo'

import { withSimpleInputState, withFormSubmitHandlers } from '../../lib/hocs'

/**
 * responsibility: let user signup
 * work:
 * - gather user data
 * - call service to signup
 */
export default compose(
  withState('submitting', 'setSubmitting', false),
  graphql(gql`
    mutation ($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        id
      }
    }
  `, {name: 'createUser'}),
  withHandlers({
    onSubmit: ({createUser, setSubmitting}) => ({email, password}) => {
      setSubmitting(true)
      createUser({variables: {email, password}}).then(({data}) => {
        console.log('user created')
      }).catch(err => {
        console.log('failed to create user')
        console.error(err)
      }).then(() => setSubmitting(false))
    }
  }),
)(({onSubmit, submitting}) => (
  <Container>
    <h1>Signup</h1>
    <SignupForm onSubmit={onSubmit} loading={submitting}/>
  </Container>
))

/**
 * responsibility: gather user data
 */
const SignupForm = compose(
  setPropTypes({
    // func({email, password})
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  }),
  withSimpleInputState('email', ''),
  withSimpleInputState('password', ''),
  withFormSubmitHandlers({
    onSubmit: ({onSubmit, email, password}) => onSubmit({email, password})
  }),
)(({onSubmit, email, password, onEmailChange, onPasswordChange, loading}) => (
  <Form onSubmit={onSubmit} loading={loading}>
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
