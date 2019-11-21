import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function IssueList(props){

	const issues = props.issues.map((issue) => {
		return (
			<Card key={issue.id}>
				<Card.Content>
					<Card.Header>Name, Department/ Date Created / Resolved Checkbox</Card.Header>
					{/*<Card.Description>Subject Description</Card.Description>*/}
					<Card.Description>{issue.subject}</Card.Description>
				</Card.Content>
				<Card.Content extra>
            		<Button onClick={() => props.deleteIssue(issue.id)}>Delete Issue</Button>
            		<Button>Edit Issue</Button>
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

