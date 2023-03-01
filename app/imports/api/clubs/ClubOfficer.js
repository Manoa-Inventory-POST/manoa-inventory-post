import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const clubOfficerPublications = {
  clubOfficerPub: 'clubOfficerPub',
};

class ClubOfficerCollection extends BaseCollection {
  constructor() {
    super('ClubOfficer', new SimpleSchema({
      officer: String,
      club: String,
    }));
  }

  /**
   * Defines a new ClubOfficer item.
   * @return {String} the docID of the new document.
   * @param officer
   * @param club
   */
  define({ officer, club }) {
    const docID = this._collection.insert({
      officer,
      club,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param officer the new officer (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { officer, club }) {
    const updateData = {};
    if (officer) {
      updateData.officer = officer;
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

  /*
   * Default publication method for entities.
   * It publishes the entire collection for users.
   */
  publish() {
    if (Meteor.isServer) {
      // get the ClubOfficer instance.
      const instance = this;
      Meteor.publish(clubOfficerPublications.clubOfficerPub, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /*
   * Subscription method for ClubOfficer.
   */
  subscribeClubOfficer() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubOfficerPublications.clubOfficerPub);
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
   * @return { officer, club}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const officer = doc.officer;
    const club = doc.club;
    return { officer, club };
  }

  /**
   * Searches for a club with a given officer. If club exists, returns the array of clubs. Else,
   * there is no club.
   * @param officer an officer.
   * @returns { Object } Array of clubs.
   */
  getClub(officer) {
    const clubs = this.find({ officer }).fetch();
    if (clubs.isEmpty()) {
      return [];
    }
    return clubs;
  }

  /**
   * Searches for an officer with a given club. If officer exists, returns the array of officers.
   * Else, there are no officers.
   * @param club a club.
   * @returns { Object } Array of officers.
   */
  getOfficer(club) {
    const officers = this.find({ club }).fetch();
    if (officers.isEmpty()) {
      return [];
    }
    return officers;
  }
}

/*
 * Provides the singleton instance of this class to all other entities.
 */
export const ClubOfficer = new ClubOfficerCollection();
