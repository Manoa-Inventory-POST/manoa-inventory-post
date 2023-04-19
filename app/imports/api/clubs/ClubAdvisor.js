import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const clubAdvisorPublications = {
  clubAdvisorPub: 'clubAdvisorPub',
};

class ClubAdvisorCollection extends BaseCollection {
  constructor() {
    super('ClubAdvisor', new SimpleSchema({
      advisor: String,
      club: String,
    }));
  }

  /**
   * Defines a new ClubAdvisor item.
   * @return {never} the docID of the new document.
   * @param advisor
   * @param club
   */
  define({ advisor, club }) {
    const docID = this._collection.insert({
      advisor,
      club,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param advisor the new advisor (optional).
   * @param club the new club (optional).
   * @returns never
   */
  update(docID, { advisor, club }) {
    const updateData = {};
    if (advisor) {
      updateData.advisor = advisor;
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
      // get the ClubAdvisor instance.
      const instance = this;
      // This subscription publishes CLubAdvisors
      Meteor.publish(clubAdvisorPublications.clubAdvisorPub, function publish() {
        return instance._collection.find({ });
      });
    }
  }

  /*
   * Subscription method for ClubAdvisor.
   */
  subscribeClubAdvisor() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubAdvisorPublications.clubAdvisorPub);
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
   * @return {{advisor: *, club: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const advisor = doc.advisor;
    const club = doc.club;
    return { advisor, club };
  }

  /**
   * Checks the ClubAdvisor collection to see if an inputted Club Advisor already exists.
   * @param advisor
   * @param club
   * @return true
   * @return false
   */
  checkExists(advisor) {
    const instances = this.find({ advisor }, {}).count();
    if (instances === 0) {
      return false;
    }
    console.log("true!");
    return true;
  }
}

/*
 * Provides the singleton instance of this class to all other entities.
 */
export const ClubAdvisor = new ClubAdvisorCollection();
