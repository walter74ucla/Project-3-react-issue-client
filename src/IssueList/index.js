import React from 'react';
import { Card, Button, Checkbox, Grid, Responsive, Comment, Header, Form } from 'semantic-ui-react';

function IssueList(props){

	const issues = props.issues.map((issue) => {
		// THIS IS A CHECK FOR LOGIN
		// if(localStorage.getItem('sessionId') === issue.user.toString()){
		console.log(issue)
		return (

			<Card fluid key={issue.id}>
				<Card.Content>
					<Card.Header>{issue.created_by.name}, {issue.created_by.department} / {issue.created_at} </Card.Header>
					{/*<Card.Description>Subject Description</Card.Description>*/}
					<Card.Description>{issue.subject}</Card.Description>
					<Checkbox label="Resolved"/>
				</Card.Content>
				<Card.Content extra>
            		<Button onClick={() => props.deleteIssue(issue.id)}>Delete Issue</Button>
            		<Button onClick={() => props.openEditModal(issue)}>Edit Issue</Button>

          		<Comment.Group minimal>
					    
				    <Header as='h3' dividing>
				      Comments
				    </Header>

				    <Comment>
				      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
				      <Comment.Content>
				        <Comment.Author as='a'>Matt</Comment.Author>
				        <Comment.Metadata>
				          <div>Today at 5:42PM</div>
				        </Comment.Metadata>
				        <Comment.Text></Comment.Text>
				        <Comment.Actions>
				          <Comment.Action>Reply</Comment.Action>
				        </Comment.Actions>
				      </Comment.Content>
				    </Comment>

				    <Form reply>
				      <Form.Input />
				      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
				    </Form>
  				</Comment.Group>
          		</Card.Content>
          	</Card>
          		)
	// RERENDER IF LOOGED IN WITHOUT BUTTONS
    //       }else{

    //       	return(
				// <Card fluid key={issue.id}>
				// 				<Card.Content>
				// 					<Card.Header>Name, Department/ Date Created </Card.Header>
				// 					{/*<Card.Description>Subject Description</Card.Description>*/}
				// 					<Card.Description>{issue.subject}</Card.Description>
				// 					<Checkbox label="Resolved"/>

				// 				</Card.Content>
				//           	</Card>
				//         )
          }

         
			
		
	)
	return (
		<Card.Group>
			{ issues }
		</Card.Group>
	) 
}


export default IssueList

