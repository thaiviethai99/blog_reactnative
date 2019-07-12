import React, { Component } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Header,
  Body,
  Title,
  Icon,
  Left,
  Right
} from "native-base";
import TimeAgo from "react-native-timeago";
import config from "../../Config/index";
import HTML from "react-native-render-html";
import { fonts } from "../../utils/fonts";
import HeaderTop from "../../Components/HeaderTop/index";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: "",
      status: "No Page Loaded",
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      scalesPageToFit: true,
      url: "",
      wpid: 0,
      refreshing: false
    };
  }

  fetchDetails = () => {
    this.setState({
      wpid: this.props.navigation.state.params.item.id
    });
    return fetch(
      config.url +
        "wp-json/wp/v2/posts/" +
        this.props.navigation.state.params.item.id
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // console.log(responseJson.title.rendered);
        console.log(responseJson.link);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          url: responseJson.link
        });
        //console.log(this.state.wpid);
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.fetchDetails();
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchDetails().then(() => {
      this.setState({ refreshing: false });
    });
    this._updateList().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <ActivityIndicator
            animating={true}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              color: "#041A33",
              height: 80
            }}
            size="large"
          />
        </View>
      );
    }
    return (
      <Container>
       <Header>
       <Left style={{
           flex:1,
           flexDirection:'row',
           alignItems:'center'
           }}>
            <Button 
            transparent onPress={() => this.props.navigation.navigate("Home")}>
              <Icon name='arrow-back' />
            </Button>
            <Text style={{color:'white'}} onPress={() => this.props.navigation.navigate("Home")}>Back</Text>
          </Left>
          
        </Header>
        <Content>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
            <View style={{ height: 250 }}>
              <ImageBackground
                // uri:this.props.navigation.state.params.item.featured_media !=0 ? this.props.navigation.state.params.item._embedded["wp:featuredmedia"]["0"].source_url : " "
                source={
                  this.props.navigation.state.params.item.featured_media != 0
                    ? {
                        uri: this.props.navigation.state.params.item._embedded[
                          "wp:featuredmedia"
                        ]["0"].source_url
                      }
                    : require("../../image/img_not_found.jpg")
                }
                style={{ flex: 1 }}
              >
                
              </ImageBackground>
            </View>

            <View style={{ marginHorizontal: 15 }}>
              <View
                style={{ flex: 1, flexDirection: "column", marginVertical: 10 }}
              >
                {/* <Text
                extraStyle={{ fontSize: 18, color: "#041A33" }}
                Text={this.props.navigation.state.params.item.title.rendered}
              /> */}
                <HTML
                  html={this.props.navigation.state.params.item.title.rendered}
                  tagsStyles={{
                    resizeMode: "contain"
                  }}
                  baseFontStyle={{
                    color: "#041A33",
                    fontFamily: fonts.PoppinsSemiBold,
                    fontSize: 18
                  }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <HTML
                  html={
                    this.props.navigation.state.params.item._embedded[
                      "wp:term"
                    ][0][0]["name"]
                  }
                  tagsStyles={{
                    resizeMode: "contain"
                  }}
                  baseFontStyle={{
                    color: "#6E7886",
                    fontFamily: fonts.PoppinsSemiBold,
                    fontSize: 14,
                    justifyContent: "center"
                  }}
                />
                <Text>-</Text>
                <TimeAgo time={this.props.navigation.state.params.item.date} />
              </View>
              <HTML
                //set Video width
                alterChildren={node => {
                  if (node.name === "iframe") {
                    delete node.attribs.width;
                    delete node.attribs.height;
                  }
                  return node.children;
                }}
                html={this.props.navigation.state.params.item.content.rendered}
                staticContentMaxWidth={Dimensions.get("window").width}
                imagesMaxWidth={Dimensions.get("window").width}
                onLinkPress={(evt, href) => {
                  Linking.openURL(href);
                }}
                tagsStyles={{
                  resizeMode: "contain"
                }}
                baseFontStyle={{
                  color: "#041A33",
                  fontFamily: fonts.PoppinsRegular
                }}
                ignoredStyles={["height", "width"]}
              />
            </View>
          </ScrollView>
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
