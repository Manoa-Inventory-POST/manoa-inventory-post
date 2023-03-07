import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Room } from '../../api/room/RoomCollection';
import { Clubs } from '../../api/clubs/Clubs';
import { Interests } from '../../api/clubs/Interests';
import { OfficeProfiles } from '../../api/user/OfficeProfileCollection';
import { FacultyProfiles } from '../../api/user/FacultyProfileCollection';

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the database with a default data document.
function addRequest(data) {
  console.log(`  Adding: ${data.name} (${data.description}) `);
  OfficeProfiles.define(data);
}

// Initialize the database with a default data document.
function addRoom(data) {
  console.log(`  Adding: ${data.room} (${data.description}) ${data.building}`);
  Room.define(data);
}

function addInterest(data) {
  console.log(`  Adding: ${data.interest}`);
  Interests.define(data);
}

function addClub(data) {
  console.log(`  Adding: ${data.name}`);
  Clubs.define(data);
}

function addFaculty(data) {
  console.log(`  Adding: ${data.email}`);
  FacultyProfiles.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the StuffsCollection if empty.
if (OfficeProfiles.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addRequest(data));
  }
}

// Initialize the RoomsCollection if empty.
if (Room.count() === 0) {
  if (Meteor.settings.defaultRoomData) {
    console.log('Creating default room data.');
    Meteor.settings.defaultRoomData.map(data => addRoom(data));
  }
}

// Initialize the Interests if empty.
if (Interests.count() === 0) {
  if (Meteor.settings.defaultInterests) {
    console.log('Creating default interests.');
    Meteor.settings.defaultInterests.map(interests => addInterest(interests));
  }
}

// Initialize the ClubsCollection if empty.
if (Clubs.count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.map(clubs => addClub(clubs));
  }
}

if (FacultyProfiles.count() === 1) {
  if (Meteor.settings.defaultFacultys) {
    console.log('Creating default Facultys data.');
    Meteor.settings.defaultFacultys.map(data => addFaculty(data));
  }
}
