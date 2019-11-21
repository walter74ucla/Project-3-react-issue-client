import React, { Component } from 'react';
import { Form, Button, Label, Segment } from 'semantic-ui-react';

class CreateIssue extends Component {
	constructor(){
		super();

		this.state = {
			subject: ''
		}
	}

	handleChange = (e) => {
		this.setState({[e.currentTarget.name]: e.currentTarget.value})
	}
	render (){
		return (
			<Segment>
				<h4>New Issue</h4>
				<Form onSubmit={(e) => this.props.addIssue(e, this.state)}>
					<Label>Issue:</Label>
					<Form.Input type='text' name='subject' value={this.state.subject} onChange = {this.handleChange} />
					<Button type='Submit'>Submit Issue</Button>
				</Form>
			</Segment>
			)
	}
}

export default CreateIssue;