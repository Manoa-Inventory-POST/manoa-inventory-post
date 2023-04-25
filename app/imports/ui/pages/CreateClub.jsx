import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {
  AutoForm,
  ErrorsField,
  HiddenField,
  LongTextField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Clubs } from '../../api/clubs/Clubs';
import {defineMethod, updateMethod} from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { Interests } from '../../api/clubs/Interests';

/* Renders the EditClub page for editing a single document. */
const CreateClub = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready, interestsValues } = useTracker(() => {
    // Get access to Club documents.
    const subscription = Clubs.subscribeClubs();
    const subClubInterests = ClubInterests.subscribeClubInterests();
    const subInterests = Interests.subscribeInterests();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subClubInterests.ready() && subInterests.ready();

    let interests = Interests.find({ }, {}).fetch();
    interests = interests.map(item => item.interest);
    // console.log(interests);
    return {
      interestsValues: interests,
      ready: rdy,
    };
  });

  const ClubSchema = new SimpleSchema({
    name: String,
    website: String,
    description: String,
    picture: String,
    interests: { type: Array, label: 'Interests', optional: true },
    'interests.$': { type: String, allowedValues: interestsValues, optional: true },
    clubInterestIds: { type: Array, label: 'InterestIds', optional: true },
    'clubInterestIds.$': { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(ClubSchema);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, website, description, picture, interests } = data;
    console.log(data);
    const collectionName = Clubs.getCollectionName();
    console.log(collectionName);
    const definitionData = { name, website, description, picture, interests };
    console.log(definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Club updated successfully', 'success'));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Club</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="club name" />
                <TextField name="website" placeholder="website url" />
                <TextField name="picture" placeholder="picture url" />
                <SelectField name="interests" multiple />
                <LongTextField name="description" placeholder="some sentences describing the club" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading" />);
};

export default CreateClub;
