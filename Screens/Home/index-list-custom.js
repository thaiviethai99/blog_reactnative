import React, { Component } from "react";
import {
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image,
  Text,
  TextInput,
  Share,
  ActivityIndicator,
  RefreshControl,
  StyleSheet
} from "react-native";
import { Container, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon} from 'native-base';
import config from "../../Config/index";
import TextBold from "../../Components/TextBold/index";
import ListViews from "../../Components/ListView/index";
import HeaderTop from '../../Components/HeaderTop/index';
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
        <View >
              <TextBold  Text="Latest update" />
              <View
                cornerRadius={5}
                cardElevation={2}
                cardMaxElevation={2}
                style={{ marginTop: 15, marginBottom: 50 }}
              >
                <ListView
                  showsVerticalScrollIndicator={false}
                  dataSource={this.state.data}
                  renderRow={rowData => (
                    <View
                      style={{
                        flexDirection: "column",
                        flex: 1,
                        borderBottomColor: "#E4ECF5",
                        borderBottomWidth: 0.95,
                        marginBottom: 10
                      }}
                    >
                      <View style={{ flex: 0.6 }}>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("Details", {
                              rowData
                            })
                          }
                        >
                          <ListViews
                            Categories={
                              rowData._embedded["wp:term"][0][0]["name"]
                            }
                            Title={rowData.title.rendered}
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
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
