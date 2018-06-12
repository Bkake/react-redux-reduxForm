import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {readAllPost,deletePost} from '../actions/index'
import PostListItem from '../components/post-list-item'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {Link} from 'react-router'

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {displayOnlyMines : false}
    }
    
    componentWillMount() {
        this.props.readAllPost();
    }

    renderPosts() {
        const {posts} = this.props
        let arrayPosts;
        if(posts) {
           arrayPosts = this.state.displayOnlyMines ? this.filterMyPosts(posts) : posts; 
           return arrayPosts.map((post) => {
                return <PostListItem key={post.id} post={post} deletePostCallBack={() => this.deletePostCallBack(post)}/>
             })
        }
    }

    deletePostCallBack(post) {
       this.props.deletePost(post.id);
    }

    filterMyPosts(postList) {
        return postList.filter((post) => {
            return post.author == "Moi" ? true : false 
        })
    }


    render () {
        return (
            <div>
                <h1>Liste des posts</h1>
                <input type="checkbox" onChange={(e) => this.setState({displayOnlyMines : e.target.checked})}/>
                Afficher uniquement mes posts
                <div className="button-add">
                    <Link to={"create-post"}>
                        <button className="btn btn-primary btn-circle btn-lg">+</button>
                    </Link>
                </div>
                <table className="table">
                   <thead>
                       <tr>
                           <th>Titre</th>
                           <th>Action</th>
                       </tr>
                   </thead>
                   <ReactCSSTransitionGroup 
                        component="tbody"
                        transitionEnterTimeout = {500}
                        transitionLeaveTimeout = {300}
                        transitionName="fade">
                          {this.renderPosts()}
                   </ReactCSSTransitionGroup>
                </table>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({readAllPost,deletePost}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList)