import React, { Component } from "react";
import { Footer, FooterTab, Button, Text, Icon } from "native-base";
class index extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical onPress={() =>
                        this.props.navigation.navigate("News")
                      }>
            <Icon name="apps" />
            <Text>News</Text>
          </Button>
          <Button vertical>
            <Icon name="camera" />
            <Text>Video</Text>
          </Button>
          <Button vertical active>
            <Icon active name="navigate" />
            <Text>Popular</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default index;
