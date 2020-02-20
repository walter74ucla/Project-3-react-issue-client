import React, { Component } from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';


class CreateComment extends Component {
	constructor(){
		super();
		this.state = {
			body: '',
			assoc_issue_id: ''
		}
	}

	handleChange = (e) => {
		// console.log('this props...', this.props);
		this.setState({[e.currentTarget.name]: e.currentTarget.value,
			assoc_issue_id: this.props.issueId})
	}

	handleSubmit = (e) =>{
		this.props.addComment(e, this.state);
		this.setState({body:'', assoc_issue_id:''})
	}

	render (){
		
		// console.log('this state...', this.state);
		return (
			
	      <Form onSubmit={this.handleSubmit}>
	        <Segment stacked>
	          	<Form.TextArea 
	          		placeholder="Enter Comment Here" 
		          	type="text" 
		          	name="body"
		          	value={this.state.body} 
		          	onChange={this.handleChange}
		        />
	          	<Button 
		          	content='Add Comment' 
		          	labelPosition='left' 
		          	icon='edit' 
		          	primary 
	        	/>
	        </Segment>
	      </Form>
			
		)
	}
}

export default CreateComment;