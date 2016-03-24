import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  NavigatorIOS  
} from 'react-native';

import BookList from './BookList';

class Featured extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }
  render(){
    return (
      // 这一段改为 Navigator
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Featured Books',
          component: BookList,     // 初始路径
        }} />
      
    )
  }
}

const styles = StyleSheet.create({
  // description:{
  //   fontSize: 20,             
  //   backgroundColor: '#FFF',
  // },
  // container:{
  //   flex: 1,
  //   justifyContent: 'center',  // 伸缩项目沿主轴线对齐方式
  //   alignItems: 'center',      // 伸缩项目沿垂直轴对齐方式
  // }
  container:{
    flex: 1,
  }
})

module.exports = Featured;   // 将模块导出
// AppRegistry.registerComponent('Featured', () => Featured);