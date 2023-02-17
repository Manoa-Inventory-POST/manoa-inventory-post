import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userClubsPublications = {
  userClubsPub: 'userClubsPub',
  userClubsPubAdmin: 'userClubsPubAdmin',
};

class UserClubsCollection extends BaseCollection {
  constructor() {
    super('UserClubs', new SimpleSchema({
      profile: String,
      club: String,
    }));
  }

  /**
   * Defines a new UserClubs item.
   * @return {String} the docID of the new document.
   * @param profile
   * @param club
   */
  define({ profile, club }) {
    const docID = this._collection.insert({
      profile,
      club,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param profile the new profile (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { profile, club }) {
    const updateData = {};
    if (profile) {
      updateData.profile = profile;
    }
    if (club) {
      updateData.club = club;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged-in user */
      Meteor.publish(userClubsPublications.userClubsPub, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userClubsPublications.userClubsPubAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeUserClubs() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userClubsPublications.userClubsPub);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserClubsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userClubsPublications.userClubsPub);
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
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT, ROLE.ADVISOR]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return { profile, club}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const profile = doc.profile;
    const club = doc.club;
    return { profile, club };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserClubs = new UserClubsCollection();