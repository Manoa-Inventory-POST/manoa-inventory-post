import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// Collections for the Admin role (based on code we have written for ICS 314).
class StudentCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudentCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, index: true, unique: true },
      TA: { type: Boolean, defaultValue: false },
      RA: { type: Boolean, defaultValue: false },
      Undergraduate: { type: Boolean, defaultValue: false },
      Graduate: { type: Boolean, defaultValue: false },
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Faculty = new StudentCollection();
