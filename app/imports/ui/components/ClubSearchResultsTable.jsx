import React, { useEffect, useState } from 'react';
import { Container, Form, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import ClubSearchResultsTableRow from './ClubSearchResultsTableRow';

const ClubSearchResultsTable = () => {

  const [filteredClubs, setFilteredClubs] = useState([]);
  const [clubName, setClubName] = useState('');
  const [clubWebsite, setClubWebsite] = useState('');
  const [clubDescription, setClubDescription] = useState('');

  const { ready, clubs } = useTracker(() => {
    const subscription = Clubs.subscribeClubs();
    const rdy = subscription.ready();
    const clubEntries = Clubs.find({}, { sort: { name: 1 } }).fetch();
    return {
      clubs: clubEntries,
      ready: rdy,
    };
  }, []);

  useEffect(() => {
    if (ready) {
      setFilteredClubs(clubs);
    }
  }, [ready]);

  useEffect(() => {
    let filtered = clubs;
    if (clubName) {
      filtered = filtered.filter(function (obj) { return obj.name.toLowerCase().includes(clubName.toLowerCase()); });
    }
    if (clubWebsite) {
      filtered = filtered.filter(function (obj) { return obj.website.includes(clubWebsite); });
    }
    if (clubDescription) {
      filtered = filtered.filter(function (obj) { return obj.description.toLowerCase().includes(clubDescription.toLowerCase()); });
    }

    setFilteredClubs(filtered);
  }, [clubName, clubWebsite, clubDescription]);
  return (ready ? (
    <Container className="py-3 search-results">
      <Form className="">
        <div className="row mb-2">
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by name">Name</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="name"
              onChange={e => setClubName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by xc">Club Website</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="club website"
              onChange={e => setClubWebsite(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="row mb-4">
          <Form.Group className="col-lg-6">
            <Form.Label htmlFor="Search by club description">Description</Form.Label>
            <Form.Control
              type="text"
              className="shadow-sm"
              placeholder="description keywords"
              onChange={e => setClubDescription(e.target.value)}
            />
          </Form.Group>
        </div>
      </Form>
      <Table striped bordered hover>
        <thead className="search-results-table-header">
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { filteredClubs && filteredClubs.length === 0 ? (<tr><td>-</td></tr>) : filteredClubs && filteredClubs.map((club) => <ClubSearchResultsTableRow key={club._id} club={club} />)}
        </tbody>
      </Table>
    </Container>
  ) : <LoadingSpinner message="Loading Clubs" />);
};
export default ClubSearchResultsTable;
