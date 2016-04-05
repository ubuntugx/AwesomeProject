import React,{
  AppRegistry,
  Component,
  StyleSheet,
  View,
  TabBarIOS,
} from 'react-native';

import Featured from './components/Featured';   // 精选模块
import Search from './components/Search';       // 搜索模块

class IDBTest extends Component{
  constructor(props){
    super(props);
    this.state={
      seletedTab: 'featured',
    }
  }
  render(){
    return(
      // 主页面加标签栏，关联的页面分别为两个子页面
      <TabBarIOS>
        <TabBarIOS.Item
          selected={this.state.seletedTab==='featured'}
          onPress={()=>{
            this.setState({seletedTab: 'featured'})
          }}
          systemIcon='featured'>
            <Featured />
          </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.seletedTab==='search'}
          onPress={()=>{
            this.setState({seletedTab: 'search'})
          }}
          systemIcon='search'>
            <Search />
          </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('IDBTest', () => IDBTest);