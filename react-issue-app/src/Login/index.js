import React, { Component } from 'react';
import { Form, Label, Button, Message, Grid, Header, Image, Segment, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


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
		const loginUrl = `${process.env.REACT_APP_API_URL}/api/v1/users/login`; //localhost:8000/api/v1/users/login
		// this is users.  this matches flask app.py: app.register_blueprint(user, url_prefix='/api/v1/users')
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
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			    <Grid.Column style={{ maxWidth: 450 }}>
			      <Header as='h2' color='teal' textAlign='center'>
			        <Icon name='baseball ball' /> Log-in to your account
			      </Header>
			      <Form size="large" onSubmit={this.handleSubmit}>
			        <Segment stacked>
			          <Form.Input 
			          	fluid 
			          	icon="user"
			          	iconPosition="left"
			          	placeholder="E-mail address" 
			          	type="email" 
			          	name="email" 
			          	onChange={this.handleChange} 
			          	required 
			          />
			          <Form.Input
			            fluid
			            icon="lock"
			            iconPosition="left"
			            placeholder="Password"
			            type="password" 
			            name="password" 
			            onChange={this.handleChange} 
			            required
			          />

			          <Button color="teal" fluid size="large" type="submit">
			            Login
			          </Button>
			        </Segment>
			      { this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
			      </Form>
			      <Message>
			        {/*New to us? <a href='#'>Sign Up</a>*/}
			        New to us?
			        <List>
						<List.Item><Link to = '/register'>Sign Up</Link></List.Item>
					</List>
			      </Message>
			    </Grid.Column>
  			</Grid>
		)
	}
}

export default Login;



{/*<Form onSubmit={this.handleSubmit}>
				<h4>Sign In</h4>
				<Label>Email</Label>
				<Form.Input type="email" name="email" onChange={this.handleChange} required/>
				<Label>Password</Label>
				<Form.Input type="password" name="password" onChange={this.handleChange} required />
				<Button type="submit" color="green" >Sign In</Button>
				{ this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null }
			</Form>*/}
