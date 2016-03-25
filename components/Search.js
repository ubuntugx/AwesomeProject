import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} from 'react-native';

import SearchBooks from './SearchBooks';

class Search extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  render(){
    return (
      // 改为 Navigator
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Search Books',
          component: SearchBooks,
        }} />
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

module.exports = Search;