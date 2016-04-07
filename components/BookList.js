import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicatorIOS,   
} from 'react-native';

import GiftedListView from 'react-native-gifted-listview';

import Spinner from 'react-native-spinkit';
import BookDetail from './BookDetail';
import BookListRow from './BookListRow';
import BuildService from './BuildService';
import Realm from 'realm';

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

let realm = new Realm();

class BookList extends Component{
  constructor(props){
    super(props);
    // this.state={
    //   isLoadingTail: false,
    //   isLoading: true,
    //   dataSource: new ListView.DataSource({
    //     rowHasChanged: (row1, row2) => row1 !== row2
    //   })
    // }
  }

  componentDidMount(){
    this._data = [];
  }
  // 刷新时调用的函数
  onFetch = (page = 1, callback, options)=>{
     BuildService.loadBuildList('http://www.pgyer.com/apiv1/user/listMyPublished',1)
      .then((value) => {
        let builds = realm.objects("Build");
        callback(builds);
        this.setState({
          isLoading: false,
        })
      })
      .catch(err => console.error(err))
      .done();
  };

  renderBook = (build)=>{
    return (
      <TouchableHighlight onPress={() => this._showBookDetail(build)}>
        <View>
          <View style={styles.container}>
            <Image source={{uri: 'http://o1wh05aeh.qnssl.com/image/view/app_icons/'+build.appIcon}}
                   style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{build.appName}</Text>
              <Text style={styles.author}>{build.appVersion}</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
        </View>
      </TouchableHighlight>
    );
  };

  _showBookDetail = (book) => {
    const {navigator} = this.props;
    if(navigator){
      navigator.push({
        id: 'bookDetail',
        obj: book,
      })
    }
  };

  // onEndReached = () => {
  //   if (this.state.isLoadingTail) {
  //     return;
  //   }
  //   this.setState({
  //     isLoadingTail: true,
  //   });
  //   this.fetchData();
  //   this.setState({
  //     isLoadingTail: false,
  //   });
  // };

  renderFetchingView = ()=>{
    return (
      <View style={styles.loadingView}>
        <Spinner size={36} type="Bounce" color="#5ac8fb" />
      </View>
    );
  };

  renderAllLoadedView = ()=>{
    return (
      <View style={styles.loadingView}>
        <Text>加载完成</Text>
      </View>
    );
  };

  renderWaitingView = (paginateCallback)=>{
    return (
      <View style={styles.loadingView}>
        <TouchableOpacity onPress={paginateCallback}>
          <Text style={{color:'#777',fontSize:14}}>点击加载更多</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderRefreshableFetchingView = ()=>{
    return (
      <View style={styles.loadingView}>
        <Spinner size={36} type="Wave" color="#5ac8fb" />
      </View>
    );
  };

  renderRefreshableWillRefreshView = ()=>{
    console.log('enter renderRefreshableWaitingView')
    return (
      <View style={styles.loadingView}>
        <Text style={styles.pullText}>⇡ 释放更新</Text>
      </View>
    );
  };

  renderRefreshableWaitingView = ()=>{
    return (
      <View style={styles.loadingView}>
        <Text style={styles.pullText}>⇣ 下拉刷新</Text>
      </View>
    );
  };

  renderEmptyView = ()=>{
    return (
      <Text>No data yet.</Text>
    );
  };


  render(){
    // if(this.state.isLoading){
    //   return this.renderLoadingView()
    // }
    return(
      <GiftedListView
        style={styles.listView}
        initialListSize= {6}
        rowView={this.renderBook}
        onFetch={this.onFetch}
        autoPaginate= {true}  // 控制到最后上拉刷新，不是点击按钮
        // dataSource={this.state.dataSource}

        firstLoader={true}

        pagination={true}
        paginationFetchigView={this.renderFetchingView}
        paginationAllLoadedView={this.renderAllLoadedView}
        paginationWaitingView={this.renderWaitingView}

        refreshable={true} 
        refreshableFetchingView={this.renderRefreshableFetchingView}
        refreshableWillRefreshView={this.renderRefreshableWillRefreshView}
        refreshableWaitingView={this.renderRefreshableWaitingView}

        emptyView={this.renderEmptyView}

        // withSections={false}
        customStyles={{
          paginationView: {
            backgroundColor: '#F5FCFF',
          },
        }}
        // refreshableTintColor="blue"
      />
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
    padding: 10,
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
    marginTop: 55,
    marginBottom: 40,
    backgroundColor:'#F5FCFF',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene:{
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
  loadingView: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent:'center'
  },
  pullText: {
    fontSize: 14,
    color: '#666',
  },
})

module.exports = BookList;