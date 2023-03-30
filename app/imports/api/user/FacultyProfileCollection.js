import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import BaseProfileCollection from './BaseProfileCollection';
import { ROLE } from '../role/Role';
import { Users } from './UserCollection';
import { OccupantRoom } from '../room/OccupantRoom';
import { Phone } from '../room/Phone';
import { ClubAdvisor } from '../clubs/ClubAdvisor';

export const facultyPublications = {
  facultyP: 'facultyP',
};

class FacultyProfileCollection extends BaseProfileCollection {
  constructor() {
    super('FacultyProfile', new SimpleSchema({
      officeHours: { type: String, optional: true, defaultValue: 'N/A' },
      picture: { type: String, optional: true, defaultValue: 'https://icemhh.pbrc.hawaii.edu/wp-content/uploads/2021/11/UHM.png' },
      position: { type: String, optional: true, defaultValue: 'Other' },
    }));
  }

  /**
   * Defines the profile associated with a User and the associated Meteor account.
   * @param email The email associated with this profile. Will be the username.
   * @param picture The user's profile picture
   * @param position The user's position.
   * @param password The password for this user.
   * @param firstName The first name.
   * @param lastName The last name.
   * @param room An array of rooms.
   * @param phone An array of phone numbers.
   */
  define({ email, firstName, lastName, officeHours, position, picture, password, rooms, phones }) {
    // if (Meteor.isServer) {
    const username = email;
    const user = this.findOne({ email, firstName, lastName, officeHours, position, picture });
    if (!user) {
      const role = ROLE.FACULTY;
      const userID = Users.define({ username, role, password });
      const profileID = this._collection.insert({ email, firstName, lastName, officeHours, position, picture, userID, role });
      if (rooms) {
        rooms.forEach((room) => OccupantRoom.define({ email, room }));
      }
      if (phones) {
        // checks if phones exist
        phones.forEach(phoneNum => {
          // if exists, update
          if (Phone.checkExists(phoneNum)) {
            const phoneID = Phone.findDoc({ phoneNum })._id;
            Phone.update(phoneID, { email });
            // else, define new phone
          } else {
            Phone.define({ email, phoneNum });
          }
        });
      }
      // this._collection.update(profileID, { $set: { userID } });
      return profileID;
    }
    return user._id;
    // }
    // return undefined;
  }

  /**
   * Updates the UserProfile. You cannot change the email or role.
   * @param docID the id of the UserProfile
   * @param firstName new first name (optional).
   * @param lastName new last name (optional).
   * @param officeHours new office hours (optional).
   * @param position new position (optional).
   * @param picture new picture (optional).
   */
  update(docID, { firstName, lastName, email, officeHours, position, picture, phones, phoneIds, clubs, clubAdvisorIds, clubAdvisor, rooms, occupantRoomIds }) {
    this.assertDefined(docID);
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (officeHours) {
      updateData.officeHours = officeHours;
    }
    if (position) {
      updateData.position = position;
    }
    if (picture) {
      updateData.picture = picture;
    }
    if (phones) {
      // remove all
      phoneIds.forEach(id => {
        Phone.removeIt(id);
      });
      // re-create all phones
      for (let i = 0; i < phones.length; i++) {
        // if exists, update
        const phoneNum = phones[i];
        if (Phone.checkExists(phoneNum)) {
          const phoneID = Phone.findDoc({ phoneNum })._id;
          Phone.update(phoneID, { email });
          // else, define new phone
        } else {
          Phone.define({ email, phoneNum });
        }
      }
    }
    // remove all clubAdvisor entries
    clubAdvisorIds.forEach(id => {
      ClubAdvisor.removeIt(id);
    });
    // re-create if clubAdvisor
    if (clubAdvisor) {
      // re-create all clubs
      for (let i = 0; i < clubs.length; i++) {
        // if exists, update
        const club = clubs[i];
        const advisor = `${firstName} ${lastName}`;
        if (!ClubAdvisor.checkExists(advisor, club)) {
          ClubAdvisor.define({ advisor, club });
        }
      }
    }
    if (rooms) {
      // remove all
      occupantRoomIds.forEach(id => {
        OccupantRoom.removeIt(id);
      });
      // re-create all rooms
      for (let i = 0; i < rooms.length; i++) {
        // if exists, update
        const room = rooms[i];
        if (!OccupantRoom.checkExists(email, room)) {
          OccupantRoom.define({ email, room });
        }
      }
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes this profile, given its profile ID.
   * Also removes this user from Meteor Accounts.
   * @param profileID The ID for this profile object.
   */
  removeIt(profileID) {
    if (this.isDefined(profileID)) {
      return super.removeIt(profileID);
    }
    return null;
  }

  /**
   * TODO CAM: Update this documentation since we want to be able to sign up new users.
   * Implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod() {
    // this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
    return true;
  }

  /**
   * Returns an array of strings, each one representing an integrity problem with this collection.
   * Returns an empty array if no problems were found.
   * Checks the profile common fields and the role..
   * @returns {Array} A (possibly empty) array of strings indicating integrity issues.
   */
  checkIntegrity() {
    const problems = [];
    this.find().forEach((doc) => {
      if (doc.role !== ROLE.FACULTY) {
        problems.push(`UserProfile instance does not have ROLE.USER: ${doc}`);
      }
    });
    return problems;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the faculty associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the FacultyProfileCollection instance.
      const instance = this;
      // This subscription publishes only the documents associated with the logged-in user
      Meteor.publish(facultyPublications.facultyP, function publish() {
        return instance._collection.find();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeFaculty() {
    if (Meteor.isClient) {
      return Meteor.subscribe(facultyPublications.facultyP);
    }
    return null;
  }

  /**
   * Returns an object representing the UserProfile docID in a format acceptable to define().
   * @param docID The docID of a UserProfile
   * @returns {{firstName: *, lastName: *, position: *, picture: *, email: *}} An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const email = doc.email;
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const position = doc.position;
    const picture = doc.picture;
    return { email, firstName, lastName, position, picture }; // CAM this is not enough for the define method. We lose the password.
  }

  /**
   * Searches for a User ID. If ID exists, returns the User Object. Else, there is no profile.
   * @returns { Object } A profile.
   */
  getData() {
    const profile = this.find({ userID: Meteor.userID }).fetch();
    if (profile.isEmpty()) {
      return [];
    }
    return profile[0];
  }

}

/**
 * Profides the singleton instance of this class to all other entities.
 * @type {FacultyProfileCollection}
 */
export const FacultyProfiles = new FacultyProfileCollection();
