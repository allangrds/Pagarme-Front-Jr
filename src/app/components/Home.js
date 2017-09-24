import React, {Component} from 'react';
import styles from './Home.styl';
import PostsAction from '../flux/actions/PostsAction';
import PostsStore from '../flux/stores/PostsStore';
import Teste from '../flux/actions/Teste';

export default class Home extends Component {
  componentDidMount() {
    PostsAction.requestPosts();
    setTimeout(function(){ console.log(PostsStore.getState()); }, 1000);
  }

  render(){
    return (
      <h1 className={styles.highlight}>Home 2</h1>
    );
  }
}
