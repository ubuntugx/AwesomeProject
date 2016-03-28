import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

// import BookList from './BookList';
import NavButton from './NavButton';
import Routes from './Routes';

class Featured extends Component{
  render(){
    return (
      <View style={styles.container}>
        {Routes.navigator('feature')}
      </View>
      //<Navigator
        // sceneStyle={styles.container}
        // // 指定初始路由
        // initialRoute={{
        //   name: 'Featured Books',
        //   component: BookList,
        // }}
        // // 指定页面间跳转的动画
        // configureSence={(route) => {
        //   return Navigator.SceneConfigs.VerticalDownSwipeJump;
        // }}
        // // 用来渲染指定路由的场景,参数为路由和导航器
        // // route 里面就是 name 和 component
        // renderScene={(route, navigator)=>{
        //   let Component = route.component;
        //   // 参数为向下传递的参数，和向下传递的 navigatior
        //   return (
        //       <Component {...route.params} navigator={navigator}/>
        //     )
        // }}
        // navigatorBar = {
        //   <Navigator.NavigationBar
        //     routeMapper={NavigationBarRouteMapper}
        //     style={styles.navBar}
        //   />
        // }
      ///>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  navBar: {
    backgroundColor: '#FFF',
  },
})

module.exports = Featured;   // 将模块导出