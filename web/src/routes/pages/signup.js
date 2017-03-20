import React, { PropTypes } from 'react'
import { Container, Form, Button, Message } from 'semantic-ui-react'
import { withProps, setPropTypes, withHandlers, withState } from 'recompose'
import { compose } from 'lodash/fp'
import { gql, graphql } from 'react-apollo'

import { withSimpleInputState, withFormSubmitHandlers } from '../../lib/hocs'

export default compose(
  graphql(gql`
    mutation ($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        id
      }
    }
  `, {name: 'createUser'}),
  withState('submitStatus', 'setSubmitStatus', null), // 'loading', 'success', 'failed'
  withState('submitError', 'setSubmitError', null),
  withHandlers({
    onSubmit: ({createUser, setSubmitStatus, setSubmitError}) => ({email, password}) => {
      setSubmitStatus('loading')
      setSubmitError(null)
      createUser({variables: {email, password}}).then(({data}) => {
        setSubmitStatus('success')
      }).catch(err => {
        setSubmitStatus('failed')
        setSubmitError(err)
        console.error(err)
      })
    }
  }),
  withProps(({submitStatus, submitError}) => ({
    submitting: submitStatus === 'loading',
    successMessage: submitStatus === 'success' ? 'Succeeded to signup' : undefined,
    errorMessage: do {
      if (submitStatus !== 'failed') { null }
      else if (!submitError) { 'Failed to signup' }
      else { submitError.message }
    }
  })),
)(({onSubmit, submitting, successMessage, errorMessage}) => (
  <Container>
    <h1>Signup</h1>
    <SignupForm onSubmit={onSubmit} loading={submitting} successMessage={successMessage} errorMessage={errorMessage}/>
  </Container>
))

const SignupForm = compose(
  setPropTypes({
    // func({email, password})
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }),
  withSimpleInputState('email', ''),
  withSimpleInputState('password', ''),
  withFormSubmitHandlers({
    onSubmit: ({onSubmit, email, password}) => onSubmit({email, password})
  }),
)(({onSubmit, email, password, onEmailChange, onPasswordChange, loading, successMessage, errorMessage}) => (
  <Form onSubmit={onSubmit} loading={loading}>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' value={email} onChange={onEmailChange}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" placeholder='Password' value={password} onChange={onPasswordChange}/>
    </Form.Field>
    <Message content={successMessage} success visible={!!successMessage}/>
    <Message content={errorMessage} error visible={!!errorMessage}/>
    <Button primary type='submit'>Signup</Button>
  </Form>
))
