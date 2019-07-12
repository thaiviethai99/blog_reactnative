import React, { Component } from 'react';
import {StyleSheet,View,Text,Button} from 'react-native';
import DrawerMenu from './Screens/DrawerMenu/index';
import Home from './Screens/Home/index';
import Detail from './Screens/Detail/index';
import News from './Screens/News/index';
import CateListPost from './Screens/CateListPost/index';
import {
  DrawerActions,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  HeaderBackButton
} from "react-navigation";


class HomeFirst extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Home {...this.props}/>
    );
  }
}


const HomeDrawer = createDrawerNavigator(
  {
    Home: {
      name: "HomeFirst",
      screen: HomeFirst
    },
    Detail: {
      name: "Detail",
      screen: Detail
    },
    News: {
      name: "News",
      screen: News
    },
    CateListPost: {
      name: "CateListPost",
      screen: CateListPost
    },
  },
  {
    contentComponent: props => <DrawerMenu {...props} />
  }
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default createAppContainer(HomeDrawer);