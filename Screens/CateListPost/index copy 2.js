import React, { Component } from "react";
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import {
  Text,
  Container,
  Content,
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
import TimeAgo from "react-native-timeago";
import config from "../../Config/index";
import { fonts } from "../../utils/fonts";
import HeaderTop from "../../Components/HeaderTop/index";
import Footer from "../../Components/Footer/index";
let moment = require("moment"); //load moment module to set local language
require("moment/locale/vi"); //for import moment local language file during the application build
moment.locale("vi");
//var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //API data store
      dataCate: [],
      isLoading: true,
      //search value store
      status: true,
      status2: false,
      text: "",
      url: "",
      image: "",
      refreshing: false,
    };
  }

  
  componentDidMount() {
    this.LatestNews();
  }
  

  LatestNews = () => {
    fetch(config.url + "wp-json/wp/v2/posts?categories="+this.props.navigation.getParam('cateId', 'NO-ID')+"&_embed")
      .then(response => response.json())
      .then(responseJson => {
        console.log("response2:");
        console.log(responseJson);

        if (responseJson != null) {
          this.setState({
            isLoading: false,
            dataCate: responseJson,
            url: responseJson.link
          });
          if (this.state.data != null) {
            console.log("==============>");
            console.log(this.state.dataCate);

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
   // alert('cateid'+this.props.navigation.getParam('cateId', 'NO-ID'))
    const tagsStyles = {
      lineHeight: 1.5
    };
    const baseFontStyle = {
      color: "#041A33",
      fontFamily: fonts.PoppinsSemiBold,
      fontSize: 16,
      textAlign: "justify",
      textAlignVertical: "center",
      padding: 5
    };
    return (
      <Container>
        <HeaderTop {...this.props} />
        <Content style={{ backgroundColor: "#d7d1d1" }}>
          <FlatList
            data={this.state.dataCate}
            renderItem={({ item }) => (
              <List style={{ backgroundColor: "#fff" }}>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail
                      square
                      source={
                        item.featured_media != 0
                          ? {
                              uri:
                                item._embedded["wp:featuredmedia"]["0"]
                                  .source_url
                            }
                          : require("../../image/img_not_found.jpg")
                      }
                    />
                  </Left>
                  <Body>
                    <HTML
                      html={truncate(item.title.rendered, {
                        length: 50,
                        stripTags: true
                      })}
                      numberOfLines={1}
                      tagsStyles={tagsStyles}
                      allowFontScaling
                      baseFontStyle={baseFontStyle}
                    />
                    <TimeAgo time={item.date} hideAgo={true} />
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() =>
                        this.props.navigation.navigate("Detail", {
                          item
                        })
                      }
                    >
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={1}
          />
        </Content>
        <Footer {...this.props} />
      </Container>
    );
  }
}
