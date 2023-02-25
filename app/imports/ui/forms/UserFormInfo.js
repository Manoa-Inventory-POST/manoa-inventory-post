import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Room } from '../../api/room/RoomCollection';
import { Clubs } from '../../api/clubs/Clubs';

const profileRoleValues = ['ADMIN', 'USER', 'STUDENT', 'FACULTY', 'OFFICE', 'ITSUPPORT', 'ADVISOR'];

const { rooms } = useTracker(() => {
  const subscription = Room.subscribeRoom();
  const rdy = subscription.ready();
  const roomEntries = Room.find({}, { sort: { num: 1 } }).fetch();
  console.log(roomEntries, rdy);
  return {
    rooms: roomEntries,
  };
});

function getRoomNum(room) {
  return room.num;
}

const roomValues = rooms.map(getRoomNum);

const { clubs } = useTracker(() => {
  const subscription = Clubs.subscribeClubs();
  const rdy = subscription.ready();
  const clubEntries = Clubs.find({}, { sort: { name: 1 } }).fetch();
  console.log(clubEntries, rdy);
  return {
    clubs: clubEntries,
  };
});

function getClubNum(club) {
  return club.num;
}

const clubValues = clubs.map(getClubNum());

const UserFormSchema = new SimpleSchema({
  email: String,
  firstName: String,
  lastName: String,
  role: { type: String, allowedValues: profileRoleValues },
  room: { type: String, allowedValues: roomValues },
  TA: { type: Boolean, defaultValue: false },
  RA: { type: Boolean, defaultValue: false },
  graduate: { type: Boolean, defaultValue: false },
  undergraduate: { type: Boolean, defaultValue: false },
  clubAdvisor: { type: Boolean, defaultValue: false },
  club: { type: String, allowedValues: clubValues },
});

export { UserFormSchema, profileRoleValues };
