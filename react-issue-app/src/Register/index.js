import React, { Component } from 'react';
import { Form, Label, Button, Message } from 'semantic-ui-react';

class Register extends Component {
	constructor() {
		super();

		this.state = {
			name: '',
			department: '',
			email: '',
			password: ''
		}
	}


	
	// Handling of form value change
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	// Submission of register in form
	handleSubmit = async (e) => {
		e.preventDefault();
		console.log('hello');
		const registrationUrl = `${process.env.REACT_APP_API_URL}/api/v1/users/register`; // localhost:8000/api/v1/users/register
    	// this is users.  this matches flask app.py: app.register_blueprint(user, url_prefix='/api/v1/users')
    	const registerResponse = await fetch(registrationUrl, {
    		method: 'POST',
    		body: JSON.stringify(this.state),
    		credentials: 'include', // this sends our session cookie with our request
    		headers: {
    			'Content-Type': 'application/json'
    		}
    	});

    	const parsedResponse = await registerResponse.json();
  
	    if (parsedResponse.status.code === 201) {
	      console.log('Sign up successful');
	      this.props.history.push('/issues'); // Change url to /issues programmatically with react-router
	    } else {
	      // Else display error message to the user
	      this.setState({
	        errorMsg: parsedResponse.status.message
	      });
	    }
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<h4>Register New User</h4>
		        <Label>Name</Label>
		        <Form.Input type="text" name="name" onChange={this.handleChange} required />
		        <Label>Department</Label>
		        <Form.Input type="text" name="department" onChange={this.handleChange} required />
		        <Label>Email</Label>
		        <Form.Input type="email" name="email" onChange={this.handleChange} required />
		        <Label>Password</Label>
		        <Form.Input type="password" name="password" onChange={this.handleChange} required />
		        <Button type="submit" color="green">Register</Button>
		        { this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
		    </Form>
		)
	}
}

export default Register;
