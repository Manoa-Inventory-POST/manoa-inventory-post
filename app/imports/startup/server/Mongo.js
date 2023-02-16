import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
// import { Clubs } from
/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/*
// Initialize the ClubsCollection if empty.
if (Clubs.count() === 0) {
  if (Meteor.settings.defaultClubs) {
    console.log('Creating default data.');
    Meteor.settings.defaultClubs.map(clubs => addClubs(clubs));
  }
}
 */