import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const ForgotPassword = () => {
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const schema = new SimpleSchema({
    email: String,
    securityQuestion: String,
    securityAnswer: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, securityQuestion, securityAnswer } = doc;
    Meteor.call('users.generateResetToken', email, securityQuestion, securityAnswer, (err, generatedToken) => {
      if (err) {
        setError(err.reason);
      } else {
        setToken(generatedToken);
      }
    });
  };

  if (token) {
    return (<Navigate to={`/reset-password/${token}`} />);
  }

  return (
    <Container id={PAGE_IDS.FORGOT_PASSWORD} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Forgot Password</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.FORGOT_PASSWORD_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.FORGOT_PASSWORD_FORM_SECURITY_QUESTION} name="securityQuestion" placeholder="Security Question" />
                <TextField id={COMPONENT_IDS.FORGOT_PASSWORD_FORM_SECURITY_ANSWER} name="securityAnswer" placeholder="Security Answer" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.FORGOT_PASSWORD_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Remembered your password? <Link to="/signin">Sign in</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
