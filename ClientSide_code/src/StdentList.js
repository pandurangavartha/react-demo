import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Pagination from './pagination';
import { Link } from 'react-router-dom';

class StudentList extends Component {

  constructor(props) {
    super(props);
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
    this.state = {
      Students: [],pageOfItems:[],isRun:false, isLoading: true, name: false, subjects: false, class: false, address: false, exampleItems: exampleItems,
    };
    this.remove = this.remove.bind(this);
    // this.onChangePage = this.onChangePage.bind(this);
    this.filterList = this.filterList.bind(this)
  }

  onChangePage = (pageOfItems,page) =>{
    // update state with new page of items
    console.log('=====pageOfItems======',page)
    // if(page && this.state.isRun === false){
    this.setState({ pageOfItems: pageOfItems,isRun:true });
    // }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.defaultGetApi()
  }

  defaultGetApi=()=>{
    fetch('api/v1/students/')
    .then(response => response.json())
    .then(data => this.setState({ Students: data, isLoading: false }));
  }

  async remove(id) {
    await fetch(`/api/v1/students/${id}`, {
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
    console.log("==this.state.Students==",this.state.Students,"====",key)
    let data ;
      data= this.state.Students.sort((a, b) => {
        console.log("-----------",a,b,key)
        let x = a[key].toUpperCase(),
          y = b[key].toUpperCase();
        console.log("==",x, y,this.state[key]);
        if (this.state[key]) {
          return x === y ? 0 : x > y ? 1 : -1;
        } else {
          return  -1;
        }
      })
    
    await this.setState({ Students:data});
  };

  Setfirst_order = async (value) => {
    this.setState({ value: !this.state[value] })
  }

  onChange = async(event) =>{
    const q = event.target.value.toLowerCase();
    if(q){
    this.setState({ q }, () => this.filterList());
    }else{
      this.setState({ q })
      this.defaultGetApi()
    }
  }

  filterList = async(query)=> {
    console.log('=qq=123==')
    let Students = this.state.Students;
    let q = this.state.q;
    Students = Students.filter(function (user) {
      return user.name.toLowerCase().indexOf(q) != -1; // returns true or false
    });
    this.setState({ Students: Students });
  }

  render() {
    console.log("==================")
    const { pageOfItems, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const StudentList = pageOfItems.map(Student => {
      return <tr key={Student.id}>
        <td>{Student.id}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{Student.name}</td>
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
            <Button color="success" tag={Link} to="/students/new">Add Student</Button>
          </div>
          {/* search student list*/}
          <div className="float">
            <input
              type="text"
              placeholder="Search"
              value={this.state.q}
              onChange={this.onChange}
              style={{width:'90%'}}
            />
          </div>
          {/* student list*/}
          <h3>Student List</h3>
          <Table className="mt-4">
            <thead>
              {/* student Sorting*/}
              <tr>
                <th width="20%" onClick={() => {
                  this.sorting("name");
                  this.Setfirst_order('name');
                }}>Firstname</th>
                <th width="20%" onClick={() => {
                  this.sorting("subjects");
                  this.Setfirst_order('subjects');
                }}>Subjects</th>
                <th width="10%" onClick={() => {
                  this.sorting("class");
                  this.Setfirst_order('class');
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
            {/* {this.state.Students.map(item =>
              <div key={item.id}>{item.name}</div>
            )} */}
            <Pagination items={this.state.Students}  onChangePage={this.onChangePage} />
          </div>
        </Container>
      </div>
    );
  }
}

export default StudentList;