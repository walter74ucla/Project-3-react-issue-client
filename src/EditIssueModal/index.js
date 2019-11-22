import React from 'react';
import { Modal, Form, Button, Label, Header } from 'semantic-ui-react';


const EditIssueModal = (props) => {
	console.log(props)
	return (
		<Modal open={props.open}>
			<Header>Edit Issue</Header>
			<Modal.Content>
				<Form onSubmit={props.closeAndEdit}>
					<Label>
						Subject:
					</Label>
					<Form.Input type='text' name='subject' value={props.issueToEdit.subject} onChange={props.handleEditChange}/>
				{/* Here we could update the date/time property*/}
					<Modal.Actions>
						<Button color='green' type='submit'>Edit Issue</Button>
					</Modal.Actions>
				</Form>
			</Modal.Content>
		</Modal>
		)
}











export default EditIssueModal;