import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { ClubInterests } from './ClubInterests';

export const clubsPublications = {
  clubsPub: 'clubsPub',
  clubsPubAdmin: 'clubsPubAdmin',
};

class ClubsCollection extends BaseCollection {
  constructor() {
    super('Clubs', new SimpleSchema({
      name: { type: String, index: true, unique: true },
      website: { type: String, optional: true },
      description: String,
      picture: { type: String, optional: true, defaultValue: 'https://icemhh.pbrc.hawaii.edu/wp-content/uploads/2021/11/UHM.png' },
    }));
  }

  /**
   * Defines a new Clubs item.
   * @return {never} the docID of the new document.
   * @param name
   * @param website
   * @param description
   * @param picture
   */
  define({ name, website, description, picture, interests }) {
    const docID = this._collection.insert({
      name,
      website,
      description,
      picture,
    });
    interests.forEach((interest) => ClubInterests.define({ interest, name }));
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param description the new description (optional).
   * @param website the new status (optional).
   * @param picture the new picture (optional).
   * @returns never
   */
  update(docID, { description, website, picture }) {
    const updateData = {};
    if (description) {
      updateData.description = description;
    }
    if (website) {
      updateData.website = website;
    }
    if (picture) {
      updateData.picture = picture;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in
   * this collection.
   * @param { String | Object } num A document or docID in this collection.
   * @returns true
   */
  removeIt(num) {
    const doc = this.findDoc(num);
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
      Meteor.publish(clubsPublications.clubsPub, function publish() {
        if (this.userId) {
          const usernum = Meteor.users.findOne(this.userId).usernum;
          return instance._collection.find({ owner: usernum });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(clubsPublications.clubsPubAdmin, function publish() {
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
  subscribeClubs() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubsPublications.clubsPub);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeClubsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(clubsPublications.clubsPub);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an
   * Admin or User. This is used in to define, update, and removeIt Meteor methods associated with
   * each class.
   * @param userId The userId of the logged-in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged-in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER, ROLE.STUDENT, ROLE.OFFICE, ROLE.FACULTY, ROLE.ITSUPPORT, ROLE.ADVISOR]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the
   * restoreOne or define function.
   * @param docID
   * @return {{name: *, description: *, website: *, picture: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    const website = doc.website;
    const picture = doc.picture;
    return { name, description, website, picture };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */

export const Clubs = new ClubsCollection();
