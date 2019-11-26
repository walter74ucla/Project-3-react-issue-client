import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './Login';
import IssueContainer from './IssueContainer';
import HeaderComponent from './HeaderComponent';
// import CreateIssue from './CreateIssueForm'; //I do not think we can do this.
import { Route, Switch } from 'react-router-dom';


const My404 = () => {
	return (
		<div>
			<h3>You are lost.</h3>
		</div>
	)
};

function App() {
  return (
    <main>
    <div style = {{
      backgroundColor: 'lightgray',
    }}>
    	<HeaderComponent />
	    	<Switch>
          <Route exact path="/" component= { Login }/>
	    		<Route exact path="/register" component={ Register }/>
	    		{/*<Route exact path="/" component={ Login } />*/}
          		<Route exact path="/login" component= { Login } />
	    		<Route exact path="/issues" component={ IssueContainer } />
	    		{/*<Route exact path="/create_issue" ={ CreateIssue } />I do not think we can do this*/}
	    		<Route component={ My404 } />
	 		</Switch> 
      </div> 
     </main>
  );
}

export default App;
