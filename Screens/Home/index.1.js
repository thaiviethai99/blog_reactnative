import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import HeaderTop from '../../Components/HeaderTop/index';
export default class index extends Component {
    constructor(props) {
        super(props);
      }
  render() {
    return (
      <Container>
        <HeaderTop {...this.props}/>
        <Content>
          <Text>
            This is Content Section 3333
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

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
