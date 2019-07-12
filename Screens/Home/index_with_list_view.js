import React, { Component } from "react";
import {
  View,
  ScrollView,
  ListView,
  Text,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Thumbnail
} from "native-base";
import HTML from "react-native-render-html";
import truncate from "truncate-html";
import TimeAgo from 'react-native-timeago';
import config from "../../Config/index";
import TextBold from "../../Components/TextBold/index";
import ListViews from "../../Components/ListView/index";
import HeaderTop from "../../Components/HeaderTop/index";
let moment = require('moment'); //load moment module to set local language
require('moment/locale/vi'); //for import moment local language file during the application build
moment.locale('vi');
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //API data store
      dataSource: ds,
      data: ds,
      isLoading: true,
      //search value store
      status: true,
      status2: false,
      text: "",
      url: "",
      image: "",
      refreshing: false
    };
  }

  componentDidMount() {
    this.fetchNews();
  }
  fetchNews = () => {
    //this.FeatureNews();
    this.LatestNews();
  };

  LatestNews = () => {
    return fetch(config.url + "wp-json/wp/v2/posts?per_page=5&_embed")
      .then(response => response.json())
      .then(responseJson => {
        console.log("response2:");
        console.log(responseJson);

        if (responseJson != null) {
          this.setState({
            isLoading: false,
            data: ds.cloneWithRows(responseJson),
            url: responseJson.link
          });
          if (this.state.data != null) {
            console.log("==============>");
            console.log(this.state.data);

            // image:responseJson[0]._embedded["wp:featuredmedia"]["0"].source_url
          }
        }
        //console.log(responseJson[0]._embedded['wp:term'][0][0]['name']);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <Container>
        <HeaderTop {...this.props} />
        <Content>
          <ListView
            showsVerticalScrollIndicator={false}
            dataSource={this.state.data}
            renderRow={rowData => (
              <List>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail
                      square
                      source={
                        rowData.featured_media != 0
                          ? {
                              uri:
                                rowData._embedded["wp:featuredmedia"]["0"]
                                  .source_url
                            }
                          : require("../../image/img_not_found.jpg")
                      }
                    />
                  </Left>
                  <Body>
                    <HTML
                      html={truncate(rowData.title.rendered, {
                        length: 50,
                        stripTags: true
                      })}
                      numberOfLines={1}
                    />
                    <Text note numberOfLines={1}>
                    <TimeAgo time={rowData.date} hideAgo={true} />
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent  onPress={() =>
                            this.props.navigation.navigate("Detail", {
                              rowData
                            }
                            )
                          }>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            )}
          />
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


