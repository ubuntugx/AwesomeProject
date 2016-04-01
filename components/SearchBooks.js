import React,{
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native';

import SearchResults from './SearchResults';

class SearchBooks extends Component{
  constructor(props){
    super(props);
    this.state={
      bookAuthor: '',
      bookTitle: '',
      isLoading: false,
      errorMessage: ''
    }
  }
  _bookTitleInput=(event)=>{
    this.setState({ bookTitle: event.nativeEvent.text})
  };
  _bookAuthorInput=(event)=>{
    this.setState({ bookAuthor: event.nativeEvent.text})
  };
  _searchBook=()=>{
    this._fetchData();
  };
  _fetchData=()=>{
    this.setState({ isLoading: true });

    // 直接连的 google 查询
    var baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    if(this.state.bookAuthor!==''){
      baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor)
    }
    if(this.state.bookTitle!==''){
      baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:'+ this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle)
    }
    console.log('URL: >>>' + baseURL);
    fetch(baseURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ isLoading: false });
        if(responseData.items){
          this.props.navigator.push({
            id: 'searchResults',
            obj: {book: responseData.items}
          });
        } else {
          this.setState({errorMessage: 'No Results Found'})
        }
      })
      .catch(error => this.setState({
          isLoading: false,
          errorMessage: error,
      }))
      .done();
  };
  render(){
    let spinner = this.state.isLoading ? (<ActivityIndicatorIOS
      hidden='true'
      size='large' />
    ) : (<View/>)
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Search by book title and/or author</Text>
        <View>
          <Text style={styles.fieldLabel}>Book Title:</Text>
          <TextInput style={styles.searchInput} onChange={this._bookTitleInput}></TextInput>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Author:</Text>
          <TextInput style={styles.searchInput} onChange={this._bookAuthorInput}></TextInput>
        </View>
        <TouchableHighlight
          onPress={this._searchBook}
          style={styles.button}
          underlayColor='#f1c40f'>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
        {spinner}
        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    padding: 10,
  },
  searchInput: {
    height: 36,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    padding: 5
  },
  button: {
    height: 36,
    backgroundColor: '#f39c12',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    alignSelf: 'center',
  },
  instructions: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 15,
    marginTop: 15,
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
    color: '#FF0000',
  }
})

module.exports = SearchBooks;