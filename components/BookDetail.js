import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import NavButton from './NavButton';

class BookDetail extends Component{
  // constructor(props){
  //   super(props);
  //   this.state={
  //   }
  // }

  render(){
    console.log('props'+this.props.book)
    const book = this.props.book;   // 由前面传递的属性
    // 判断 ImageURI 是否存在
    const imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    const description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
    return(
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{uri: imageURI}} />
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center',
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

module.exports = BookDetail;