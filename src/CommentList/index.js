import React, {Component} from 'react'
import { Comment, Header, Form, Button } from 'semantic-ui-react'


class CommentList extends Component {

	constructor(props){
		super(props);
		this.state={
			body: props.body
		}
	}

		render () {
			const comments = this.props.comments.map(comment => {
				return<Comment body={comment}/>

			})
			console.log (this.props);
			return(
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
					        <Comment.Actions>
					          <Comment.Action>Reply</Comment.Action>
					        </Comment.Actions>
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
					      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
					    </Form>
  					</Comment.Group>
  		)

  	}
}
export default CommentList;