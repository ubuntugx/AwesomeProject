import React,{
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Component,
} from 'react-native';

import BookList from './BookList';

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
    var previousRoute = navState[index - 1];
    return(
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
    return (
      <TouchableOpacity
        onPress={()=>navigator.push()}
        style={styles.navRightButton}>
        <Text style={[styles.navBarText, styles.navButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    )
  },
  Title(route, navigator, index, navState){
    let title;
    switch(route.id){
      case 'feature':
        title = 'Feature';
        break;
      case 'search':
        title = 'Search';
        break;
    }
    return(
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    )
  },
}

const routes = {
  navigator(initialRoute){
    return(
      <Navigator
        initialRoute={{id: initialRoute}}
        renderScene={this.renderScene}
        configureSence={(route) => {
          if(route.sceneConfig){
            return route.sceneConfig;
          }
          return Navigator.SenceConfigs.FloatFromRight;
        }}
        navigatorBar = {
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
     />
    )
  },
  renderScene(route, navigator){
    switch(route.id){
      case 'feature':
        return (<BookList {...route.params} navigator={navigator} />)
    }
  }
}

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#FFF',
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