import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

class BookDetail extends Component{
  constructor(props){
    super(props);
    let PropTypes ={
      detail: React.PropTypes.object,
    }
  }
  render(){
    // console.log('enter BookDetail');
    const book = this.props.detail;   // 由前面传递的属性
    // console.log(book);
    // console.log(book.volumeInfo);
    // 判断 ImageURI 是否存在
    const imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined') ? book.volumeInfo.imageLinks.thumbnail : '';
    // const imageURI = book.volumeInfo.imageLinks.thumbnail;
    const description = (typeof book.volumeInfo.description !== 'undefined') ? book.volumeInfo.description : '';
    // console.log('!!!'+imageURI+" "+description);
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