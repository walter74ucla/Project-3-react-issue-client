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

