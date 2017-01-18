import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router'; 
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
    componentDidMount(){
        this.props.fetchPosts();
    }
    
    render () {
        const posts = this.props.posts;
        const noItemsInfo = `Data is Empty`;
        return (
            <div className="posts-index">
                <div className="text-right">
                    <Link to="/posts/new" className="btn btn-primary">Add Employee</Link>
                </div>
                <div className="posts-index-list-container">
                    {posts.length > 0 ? 
                        <ul className="list-group"> {posts.map(post => this.renderPostItem(post))}</ul> : 
                        <span className="alert alert-info">{noItemsInfo}</span> }                                         
                </div>
            </div>
        )
    }

    renderPostItem(post){
        return (
            <Link className="posts-list-item list-group-item" to={`/posts/${post.id}`} key={post.id}>
                <span>{post.firstName} {post.lastName}</span>
                <span className="badge">Age: {post.age}</span>
                <span className="badge">Status: {post.status}</span>
                 <span className="badge">Gender: {post.gender}</span>
            </Link>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.all
    }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
