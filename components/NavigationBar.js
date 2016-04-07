import React,{
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class NavigationBar extends Component{
  render(){
    // underlayColor 有触摸操作时显示的底层的颜色
    return(
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.button}
        underlayColor='#B5B5B5'>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText:{
    fontSize: 17,
    fontWeight: '500',
  }
})

module.exports = NavigationBar;