import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  // Navigator,
} from 'react-native';

import BookList from './BookList';

class Featured extends Component{
  render(){
    return (
      // 子页面中分别需要切换页面，需要用到路由 
      // 这一段改为 Navigator
      <NavigatorIOS
        style={styles.container}
        // 初始化第一个路由
        initialRoute={{
          // 添加标题和关联的组件，这块可以直接写 html  
          title: 'Featured Books',
          component: BookList,     // 初始路径定为 BookList 组件
         }} 
      />
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
        //   return <Component {...route.params} navigator={navigator} />
        // }}
      ///>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})

module.exports = Featured;   // 将模块导出