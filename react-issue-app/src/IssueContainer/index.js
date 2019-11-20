import React, { Component } from 'react';
import IssueList from '../IssueList';

class IssueContainer extends Component {
	constructor(props){
		super(props);

		this.state = {
			issues: []
		}
	}

	componentDidMount(){
		this.getIssues();
	}
	getIssues = async () => {

		try {
			const issues = await fetch(process.env.REACT_APP_API_URL + '/api/v1/issues/');
			const parsedIssues = await issues.json();
			console.log(parsedIssues);
			this.setState({
				issues: parsedIssues.data
			})
		
	} catch(err){
		console.log(err);
		}
	}

	render(){
		return(
			/*"I'm the issues container"*/
			<IssueList issues={this.state.issues} />
			)
	}

}

export default IssueContainer
