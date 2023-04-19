import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const frequency = ['one-time', 'daily', 'weekly', 'biweekly', 'monthly'];

export const reservationPublications = {
  reservation: 'reservation',
};

class ReservationsCollection extends BaseCollection {
  constructor() {
    super('ReservationForm', new SimpleSchema({
      room: String,
      startTime: Date,
      endTime: Date,
      recurringMeeting: {
        type: String,
        allowedValues: frequency,
        defaultValue: 'one-time',
      },
      attendance: Number,
      usage: String,
      designatedAdvisor: String,
      applicantId: String,
      createdAt: Date,
    }));
  }

  /**
   * Defines a new reservation item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ room, startTime, endTime, recurringMeeting, attendance, usage, designatedAdvisor, applicantId, createdAt }) {
    const docID = this._collection.insert({
      room,
      startTime,
      endTime,
      recurringMeeting,
      attendance,
      usage,
      designatedAdvisor,
      applicantId,
      createdAt,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { room, startTime, endTime, recurringMeeting, attendance, usage, designatedAdvisor }) {
    const updateData = {};
    updateData.room = room;
    updateData.startTime = startTime;
    updateData.endTime = endTime;
    updateData.recurringMeeting = recurringMeeting;
    updateData.usage = usage;
    updateData.designatedAdvisor = designatedAdvisor;

    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(attendance)) {
      updateData.quantity = attendance;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(applicant) {
    const doc = this.findDoc(applicant);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the reservation associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ReservationsCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(reservationPublications.reservation, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for reservation owned by the current user.
   */
  subscribeReservation() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reservationPublications.reservation);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeReservationAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(reservationPublications.reservationAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const room = doc.room;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    const usage = doc.usage;
    const recurringMeeting = doc.recurringMeeting;
    const attendance = doc.attendance;
    const designatedAdvisor = doc.designatedAdvisor;
    const applicantId = doc.applicantId;
    const createdAt = doc.applicantId;
    return { room, startTime, endTime, recurringMeeting, attendance, usage, designatedAdvisor, applicantId, createdAt };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const ReservationForm = new ReservationsCollection();
