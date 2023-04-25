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
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { Interests } from '../../api/clubs/Interests';

/* Renders the EditStuff page for editing a single document. */
const EditClub = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready, interestsValues } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Clubs.subscribeClubs();
    const subClubInterests = ClubInterests.subscribeClubInterests();
    const subInterests = Interests.subscribeInterests();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subClubInterests.ready() && subInterests.ready();
    // Get the document
    const document = Clubs.find({ _id }, {}).fetch();
    console.log(document);
    const clubToEdit = document[0];
    console.log(clubToEdit);
    const club = clubToEdit.name;
    // console.log(club);
    let clubInterests = ClubInterests.find({ club }, {}).fetch();
    // console.log(clubInterests);
    const clubInterestIds = clubInterests.map(item => item._id);
    console.log(clubInterestIds);
    clubToEdit.clubInterestIds = clubInterestIds;
    clubInterests = clubInterests.map(item => item.interest);
    clubToEdit.interests = clubInterests;
    // console.log(clubToEdit.interests);
    let interests = Interests.find({ }, {}).fetch();
    interests = interests.map(item => item.interest);
    // console.log(interests);
    return {
      doc: clubToEdit,
      interestsValues: interests,
      ready: rdy,
    };
  }, [_id]);

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
    const { name, website, description, picture, interests, clubInterestIds } = data;
    console.log(data);
    const collectionName = Clubs.getCollectionName();
    console.log(collectionName);
    const updateData = { id: _id, name, website, description, picture, interests, clubInterestIds };
    console.log(updateData);
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Club updated successfully', 'success'));
  };

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Club</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField readOnly name="name" />
                <TextField name="website" />
                <TextField name="picture" />
                <SelectField name="interests" multiple />
                <LongTextField name="description" />
                <SubmitField value="Submit" />
                <HiddenField name="clubInterestIds" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading" />);
};

export default EditClub;
