import React,{
  Component,
} from 'react-native';

import Routes from './Routes';

class Search extends Component{
  // constructor(props){
  //   super(props);
  //   this.state={
  //   }
  // }
  render(){
    return(
      Routes.navigator('search')
    )
  }
}

module.exports = Search;