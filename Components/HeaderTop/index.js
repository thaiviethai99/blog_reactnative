import React, { Component } from "react";
import { Header,Icon,Left,Right,Body,Title,Button } from "native-base";
class index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="list" onPress={() => this.props.navigation.toggleDrawer()}/>
          </Button>
        </Left>
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

export default index;
