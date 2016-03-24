import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class BookDetail extends Component{
  render(){
    const book = this.props.book;
    const imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    const description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
    return(
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: imageURI}} />
        <Text style={styles.description}>{description}</Text>
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
})

module.exports = BookDetail;