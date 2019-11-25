import React from 'react';
import { Card, Button, Checkbox, Grid, Responsive, Comment, Header, Form } from 'semantic-ui-react';

function IssueList(props){

	const issues = props.issues.map((issue) => {
		

		return (

			<Card fluid key={issue.id}>
				<Card.Content>
					<Card.Header>{issue.created_by.name}, {issue.created_by.department} / {issue.created_at} </Card.Header>
					{/*<Card.Description>Subject Description</Card.Description>*/}
					<Card.Description>{issue.subject}</Card.Description>
					<Checkbox label="Resolved"/>
					<Comment.Group minimal>
					    
					    <Header as='h3' dividing>
					      Comments
					    </Header>

					    <Comment>
					      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
					      <Comment.Content>
					        <Comment.Author as='a'>Matt Holliday</Comment.Author>
					        <Comment.Metadata>
					          <div>Today at 5:42PM</div>
					        </Comment.Metadata>
					        <Comment.Text>I can comment.</Comment.Text>
					        {/*<Comment.Actions>
					          <Comment.Action>Reply</Comment.Action>
					        </Comment.Actions>*/}
					      </Comment.Content>
					    </Comment>

					        <Comment>
						      <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
						      <Comment.Content>
						        <Comment.Author as='a'>Joe DiMaggio</Comment.Author>
						        <Comment.Metadata>
						          <span>5 days ago</span>
						        </Comment.Metadata>
						        <Comment.Text>Me too, Matt</Comment.Text>
						        <Comment.Actions>
						          <a>Reply</a>
						        </Comment.Actions>
						      </Comment.Content>
						    </Comment>

						<Form reply>
					      <Form.Input />
					      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
					    </Form>
  					</Comment.Group>

				</Card.Content>
				<Card.Content extra>
            		<Button onClick={() => props.deleteIssue(issue.id)}>Delete Issue</Button>
            		<Button onClick={() => props.openEditModal(issue)}>Edit Issue</Button>
          		</Card.Content>
          	</Card>


         
			)
		
	})
	return (
		<Card.Group>
			{ issues }
		</Card.Group>
	) 
}


export default IssueList

