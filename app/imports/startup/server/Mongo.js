import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Room } from '../../api/room/RoomCollection';
import { Clubs } from "../../api/clubs/Clubs";
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the database with a default data document.
function addRoom(data) {
  console.log(`  Adding: ${data.num} (${data.description})`);
  Room.define(data);
}

function addClub(data) {
  console.log(`Adding: ${data.name}`);
  Clubs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the RoomsCollection if empty.
if (Room.count() === 0) {
  if (Meteor.settings.defaultRoomData) {
    console.log('Creating default room data.');
    Meteor.settings.defaultRoomData.map(data => addRoom(data));
  }
}

// Initialize the ClubsCollection if empty.
if (Clubs.count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default clubs.');
    Meteor.settings.defaultClubs.map(clubs => addClub(clubs));
  }
}
