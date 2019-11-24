import React, { Component } from 'react';
import { Form, Button, Label, Segment, Grid, Header, Icon } from 'semantic-ui-react';

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

	handleSubmit = (e) =>{
		this.setState({subject:''})
	}
	render (){
		return (
			<Grid textAlign='center' verticalAlign='middle'>
			    <Grid.Column>
			      <Header as='h2' color='teal' textAlign='center'>
			        <Icon name='conversation' /> Create New Issue
			      </Header>
			      <Form size="large" onSubmit={(e) => this.props.addIssue(e, this.state)}>
			        <Segment stacked>
			          <Form.TextArea 
			          	fluid 
			          	//icon="question circle"...these do not show up in Text Area
			          	//iconPosition="left"
			          	placeholder="Enter Issue Here" 
			          	type="text" 
			          	name="subject"
			          	value={this.state.subject} 
			          	onChange={this.handleChange}

			          />

			          <Button color="teal" fluid size="large" type="submit">
			            Submit Issue
			          </Button>
			        </Segment>
			      </Form>
			      
			    </Grid.Column>
  			</Grid>
			)
	}
}

export default CreateIssue;


			{/*
			<Segment>
				<h4>New Issue</h4>
				<Form onSubmit={(e) => this.props.addIssue(e, this.state)}>
					<Label>Issue:</Label>
					<Form.Input type='text' name='subject' value={this.state.subject} onChange={this.handleChange} />
					<Button type='Submit'>Submit Issue</Button>
				</Form>
			</Segment>*/}