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

// 导入数据的 url
var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

class BookList extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      // listView 的 dataSource 是一个状态
      // 初始化 listView 的 dataSource 检查行是否变化，判断是否要更新 listView
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentDidMount(){
    // 当 DOM 结构加载完时获取数据
    this.fetchData();
  }

  fetchData= ()=>{
    // 用 fetch 来获取数据
    // 参数为指定的 url
    fetch(REQUEST_URL)
    // 接着将获取到的值转化为 json 格式
    .then((respone) => respone.json())
    // 接着将转化为 json 格式的值中的每一行填充到数据源中
    .then((responeData) => {
      this.setState({
        // 判断行是否改变，用来更新 listView
        dataSource: this.state.dataSource.cloneWithRows(responeData.items),
        isLoading: false,
      })
      // console.log('loading' + this.state.isLoading);
    })
    // 最后要调用 done
    .done();
  };
  // 定义 listView 每一行的样式，renderRow 默认传的参数是每一行的数据源
  // 定义里面的信息为每一行数据源的信息
  renderBook = (book)=>{
    return (
      // 点击列表的每一项时，跳到 Detail 页面
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

  // listView 的每一列是一个普通按钮
  // 点击按钮进入详情
  // 因为是点击当前行的内容，所以传进去的是当前行的所有信息
  _showBookDetail=(book) => {
    // 导航器 NavigatorIOS 由路由组成
    // push(route) 给导航器添加一个新路由
    // 这个 navigator 的属性是由前面一页传过来的
    // 调用 push 方法加入新的路由
    this.props.navigator.push({
      // 还包括这几项，其中 passProps 用于传递属性
      title: book.volumeInfo.title,
      component: BookDetail,   // 组件内容
      // 传递一个属性对象 键：值
      passProps: {book},       // 传递的属性 ES6 写法，相当于 book: book
    });
  
    // this.props.navigator.push({
    //   name: 'Book Detail',
    //   component: BookDetail,
    //   params: {book},
    // })
  };

  render(){
    // 加一个 loading，在数据没有获取之前显示 loading 页面
    if(this.state.isLoading){
      return this.renderLoadingView()
    }
    return(
      // 数据传进来之后显示，
      <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        // 定义 listView 每一行的样式
        renderRow={this.renderBook} />
    );
  }

  renderLoadingView(){
    return(
      // ActivityIndicatorIOS 是 loading 的页面
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
    marginTop: 65,   // 自己加的防止 ListView 被上面的导航条挡住
    backgroundColor:'#F5FCFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

module.exports = BookList;