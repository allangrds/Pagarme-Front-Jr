import PostsAction from '../actions/PostsAction';
import alt from '../alt';

class PostsStore {
    constructor() {
        this.bindActions(PostsAction);

        this.posts = null;
    }

    onRequestPosts(variable) {
        this.posts = variable;
    }
}

module.exports = alt.createStore(PostsStore);
