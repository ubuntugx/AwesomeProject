import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
class Routes extends Component{
  render(){
    return(
      <TouchableOpacity
        onPress={()=>navigator.pop()}
        style={styles.navBarLeftButton}>
        <Icon
          name='rocket'
          // name='ios-arrow-back'
          size='30'
          style={{marginTop: 8}}
          color='#0000FF'
        />
        <Text>aaa</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  navBarLeftButton:{
    paddingLeft: 10,
    width: 40,
    height: 40
  }
})

module.exports = BookDetail;