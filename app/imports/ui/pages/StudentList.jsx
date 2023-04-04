import React from 'react';
import { Container } from 'react-bootstrap';
import StudentListTable from '../components/StudentListTable';
import { PAGE_IDS } from '../utilities/PageIDs';

const StudentList = () => (
  <Container id={PAGE_IDS.STUDENT_SEARCH}>
    <h1 className="text-center">Student List</h1>
    <StudentListTable />
  </Container>
);

export default StudentList;
