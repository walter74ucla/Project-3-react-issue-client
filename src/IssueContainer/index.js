import React, { Component } from 'react';
import IssueList from '../IssueList';
import CreateIssue from '../CreateIssueForm';// not sure if we can separate this onto another page???
import EditIssueModal from '../EditIssueModal';
import { Grid, Segment } from 'semantic-ui-react';

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
			comments: [],
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
				credentials: 'include', // Send a session cookie along with our request
				body: JSON.stringify(issue),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			// turn the response from Flask into an object we can use
			const parsedResponse = await createdIssueResponse.json();
			console.log(parsedResponse, ' this is response');

			// empty all issues in state to new array then
			// adding issue we created to the end of it (created shows up first until refresh then at the bottom)

			this.setState({issues: [parsedResponse.data, ...this.state.issues]})
		
		} catch(err){
			console.log('error')
			console.log(err)
		}
	}

	deleteIssue = async (id) => {

		console.log(id)
		const deleteIssueResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/' + id + '/', {//adding '/' to resolve CORS error
													method: 'DELETE',
													credentials: 'include' // Send a session cookie along with our request
												});
		const deleteIssueParsed = await deleteIssueResponse.json();
		console.log(deleteIssueResponse)
		if (deleteIssueParsed.status.code === 200) {
			// now that the db has deleted our item, we need to remove it from state
			this.setState({issues: this.state.issues.filter((issue) => issue.id !== id )})

		} else {
			alert ("You cannot delete an issue that you did not create")
		}

		console.log(deleteIssueParsed, ' response from Flask server')
			// then make the delete request, then remove the dog from the state array using filter

	}

	openEditModal = async (issueFromTheList) => {
		console.log(issueFromTheList, ' issueToEdit ');
		console.log(issueFromTheList.id);
		// if the user that is logged in created the issue then show modal
		// else alert "You cannot edit an issue that you did not create"
		// want to do the validations on the server, not the client
		const issue = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/' + issueFromTheList.id + '/',
		// I get this error in the console...
		// Access to fetch at 'http://localhost:8000/api/v1/issues/2' from origin 'http://localhost:3000' has been blocked by CORS policy: 
		// No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the
		// request's mode to 'no-cors' to fetch the resource with CORS disabled.
		// Adding the '/' to the end of the const issue = await fetch(... solved it.
				{ // added this callback to send over the session cookie
					credentials: 'include',
					method: "GET"
				});
		const parsedIssue = await issue.json();
		console.log(parsedIssue, ' parsedIssue');
		// console.log(issueFromTheList.created_by.id);
		// console.log(parsedIssue.data.created_by.id);
      	if (parsedIssue.status.code === 401) {
	      	alert ("You cannot edit an issue that you did not create")
	    } else {
	      	this.setState({
				showEditModal: true,
				issueToEdit: {
					...issueFromTheList
				}
			})
	    }		
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
        		credentials: 'include', // Send a session cookie along with our request
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

			<Grid divided='vertically' centered stackable>
			    <Grid.Row columns={3}>
			      <Grid.Column width={3}></Grid.Column>
			      <Grid.Column width={10}>
			        <CreateIssue addIssue={this.addIssue} />
			      </Grid.Column>
			      <Grid.Column width={3}></Grid.Column>
			    </Grid.Row>


			    <Grid.Row columns={3}>
			      <Grid.Column width={3}></Grid.Column>
			      <Grid.Column width={10}>
			        <IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
			      </Grid.Column>
			      <Grid.Column width={3}></Grid.Column>
			      <EditIssueModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} issueToEdit={this.state.issueToEdit} closeAndEdit={this.closeAndEdit}/>
			    </Grid.Row>
			</Grid>
			)
	}

}

export default IssueContainer



			{/*<React.Fragment>
				<IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
				<CreateIssue addIssue={this.addIssue} />

          		<EditIssueModal handleEditChange={this.handleEditChange} open={this.state.showEditModal} issueToEdit={this.state.issueToEdit} closeAndEdit={this.closeAndEdit}/>
			</React.Fragment>*/}


			{/* this gave me new issue on top without a visible divider
			<Grid verticalAlign='top' centered divided='vertically'>
		        <Grid.Column width={4}>four wide column</Grid.Column>
		        <Grid.Column width={8}>eight wide column
		        	<CreateIssue addIssue={this.addIssue} />
		        	<IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
		        </Grid.Column>
		        <Grid.Column width={4}>four wide column</Grid.Column>
      		</Grid>*/}


      		{/* this gave me a divider between new issue and issue list, but it took up the entire screen width
      		<Grid divided='vertically'>
			    <Grid.Row columns={1}>
			      <Grid.Column>
			        <CreateIssue addIssue={this.addIssue} />
			      </Grid.Column>
			    </Grid.Row>

			    <Grid.Row columns={1}>
			      <Grid.Column>
			        <IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
			      </Grid.Column>
			    </Grid.Row>
			</Grid>*/}


			{/* this almost gives me what I want.  the three wide columns do not stretch
			<Grid celled='internally'>
				    <Grid.Row>
				      <Grid.Column width={3}>
				        three wide column
				      </Grid.Column>
				      <Grid.Column width={10}>
				        <CreateIssue addIssue={this.addIssue} />
				      </Grid.Column>
				      <Grid.Column width={3}>
				        three wide column
				      </Grid.Column>
				    </Grid.Row>

				    <Grid.Row>
				      <Grid.Column width={3}>
				        three wide column
				      </Grid.Column>
				      <Grid.Column width={10}>
				        <IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
				      </Grid.Column>
				      <Grid.Column width={3}>
				        three wide column
				      </Grid.Column>
				    </Grid.Row>
				</Grid>*/}


			{/* columns 1 and 3 are stretched, but there is no line between new issue and issue list
				<Grid columns={3} divided>
				    <Grid.Row stretched>
				      <Grid.Column width={3}>
				        <Segment>1</Segment>
				      </Grid.Column>
				      <Grid.Column width={10}>
				        <CreateIssue addIssue={this.addIssue} />
				        <IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
				      </Grid.Column>
				      <Grid.Column width={3}>
				        <Segment>1</Segment>
				      </Grid.Column>
				    </Grid.Row>
				</Grid>*/}


			{/* still not quite what I want
				<Grid divided='vertically' centered stackable>
				    <Grid.Row columns={3}>
				      <Grid.Column width={3}>placeholder</Grid.Column>
				      <Grid.Column width={10}>
				        <CreateIssue addIssue={this.addIssue} />
				      </Grid.Column>
				      <Grid.Column width={3}>placeholder</Grid.Column>
				    </Grid.Row>

				    <Grid.Row columns={3}>
				      <Grid.Column width={3}>placeholder</Grid.Column>
				      <Grid.Column width={10}>
				        <IssueList issues={this.state.issues} deleteIssue={this.deleteIssue} openEditModal={this.openEditModal}/>
				      </Grid.Column>
				      <Grid.Column width={3}>placeholder</Grid.Column>
				    </Grid.Row>
				</Grid>*/}