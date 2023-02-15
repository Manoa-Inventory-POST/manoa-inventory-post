import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Room } from '../../api/room/RoomCollection';
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

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

// Initialize the StuffsCollection if empty.
if (Room.count() === 0) {
  if (Meteor.settings.defaultRoomData) {
    console.log('Creating default room data.');
    Meteor.settings.defaultRoomData.map(data => addRoom(data));
  }
}
