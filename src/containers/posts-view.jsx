import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { PostsReducer } from '../reducers';

class PostsView extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount(){
        const postId = this.context.router.params['id'];
        console.log(postId);
        this.props.fetchPost(postId);
    }

    render() {
        const post = this.props.post;
        if (!post){
            return (<div>Loading ...</div>);
        }

        return (
            <div className="posts-view">
                <div className="row">
                    <div className="col-md-6 text-left"> <Link to="/">Back to Employee List</Link> </div>
                    <div className="col-md-6 text-right">
                        <button className="btn btn-primary" 
                                onClick={this.onDeletingPost.bind(this)}>Delete Employee</button>
                    </div>                    
                </div>
                <h2>Employee Detail</h2>
                <hr />
                <div className="posts-view-title-categories">
                    <h3>{post.firstName} {post.lastName} <p><small>{post.age} {post.status}</small></p> </h3>
                </div>
                <div className="posts-view-content"> <p>{post.gender}</p> </div>
            </div>
        );
    }

    onDeletingPost(){
        const postId = this.context.router.params['id'];
        this.props.deletePost(postId)
            .then(() => {
                setTimeout( this.context.router.push('/'), 50);
            });
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.post
    }
}
export default connect(mapStateToProps, {fetchPost , deletePost})(PostsView);
