import React, { PropTypes } from 'react'
import { Container, Form, Button, Message } from 'semantic-ui-react'
import { withProps, setPropTypes, withHandlers, withState } from 'recompose'
import { compose, assoc, partial } from 'lodash/fp'
import { gql, graphql } from 'react-apollo'
import joi from 'joi'

import { withSimpleInputState, makeFormSubmitHandler } from '../../lib/hocs'
import { proxyBefore, effectiveIf } from '../../lib/function_utils'

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
      if (submitStatus !== 'failed') {
        null
      } else if (!submitError) {
        'Failed to signup'
      } else if (submitError.message === 'GraphQL error: Users.duplicate-user') {
        'This email has already been taken'
      } else {
        'Failed to signup'
      }
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

  // about form fields
  withSimpleInputState('email', ''),
  withSimpleInputState('password', ''),
  withHandlers({
    onSubmit: ({onSubmit, email, password}) => e => onSubmit({email, password})
  }),

  // about form validations
  withProps(({email, password}) => ({
    invalidEmail: !!joi.validate({email}, {email: joi.string().email().required()}).error,
    invalidPassword: !!joi.validate({password}, {password: joi.string().required()}).error,
  })),
  withHandlers({
    onSubmit: ({onSubmit, invalidEmail, invalidPassword}) => effectiveIf(() => !invalidEmail && !invalidPassword)(onSubmit)
  }),

  // about form dirties
  withState('dirties', 'setDirties', {form: false, email: false, password: false}),
  withHandlers({
    onEmailChange: ({setDirties, onEmailChange}) => proxyBefore(() => setDirties(assoc('email', true)))(onEmailChange),
    onPasswordChange: ({setDirties, onPasswordChange}) => proxyBefore(() => setDirties(assoc('password', true)))(onPasswordChange),
    onSubmit: ({setDirties, onSubmit}) => proxyBefore(() => setDirties(assoc('form', true)))(onSubmit)
  }),

  // about form errors
  withProps(({invalidEmail, invalidPassword, dirties}) => ({
    emailErrorMessage: invalidEmail && (dirties.form || dirties.email) ? 'Email is invalid' : null,
    passwordErrorMessage: invalidPassword && (dirties.form || dirties.password) ? 'Password cannot be empty' : null
  })),

  makeFormSubmitHandler('onSubmit'),
)(({onSubmit, email, password, onEmailChange, onPasswordChange, loading, successMessage, errorMessage, emailErrorMessage, passwordErrorMessage}) => (
  <Form onSubmit={onSubmit} loading={loading}>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' value={email} onChange={onEmailChange}/>
      <Message error content={emailErrorMessage} visible={!!emailErrorMessage}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type="password" placeholder='Password' value={password} onChange={onPasswordChange}/>
      <Message error content={passwordErrorMessage} visible={!!passwordErrorMessage}/>
    </Form.Field>
    <Message content={successMessage} success visible={!!successMessage}/>
    <Message content={errorMessage} error visible={!!errorMessage}/>
    <Button primary type='submit'>Signup</Button>
  </Form>
))
