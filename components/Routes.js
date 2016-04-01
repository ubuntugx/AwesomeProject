import React,{
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Component,
} from 'react-native';

import BookList from './BookList';
import BookDetail from './BookDetail';
import SearchBooks from './SearchBooks';
import SearchResults from './SearchResults';

// 定义导航条上面按钮样式
const NavigationBarRouteMapper = {
  // 左面的 Back 按钮
  // index 为当前页的序号
  // navState 为存有所有页面路由的数组
  LeftButton(route, navigator, index, navState) {
    if(index === 0){
      return null;
    }
    // 储存前一个页面的路由，用来获取它的 title
    // 路由的数组存在 routeStack 里了
    var previousRoute = navState.routeStack[index - 1];
    // console.log(previousRoute.title);
    return(
      // 返回按钮的结构
      <TouchableOpacity
        onPress = {()=>navigator.pop()}
        style={styles.navLeftButton}>
        <Text style={[styles.navBarText, styles.navButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    )
  },
  RightButton(route, navigator, index, navState){
    let rightButton;
    if(index === 0){
      return null;
    }
    switch(route.id){
      case 'aaa':
        rightButton = (
          <TouchableOpacity
            // 在这里加入新的页面
            onPress={route.gotoBookDetail}
            style={styles.navRightButton}>
            <Text style={[styles.navBarText, styles.navButtonText]}>
              Next
            </Text>
          </TouchableOpacity>
        )
    }
    return rightButton;
  },
  // 必须项，上面导航条的文字
  Title(route, navigator, index, navState){
    // let title;
    // 根据当前的路由 ID 确定显示的 title
    switch(route.id){
      case 'feature':
        route.title = 'Featured Books';
        break;
      case 'bookDetail':
        route.title = route.obj.volumeInfo.title;
        break;
      case 'search':
        route.title = 'Search';
        break;
      case 'searchResults':
        route.title = 'Search Results';
        break;
    }
    return(
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    )
  },
}

// 定义上面的导航条
const routes = {
  // 根据不同的 ID 渲染不同的组件
  renderScene(route, navigator){
    // 这里渲染出来了，但是导航条一直没有出来
    switch(route.id){
      case 'feature':
        return (<BookList navigator={navigator} />);
      case 'bookDetail':
        return (<BookDetail detail={route.obj} />);
      case 'search':
         return (<SearchBooks navigator={navigator} />);
      case 'searchResults':
         return (<SearchResults result={route.obj} navigator={navigator} />)
    }
  },
  // 用一个方法接收当前路由
  navigator(initialRoute){
    return(
      <Navigator
        // 在这里给 route 传的 ID
        style={styles.navContainer}
        initialRoute={{id: initialRoute}}
        renderScene={this.renderScene}
        configureSence={(route) => {
          if(route.sceneConfig){
            return route.sceneConfig;
          }
          return Navigator.SenceConfigs.FloatFromRight;
        }}
        // 注意这里是 navigationBar！！！
        navigationBar = {
          <Navigator.NavigationBar
            // 定义上面的导航
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
     />
    )
  },
}

var styles = StyleSheet.create({
  navContainer:{
    flex: 1,
    overflow: 'hidden',
    // backgroundColor: '#dddddd',
  },
  navBar: {
    backgroundColor: '#FFF',
    borderBottomColor: '#666666',
    borderBottomWidth: 0.5,
  },
  navLeftButton: {
    paddingLeft: 10,
  },
  navRightButton: {
    paddingRight: 10,
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navButtonText: {
    color: '#5899FF'
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
});

module.exports = routes;