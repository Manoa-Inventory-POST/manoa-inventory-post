import React from 'react';
import swal from 'sweetalert';
import { Container } from 'react-bootstrap';
import { AutoForm, SubmitField, BoolField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';

const StudentPositionItem = () => {
  const { _id } = useParams();
  console.log(_id);

  const { doc } = useTracker(() => {
    const subStudent = StudentProfiles.subscribe();
    const rdy = subStudent.ready();
    const docStudent = StudentProfiles.find({ _id }, {}).fetch();

    const userToEdit = docStudent[0];

    return {
      doc: userToEdit,
    };
  }, [_id]);

  const UserFormSchema = new SimpleSchema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    TA: { type: Boolean, label: 'TA', defaultValue: false },
    RA: { type: Boolean, label: 'RA', defaultValue: false },
  });

  const bridge = new SimpleSchema2Bridge(UserFormSchema);

  // On successful submit, insert the data.
  const submit = (data) => {
    console.log('submit');
    const { TA, RA } = data;
    console.log(data);

    let updateData = { id: _id };

    const collectionName = StudentProfiles.getCollectionName();
    updateData = { id: _id, TA, RA };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'User updated successfully', 'success');
      });
  };

  return (
    <Container className="py-3">
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
        <BoolField className="d-sm-inline" name="TA" inline />
        <BoolField className="d-sm-inline" name="RA" inline />
        <SubmitField className="d-sm-inline" value="Submit" />
      </AutoForm>
    </Container>
  );
};

export default StudentPositionItem;
