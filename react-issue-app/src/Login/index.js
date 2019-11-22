import React, { Component } from 'react';
import { Form, Label, Button, Message } from 'semantic-ui-react';

class Login extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		}
	}

	// Handling of form value change
	handleChange = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	// Submission of login in form
	handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Email & Password:', this.state);
		const loginUrl = `${process.env.REACT_APP_API_URL}/api/v1/users/login`; //localhost:8000/api/v1/user/login
		const loginResponse = await fetch(loginUrl, {
			method: 'POST',
			body: JSON.stringify(this.state),
			credentials: 'include', // Send a session cookie along with our request
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const parsedResponse = await loginResponse.json();

		if (parsedResponse.status.code === 200) {
			console.log('Login successful');
			this.props.history.push('/issues'); // Change url to /issues programmatically with react-router
		} else {
			// Else display error message to the user
			this.setState({
				errorMsg: parsedResponse.status.message
			});
		}
		
	}

	render(){
		return (
			<Form onSubmit={this.handleSubmit}>
				<h4>Sign In</h4>
				<Label>Email</Label>
				<Form.Input type="email" name="email" onChange={this.handleChange} required/>
				<Label>Password</Label>
				<Form.Input type="password" name="password" onChange={this.handleChange} required />
				<Button type="submit" color="green" >Sign In</Button>
				{ this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
			</Form>
		)
	}
}

export default Login;
