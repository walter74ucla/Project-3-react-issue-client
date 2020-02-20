import React, { Component } from 'react';
import { Form, Button, Segment, Grid, Header, Icon } from 'semantic-ui-react';

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
		this.props.addIssue(e, this.state);
		this.setState({subject:''})
	}

	render (){
		return (
			<Grid textAlign='center' verticalAlign='middle'>
			    <Grid.Column>
			      <Header as='h2' color='teal' textAlign='center'>
			        <Icon name='conversation' /> Create New Issue
			      </Header>
			      <Form size="large" onSubmit={this.handleSubmit}>
			        <Segment stacked>
			          <Form.TextArea 
			          	// fluid...does not apply to text area
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
