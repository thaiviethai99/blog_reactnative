import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {
  Container,
  Content,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Thumbnail
} from "native-base";
import HeaderTop from "../../Components/HeaderTop/index";
import CateData from "../../Components/CateData/index";
export default class index extends Component {
  render() {
    const { navigation } = this.props;
    const cateId = navigation.getParam('cateId', 'NO-ID');
    return (
      <Container>
        <HeaderTop {...this.props} />
        <Text> {cateId} </Text>
        <CateData cateId={cateId}/>
      </Container>
    );
  }
}
