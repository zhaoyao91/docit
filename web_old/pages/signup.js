import {Container, Form, FormGroup, Label, Input, Button, FormFeedback, Alert} from 'reactstrap';
import {compose, withHandlers, withProps, setPropTypes} from 'recompose';
import {PropTypes} from 'react';
import {isEmail} from 'validator';

import withSimpleState from '../lib/with_simple_state';
import Head from '../components/head';
import ServerService from '../services/server';

let SignupPage = null;
{
  const enhance = compose(
    withSimpleState('message', null), // {color, content}
    withSimpleState('signingUp', false),
    withHandlers({
      signup: ({setMessage, setSigningUp}) => (email, password) => {
        setMessage(null);
        setSigningUp(true);
        ServerService.users.createUser(email, password)
          .then(user => {
            setMessage({
              color: 'success',
              content: 'Signup successfully.'
            })
          })
          .catch(err => {
            if (err.name === 'ServiceError') {
              if (err.code === 'user-already-exists') {
                return setMessage({
                  color: 'danger',
                  content: 'This email has already been taken.',
                })
              }
            }
            setMessage({
              color: 'danger',
              content: 'Failed to signup.'
            })
          })
          .then(() => {
            setSigningUp(false);
          })
      }
    })
  );

  const Page = ({signup, message, signingUp}) => (
    <div>
      <Head/>
      <Container>
        <h1>Signup</h1>
        {message && <Message message={message}/>}
        <SignupForm signup={signup} loading={signingUp}/>
      </Container>

      <style jsx>{`
        h1 {
          margin: 1rem 0
        }
      `}</style>
    </div>
  );

  SignupPage = enhance(Page);
}
export default SignupPage;

const Message = ({message}) => (
  <Alert color={message.color}>{message.content}</Alert>
);

let SignupForm = null;
{
  function validateEmail(email) {
    if (!isEmail(email)) return 'Email is invalid';
  }

  function validatePassword(password) {
    if (!password) return 'Password cannot be empty'
  }

  const enhance = compose(
    setPropTypes({
      signup: PropTypes.func, // func(email, password)
      loading: PropTypes.bool,
    }),
    withSimpleState('email', ''),
    withSimpleState('password', ''),
    withSimpleState('emailDirty', false),
    withSimpleState('passwordDirty', false),
    withSimpleState('formDirty', false),
    withProps(({email, password}) => ({
      emailError: validateEmail(email),
      passwordError: validatePassword(password),
    })),
    withProps(({emailError, passwordError}) => ({
      emailFieldColor: emailError ? 'danger' : '',
      passwordFieldColor: passwordError ? 'danger' : '',
    })),
    withProps(({emailDirty, passwordDirty, formDirty}) => ({
      shouldShowEmailError: emailDirty || formDirty,
      shouldShowPasswordError: passwordDirty || formDirty,
    })),
    withHandlers({
      handleEmailChange: ({setEmail, setEmailDirty}) => e => {
        setEmail(e.target.value);
        setEmailDirty(true);
      },
      handlePasswordChange: ({setPassword, setPasswordDirty}) => e => {
        setPassword(e.target.value);
        setPasswordDirty(true);
      },
      handleSubmit: ({signup, email, password, emailError, passwordError, setFormDirty}) => e => {
        e.preventDefault();
        setFormDirty(true);
        if (!emailError && !passwordError) {
          signup(email, password);
        }
      }
    })
  );

  const Comp = ({
    loading,
    email,
    password,
    emailError,
    passwordError,
    shouldShowEmailError,
    shouldShowPasswordError,
    emailFieldColor,
    passwordFieldColor,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  }) => (
    <Form onSubmit={handleSubmit}>
      <FormGroup color={shouldShowEmailError ? emailFieldColor : ''}>
        <Label>Email</Label>
        <Input value={email} onChange={handleEmailChange} disabled={loading}/>
        <FormFeedback>{shouldShowEmailError && emailError}</FormFeedback>
      </FormGroup>
      <FormGroup color={shouldShowPasswordError ? passwordFieldColor : ''}>
        <Label>Password</Label>
        <Input type="password" value={password} onChange={handlePasswordChange} disabled={loading}/>
        <FormFeedback>{shouldShowPasswordError && passwordError}</FormFeedback>
      </FormGroup>
      <Button color="primary" disabled={loading}>Signup</Button>
    </Form>
  );

  SignupForm = enhance(Comp);
}