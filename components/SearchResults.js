import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image,
} from 'react-native';

import BookDetail from './BookDetail';

class SearchResults extends Component{
  constructor(props){
    super(props);
    var dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.result.book),
    }
    let PropTypes ={
      result: React.PropTypes.object,
    }
  }
  render(){
    return(
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this._renderBook} />
    )
  } 
  _renderBook=(book)=>{
    const imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';

    return(
      <TouchableHighlight
        onPress={() => this._showBookDetail(book)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.cellContainer}>
            <Image 
              source={{uri: imageURI}}
              style={styles.thumbnail}/>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{book.volumeInfo.title}</Text>
              <Text style={styles.author}>{book.volumeInfo.authors}</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    )
  };

  _showBookDetail=(book)=>{
    console.log(this.props.result);
    const {navigator} = this.props;
    if(navigator){
      navigator.push({
        id: 'bookDetail',
        // title: book.volumeInfo.title,
        // component: BookDetail,
        obj: book,
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  author: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
    marginTop: 45,
    marginBottom: 45,
    backgroundColor: '#F5FCFF',
  },
  cellContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1
  },
}) 

module.exports = SearchResults;