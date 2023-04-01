import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { Interests } from './Interests';

export const clubInterestsPublications = {
  clubInterestsPub: 'clubInterestsPub',
};

class ClubInterestsCollection extends BaseCollection {
  constructor() {
    super('ClubInterests', new SimpleSchema({
      club: String,
      interest: String,
    }));
  }

  /**
   * Defines a new ClubInterests item.
   * @return {never} the docID of the new document.
   * @param interest
   * @param club
   */
  define({ club, interest }) {
    if (!Interests.checkExists(interest)) {
      Interests.define({ interest });
    }
    const docID = this._collection.insert({
      club,
      interest,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param interest the new interest (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { club, interest }) {
    const updateData = {};
    if (club) {
      updateData.club = club;
    }
    if (interest) {
      updateData.interest = interest;
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
   * It publishes the entire collection for users
   */
  publish() {
    if (Meteor.isServer) {
      // get the ClubInterests instance.
      const instance = this;
      // This subscription publishes ClubInterests.
      Meteor.publish(clubInterestsPublications.clubInterestsPub, function publish() {
        return instance._collection.find({ });
      });
    }
  }

  /*
   * Subscription method for CLubInterests.
   */
  subscribeClubInterests() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubInterestsPublications.clubInterestsPub);
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
   * @return { interest, club}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const interest = doc.interest;
    const club = doc.club;
    return { interest, club };
  }

  /**
   * Searches for a club with a given interest. If club exists, returns the array of clubs. Else,
   * there is no club.
   * @param interest an interest.
   * @returns { Object } Array of clubs.
   */
  getClub(interest) {
    const clubs = this.find({ interest }).fetch();
    if (clubs.isEmpty()) {
      return [];
    }
    return clubs;
  }

  /**
   * Searches for an interest with a given club. If interest exists, returns the array of interests.
   * Else, there are no interests.
   * @param club a club.
   * @returns { Object } Array of interests.
   */
  getInterest(club) {
    const interests = this.find({ club }).fetch();
    if (interests.isEmpty()) {
      return [];
    }
    return interests;
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const ClubInterests = new ClubInterestsCollection();
