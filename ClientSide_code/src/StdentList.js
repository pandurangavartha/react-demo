import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

class StudentList extends Component {

  constructor(props) {
    super(props);
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
    this.state = {
      Students: [], isLoading: true, first_name: false, Subjects: false, Class: false, address: false, exampleItems: exampleItems,
    };
    this.remove = this.remove.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ Students: pageOfItems });
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('api/v1/students/')
      .then(response => response.json())
      .then(data => this.setState({ Students: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/students/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedStudents = [...this.state.Students].filter(i => i.id !== id);
      this.setState({ Students: updatedStudents });
    });
  }

  sorting = async (key) => {
    data = {
      data: data.data.sort((a, b) => {
        let x = a[key].toUpperCase(),
          y = b[key].toUpperCase();
        console.log(x, y);
        if (first_order) {
          return x === y ? 0 : x > y ? 1 : -1;
        } else {
          return x === y ? 0 : y > x ? 1 : -1;
        }
      })
    };
    await Setdata(data);
  };

  Setfirst_order = async (value) => {
    this.setState({ value: !this.state[value] })
  }

  onChange(event) {
    const q = event.target.value.toLowerCase();
    this.setState({ q }, () => this.filterList());
  }

  filterList() {
    let Students = this.state.Students;
    let q = this.state.q;
    Students = Students.filter(function (user) {
      return user.name.toLowerCase().indexOf(q) != -1; // returns true or false
    });
    this.setState({ Students: Students });
  }

  render() {
    const { Students, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const StudentList = Students.map(Student => {
      return <tr key={Student.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{Student.firstname}</td>
        <td>{Student.subjects}</td>
        <td>{Student.class}</td>
        <td>{Student.address}</td>
        <td><a href={Student.copyright}>{Student.copyright}</a></td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/students/" + Student.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(Student.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          {/* Add  new student*/}
          <div className="float-right">
            <Button color="success" tag={Link} to="/Students/new">Add Student</Button>
          </div>
          {/* search student list*/}
          <div>
            <input
              type="text"
              placeholder="Search"
              value={this.state.q}
              onChange={this.onChange}
            />
          </div>
          {/* student list*/}
          <h3>Student List</h3>
          <Table className="mt-4">
            <thead>
              {/* student Sorting*/}
              <tr>
                <th width="20%" onClick={() => {
                  this.sorting("first_name");
                  this.Setfirst_order('first_name');
                }}>Firstname</th>
                <th width="20%" onClick={() => {
                  this.sorting("Subjects");
                  this.Setfirst_order('Subjects');
                }}>Subjects</th>
                <th width="10%" onClick={() => {
                  this.sorting("Class");
                  this.Setfirst_order('Class');
                }}>Class</th>
                <th onClick={() => {
                  this.sorting("address");
                  this.Setfirst_order('address');
                }}>Address</th>
                <th width="10%">Actions</th>
              </tr>
            </thead>
            <tbody>
              {StudentList}
            </tbody>
          </Table>

          <div className="text-center">
            <h1>Pagination </h1>
            {this.state.Students.map(item =>
              <div key={item.id}>{item.name}</div>
            )}
            <Pagination items={this.state.Students} onChangePage={this.onChangePage} />
          </div>
        </Container>
      </div>
    );
  }
}

export default StudentList;