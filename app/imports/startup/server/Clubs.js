/*

import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/clubs/Clubs';

if ((Meteor.settings.loadAssetsFile) && (Clubs.find().count() === 0)) {
  console.log('Creating default clubs');
  // Roles.createRole('user', { unlessExists: true });
  // Roles.createRole('club-admin', { unlessExists: true });
  // Roles.createRole('admin', { unlessExists: true });
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  console.log('Creating the default profiles');
  jsonData.defaultClubs.map(club => addClub(club));
  console.log('Creating the default clubs');
  jsonData.defaultClubs.map(club => addClubs(club));
}
*/