import React, { Component } from 'react';
import IssueList from '../IssueList';
import CreateIssue from '../CreateIssueForm';
import EditIssueModal from '../EditIssueModal';
import { Grid } from 'semantic-ui-react';

class IssueContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			issues: [],
			issueToEdit: {
				subject: '',
				created_at: '',
				id: ''
			},
			showEditModal: false
		}
	}

	componentDidMount(){
		this.getIssues();
	}
	getIssues = async () => {

		try {
			const issues = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/',
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
			const parsedIssues = await issues.json();
			console.log(parsedIssues);

			this.setState({
				issues: parsedIssues.data
			})
		
	} catch(err){
		console.log(err);
		}
	}
// Add Issue method
	addIssue = async (e, issue) => {
		e.preventDefault();
		console.log(issue);

		try {

			// Send JSON
			// createdIssue variable storing response from Flask API
			const createdIssueResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/', {
				method: 'POST',
				body: JSON.stringify(issue),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			// turn the response from Flask into an object we can use
			const parsedResponse = await createdIssueResponse.json();
			console.log(parsedResponse, ' this is response');

			// empty all issues in state to new array then
			// adding issue we created to the end of it

			this.setState({issues: [...this.state.issues, parsedResponse.data]})
		
		} catch(err){
			console.log('error')
			console.log(err)
		}
	}

	deleteIssue = async (id) => {

		console.log(id)
		const deleteIssueResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/' + id, {
													method: 'DELETE'
												});
		const deleteIssueParsed = await deleteIssueResponse.json();
		console.log(deleteIssueResponse)
		// now that the db has deleted our item, we need to remove it from state
		this.setState({issues: this.state.issues.filter((issue) => issue.id !== id )})

		console.log(deleteIssueParsed, ' response from Flask server')
			// then make the delete request, then remove the dog from the state array using filter

	}

	openEditModal = (issueFromTheList) => {
		console.log(issueFromTheList, ' issueToEdit ');

		this.setState({
			showEditModal: true,
			issueToEdit: {
				...issueFromTheList
			}
		})
	}

	handleEditChange = (e) => {
    	this.setState({
      		issueToEdit: {
        		...this.state.issueToEdit,
        [e.currentTarget.name]: e.currentTarget.value
      		}
    	})
  	}

  	closeAndEdit = async (e) => {
    	e.preventDefault();

    	try {

      		const editResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/' + this.state.issueToEdit.id, {
        		method : "PUT",
        		credentials: 'include',
        		body: JSON.stringify(this.state.issueToEdit),
        		headers: {
          			'Content-Type' : 'application/json'
        		}
      		});

      const editResponseParsed = await editResponse.json();
      console.log('editResponseParsed: ', editResponseParsed);

      const newIssueArrayWithEdit = this.state.issues.map((issue)=> {
        if(issue.id === editResponseParsed.data.id) {
            issue = editResponseParsed.data
        }
        return issue;
        })
      
      this.setState({
        issues: newIssueArrayWithEdit,
        showEditModal: false
      })

    } catch(err) {
      console.log(err);
    }

  }

	render(){
		return(
			
			<React.Fragment>
				<IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
				<CreateIssue addIssue={this.addIssue} />

          		<EditIssueModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} issueToEdit={this.state.issueToEdit} closeAndEdit={this.closeAndEdit}/>
			</React.Fragment>
			)
	}

}

export default IssueContainer
