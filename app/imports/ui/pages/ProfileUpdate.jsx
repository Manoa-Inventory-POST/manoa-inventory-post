import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import LoadingSpinner from '../components/LoadingSpinner';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';
import { Phone } from '../../api/room/Phone';
import { Clubs } from '../../api/clubs/Clubs';
import { Room } from '../../api/room/RoomCollection';
import { ClubAdvisor } from '../../api/clubs/ClubAdvisor';
import { Interests } from '../../api/clubs/Interests';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { StudentProfiles } from '../../api/user/StudentProfileCollection';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { ITSupportProfiles } from '../../api/user/ITSupportProfileCollection';
import { OccupantRoom } from '../../api/room/OccupantRoom';
import ProfileCard from '../components/ProfileCard';
import ProfileCardStudent from '../components/ProfileCardStudent';
import ProfileCardFaculty from '../components/ProfileCardFaculty';
import { UserInterests } from '../../api/clubs/UserInterests';
import { UserClubs } from '../../api/clubs/UserClubs';

/* Subscribe each collection and make a userToUpdate, and render the basic information. */
const ProfileUpdate = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, roomValues, userToUpdate, interestNames, clubNames, clubIDs } = useTracker(() => {
    // Get access to documents
    const subPhone = Phone.subscribePhone();
    const subClubs = Clubs.subscribeClubs();
    const subscriptionRooms = Room.subscribeRoom();
    const subClubAdvisor = ClubAdvisor.subscribeClubAdvisor();
    const subInterests = Interests.subscribeInterests();
    const subUserInterests = UserInterests.subscribeUserInterests();
    const subUserClubs = UserClubs.subscribeUserClubs();
    const subUser = UserProfiles.subscribe();
    const subAdmin = AdminProfiles.subscribe();
    const subFaculty = FacultyProfiles.subscribeFaculty();
    const subStudent = StudentProfiles.subscribe();
    const subOffice = OfficeProfiles.subscribe();
    const subIT = ITSupportProfiles.subscribe();
    const subOccRoom = OccupantRoom.subscribeOccupantRoom();
    const rdy = subscriptionRooms.ready() && subClubAdvisor.ready() && subInterests.ready() && subClubs.ready()
        && subUser.ready() && subAdmin.ready() && subFaculty.ready() && subStudent.ready() && subOffice.ready()
        && subIT.ready() && subOccRoom.ready() && subPhone.ready() && subUserInterests.ready() && subUserClubs.ready();
    const docUser = UserProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docAdmin = AdminProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docFaculty = FacultyProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docStudent = StudentProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docOffice = OfficeProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    const docIT = ITSupportProfiles.find({ userID: Meteor.user()._id }, {}).fetch();
    let userProfile;

    const addAdvisor = () => {
      // attach advisor
      const advisor = `${userProfile.firstName} ${userProfile.lastName}`;
      // console.log(advisor);
      let clubArr = ClubAdvisor.find({ advisor: advisor }, {}).fetch();
      const clubAdvisorIds = clubArr.map(Item => Item._id);
      userProfile.clubAdvisorIds = clubAdvisorIds;
      // console.log(clubArr);
      clubArr = clubArr.map(item => item.club);
      // console.log(clubArr);
      if (clubArr.length > 0) {
        userProfile.clubAdvisor = true;
      } else {
        userProfile.clubAdvisor = false;
      }
    };
    const addPhone = () => {
      // attach phone
      let phoneArr = Phone.find({ email: userProfile.email }, {}).fetch();
      const phoneIdArr = phoneArr.map(item => item._id);
      phoneArr = phoneArr.map(item => item.phoneNum);
      if (phoneArr.length === 1) {
        phoneArr = phoneArr[0];
      } else {
        phoneArr = phoneArr.join(', ');
      }
      userProfile.phones = phoneArr;
      userProfile.phoneIds = phoneIdArr;
    };
    const addOffice = () => {
      // add office
      let roomArr = OccupantRoom.find({ email: userProfile.email }, {}).fetch();
      const occRoomIdArr = roomArr.map(obj => obj._id);
      // console.log(occRoomIdArr);
      roomArr = roomArr.map(item => item.room);
      roomArr = roomArr.map(item => item.split(' '));
      roomArr = roomArr.map(item => ((item.length > 1) ? item[1] : item[0]));
      roomArr = roomArr[0];
      userProfile.office = roomArr;
      userProfile.occupantRoomIds = occRoomIdArr;
      // console.log(userProfile.office);
    };
    const addInterest = () => {
      let interestsArr = UserInterests.find({ email: userProfile.email }, {}).fetch();
      // console.log(interestsArr);
      const interestsIdArr = interestsArr.map(item => item._id);
      interestsArr = interestsArr.map(item => item.interest);
      // console.log(interestsArr);
      userProfile.interests = interestsArr;
      userProfile.interestIds = interestsIdArr;
    };

    const addClub = () => {
      let clubsArr = UserClubs.find({ email: userProfile.email }, {}).fetch();
      // console.log(clubsArr);
      const clubsIdArr = clubsArr.map(item => item._id);
      clubsArr = clubsArr.map(item => item.club);
      // console.log(clubsArr);
      userProfile.clubs = clubsArr;
      userProfile.clubIds = clubsIdArr;
    };

    if (docUser.length > 0) {
      userProfile = docUser[0];
      addPhone(userProfile);
    } else if (docAdmin.length > 0) {
      userProfile = docAdmin[0];
      addPhone(userProfile);
    } else if (docFaculty.length !== 0) {
      userProfile = docFaculty[0];
      console.log('facultyProfile:');
      console.log(userProfile);
      addOffice();
      addPhone();
      addAdvisor();
    } else if (docStudent.length > 0) {
      userProfile = docStudent[0];
      addInterest();
      addClub();
      addPhone();
      console.log('studentProfile:');
      console.log(userProfile);
    } else if (docOffice.length > 0) {
      userProfile = docOffice[0];
      console.log('officeProfile:');
      console.log(userProfile);
      addPhone();
    } else if (docIT.length > 0) {
      userProfile = docIT[0];
      addPhone();
    } else {
      console.log('user not found');
    }
    const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
    const interestEntries = Interests.find({}, {}).fetch();
    const clubEntries = Clubs.find({}, {}).fetch();

    console.log(clubEntries);
    return {
      userToUpdate: userProfile,
      roomValues: roomEntries.map(Item => Item.room),
      interestNames: interestEntries.map(Item => Item.interest),
      clubNames: clubEntries.map(Item => Item.name),
      clubIDs: clubEntries.map(Item => Item._id),

      ready: rdy,
    };
  }, []);

  console.log(roomValues, interestNames, clubNames, ready, clubIDs);
  const UserProfileSchema = new SimpleSchema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    clubAdvisorIds: { type: Array, optional: true },
    'clubAdvisorIds.$': { type: String, optional: true },
    phoneIds: { type: Array, optional: true },
    'phoneIds.$': { type: String, optional: true },
    occupantRoomIds: { type: Array, optional: true },
    'occupantRoomIds.$': { type: String, optional: true },
    role: { type: String, optional: true },
    office: { type: String, label: 'Office(s)', defaultValue: 'N/A', optional: true },
    phones: { type: String, label: 'Phone Numbers', defaultValue: 'N/A', optional: true },
    officeHours: { type: String, defaultValue: 'N/A', optional: true },
    emergencyPhone: { type: String, defaultValue: 'N/A', optional: true },
    emergencyEmail: { type: String, defaultValue: 'N/A', optional: true },
    picture: { type: String, optional: true },
    position: { type: String, defaultValue: 'N/A', optional: true },
    TA: { type: Boolean, label: 'TA', defaultValue: false },
    RA: { type: Boolean, label: 'RA', defaultValue: false },
    graduate: { type: Boolean, defaultValue: false },
    undergraduate: { type: Boolean, defaultValue: false },
    clubAdvisor: { type: Boolean, defaultValue: false },
    clubs: { type: Array, label: 'Clubs', optional: true },
    'clubs.$': { type: String, allowedValues: clubNames, optional: true },
    clubIds: { type: Array, optional: true },
    'clubIds.$': { type: String, optional: true },
    interests: { type: Array, label: 'Interests', optional: true },
    'interests.$': { type: String, allowedValues: interestNames, optional: true },
    interestIds: { type: Array, optional: true },
    'interestIds.$': { type: String, optional: true },
  });

  const bridge = new SimpleSchema2Bridge(UserProfileSchema);

  if (ready) {
    switch (userToUpdate.role) {
    case 'FACULTY':
      return (<ProfileCardFaculty userToUpdate={userToUpdate} bridge={bridge} />);
    case 'STUDENT':
      return (<ProfileCardStudent userToUpdate={userToUpdate} bridge={bridge} />);
    default:
      return (<ProfileCard userToUpdate={userToUpdate} bridge={bridge} />);
    }
  } else {
    return <LoadingSpinner />;
  }
};

export default ProfileUpdate;
