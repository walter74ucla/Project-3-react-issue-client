import React, { Component } from 'react';
import { Card, Button, Checkbox, Comment, Header } from 'semantic-ui-react';
import CreateComment from '../CreateCommentForm';


class IssueList extends Component {
	constructor(){
		super();
		this.state = {
			issues: [],
			comments: [],
			// commentsToEdit: {
			// 	subject: '',
			// 	created_at: '',
			// 	id: ''
			// },
			// showEditCommentModal: false
		}
	}

	componentDidMount(){
		this.getComments();
	}

	getComments = async () => {

		try {
			const comments = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
			const parsedComments = await comments.json();
			console.log(parsedComments);

			this.setState({
				comments: parsedComments.data
			})
		
	} catch(err){
		console.log(err);
		}
	}

	addComment = async (e, comment) => {
		e.preventDefault();
		console.log(comment);
		console.log(JSON.stringify(comment));

		try {

			// Send JSON
			// createdComment variable storing response from Flask API
			const createdCommentResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/comments/', 
				{
					method: 'POST',
					credentials: 'include', // Send a session cookie along with our request
					body: JSON.stringify(comment),
					headers: {
						'Content-Type': 'application/json'
				}
			});
			
			// turn the response from Flask into an object we can use
			const parsedResponse = await createdCommentResponse.json();
			console.log(parsedResponse, ' this is response');

			// empty all comments in state to new array then
			// adding comment we created to the end of it (created shows up first until refresh then at the bottom)

			this.setState({comments: [parsedResponse.data, ...this.state.comments]})
		
		} catch(err){
			console.log('error')
			console.log(err)
		}
	}

	render(){
		console.log('this.props...', this.props);
		console.log('this.state.comments...', this.state.comments);

		const issues = this.props.issues.map((issue) => {
		// console.log(issue);
			const comments = this.state.comments
					.filter(assocComment => assocComment.assoc_issue_id === issue.id)
					.map((comment) => (
						<Comment key={comment.id}>
				      		{/*<Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />*/}
						      <Comment.Content>
						        <Comment.Author as='a'>{comment.created_by.name}</Comment.Author>
						        <Comment.Metadata>
						          <span>{comment.created_at}</span>
						        </Comment.Metadata>
						        <Comment.Text>{comment.body}</Comment.Text>
						        {/*<Comment.Actions>
						          <Comment.Action>Reply</Comment.Action>
						        </Comment.Actions>*/}
						      </Comment.Content>
					    </Comment>
					));
						

		return (

			<Card fluid key={issue.id}>
				<Card.Content>
					<Card.Header>{issue.created_by.name}, {issue.created_by.department} / {issue.created_at} </Card.Header>
					{/*<Card.Description>Subject Description</Card.Description>*/}
					<Card.Description>{issue.subject}</Card.Description>
					<Checkbox label="Resolved"/>
				</Card.Content>
				<Card.Content extra>
            		<Button onClick={() => this.props.deleteIssue(issue.id)}>Delete Issue</Button>
            		<Button onClick={() => this.props.openEditIssueModal(issue)}>Edit Issue</Button>
				</Card.Content>
          		<Card.Content extra>
            		<Comment.Group minimal>
					    <Header as='h3' dividing>
					      Comments
					    </Header>

				    	{ comments }

					</Comment.Group>
				</Card.Content>				
				<CreateComment addComment={this.addComment} issueId={issue.id}/>
          	</Card>
          		)
	
          }

         
			
		
	)
	return (
		<Card.Group>
			{ issues }
		</Card.Group>
	) 
	}
}

export default IssueList;

