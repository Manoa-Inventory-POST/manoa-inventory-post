import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ReservationsCollection. It encapsulates state and variable values for requests.
 */
class ReservationsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReservationsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      room: String,
      startTime: String,
      endTime: String,
      recurringMeeting: String,
      attendance: Number,
      usage: String,
      designatedAdvisor: String,
      applicantId: String,
      createdAt: Date,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ContactsCollection.
 * @type {ContactsCollection}
 */
export const ReservationForm = new ReservationsCollection();
