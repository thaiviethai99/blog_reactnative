import React, { Component } from "react";
import {Text} from "react-native";
import { Header,Icon,Left,Right,Body,Title,Button } from "native-base";
class index extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }

  componentWillReceiveProps(){
     
  }

  componentDidUpdate(){
    alert('cateid'+this.props.cateId);
  }

  render() {
    return (
        <Text>
          Cate data
        </Text>
    );
  }
}

export default index;
