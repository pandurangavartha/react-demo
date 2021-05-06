import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class StudentEdit extends Component {

  emptyStudent = {
    firstname: '',
    subjects: '',
    age: '',
    address: '',
    copyrigtby: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyStudent
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const Student = await (await fetch(`/api/students/${this.props.match.params.id}`)).json();
      this.setState({item: Student});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/stdents', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/students');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Student' : 'Add Student'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstname">Name</Label>
            <Input type="text" name="firstname" id="firstname" value={item.firstname || ''}
                   onChange={this.handleChange} autoComplete="firstname"/>
          </FormGroup>
          <FormGroup>
            <Label for="subjects">subjects</Label>
            <Input type="text" name="subjects" id="subjects" value={item.subjects || ''}
                   onChange={this.handleChange} autoComplete="subjects"/>
          </FormGroup>          
          <FormGroup>
            <Label for="class">Class</Label>
            <Input type="text" name="class" id="class" value={item.class || ''}
                   onChange={this.handleChange} autoComplete="class"/>
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" value={item.address || ''}
                   onChange={this.handleChange} autoComplete="address"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/Students">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(StudentEdit);