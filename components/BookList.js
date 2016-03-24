import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,   // loading
} from 'react-native';

// const FAKE_BOOK_DATA = [
//     {volumeInfo: {title: 'The Catcher in the Rye', authors: "J. D. Salinger", imageLinks: {thumbnail: 'http://books.google.com/books/content?id=PCDengEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'}}}
// ];
import BookDetail from './BookDetail';

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

class BookList extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData= ()=>{
    fetch(REQUEST_URL)
    .then((respone) => respone.json())
    .then((responeData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responeData.items),
        isLoading: false,
      })
      // console.log('loading' + this.state.isLoading);
    })
    .done();
  };
  renderBook = (book)=>{
    return (
      <TouchableHighlight onPress={() => this._showBookDetail(book)}>
        <View>
          <View style={styles.container}>
            <Image source={{uri: book.volumeInfo.imageLinks.thumbnail}}
                   style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{book.volumeInfo.title}</Text>
              <Text style={styles.author}>{book.volumeInfo.authors}</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  };

  _showBookDetail=(book) => {
    // 导航器 NavigatorIOS 由路由组成
    // push(route) 给导航器添加一个新路由
    this.props.navigator.push({
      title: book.volumeInfo.title,
      component: BookDetail,   // 组件内容
      passProps: {book},       // 传递的属性 ES6 写法，相当于 book: book
    });
  };

  render(){
    if(this.state.isLoading){
      return this.renderLoadingView()
    }
    return(
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderBook} />
    );
  }

  renderLoadingView(){
    return(
      <View style={styles.loading}>
        <ActivityIndicatorIOS
          size='large' />
          <Text>
            Loading books...
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  author: {
    color: '#656565',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  listView: {
    marginTop: 65,
    backgroundColor:'#F5FCFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

module.exports = BookList;