import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const ResetPassword = () => {
  const { token } = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const schema = new SimpleSchema({
    newPassword: String,
    confirmPassword: String,
  });
  const customValidation = (context) => {
    if (context.newPassword !== context.confirmPassword) {
      return { confirmPassword: 'Passwords do not match' };
    }
    return {};
  };

  const bridge = new SimpleSchema2Bridge(schema, customValidation);

  const submit = (doc) => {
    const { newPassword, confirmPassword } = doc;
    if (newPassword === confirmPassword) {
      Meteor.call('users.resetPasswordWithToken', token, newPassword, (err) => {
        if (err) {
          setError(err.reason);
          swal('Error', error.message, 'error');
        } else {
          setSuccess(true);
          swal('Success', 'Password updated successfully', 'success');
        }
      });
    } else {
      setError('Passwords do not match');
    }
  };

  if (success) {
    return (<Navigate to="/signin" />);
  }

  return (
    <Container id={PAGE_IDS.RESET_PASSWORD} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Reset Password</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.RESET_PASSWORD_FORM_NEW_PASSWORD} name="newPassword" placeholder="New Password" type="password" />
                <TextField id={COMPONENT_IDS.RESET_PASSWORD_FORM_CONFIRM_PASSWORD} name="confirmPassword" placeholder="Confirm New Password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.RESET_PASSWORD_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Reset password failed</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
