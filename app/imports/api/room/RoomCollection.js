import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseProfileCollection from '../user/BaseProfileCollection';

class RoomCollection extends BaseProfileCollection {
  constructor() {
    super('StudentProfile', new SimpleSchema({}));
  }

  /**
   * Defines a new Room.
   * @param roomNum the number of the room.
   * @param picture of the room.
   */
  define({ roomNum, picture }) {
    const docID = this._collection.insert({
      roomNum,
      picture,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param roomNum the new room number.
   * @param picture the new picture.
   */
  update(docID, { roomNum, picture }) {
    const updateData = {};
    if (roomNum) {
      updateData.roomNum = roomNum;
    }
    if (picture) {
      updateData.quantity = picture;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } roomNum A document or docID in this collection.
   * @returns true
   */
  removeIt(roomNum) {
    const doc = this.findDoc(roomNum);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * We will deal with this later, but kept it for now
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  /*
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
  /** Meteor.publish(stuffPublications.stuff, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });
*/
  /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
  /**
      Meteor.publish(stuffPublications.stuffAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  } */

  /**
   * Subscription method for stuff owned by the current user.

  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuff);
    }
    return null;
  }
*/
  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.

  subscribeStuffAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(stuffPublications.stuffAdmin);
    }
    return null;
  }
*/

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const roomNum = doc.roomNum;
    const picture = doc.picture;
    return { roomNum, picture };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Room = new RoomCollection();
