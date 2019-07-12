import React, { Component } from "react";
import styles from "./style";
import { NavigationActions } from "react-navigation";
import {
  ScrollView,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";

class index extends Component {
  navigateToScreen = (route,paramVar={}) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: paramVar,
    });
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate(navigateAction);
    //this.props.navigation.closeDrawer();
  };
  render() {
    return (
      <View
        style={{
          marginTop: Platform.OS == "ios" ? 20 : 0,
          backgroundColor: "#fff",
          flex: 1
        }}
      >
        <ScrollView>
          <View style={{ marginTop: 10, marginHorizontal: 30 }}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  color: "#4EC0EC",
                  fontWeight: "bold",
                  marginVertical: 22,
                  marginHorizontal: 10
                }}
              >
                <Text
                  style={[
                    {
                      color: "#787D81",
                      alignSelf: "center",
                      fontSize: 18,
                      justifyContent: "center"
                    },
                    this.props.textStyle
                  ]}
                >
                  <Text style={{ color: "#4A84FC" }}>G</Text>
                  <Text style={{ color: "#E64D37" }}>a</Text>
                  <Text style={{ color: "#FAC700" }}>c</Text>
                  <Text style={{ color: "#508DFC" }}>o</Text>
                  <Text style={{ color: "#4AB24D" }}>d</Text>
                  <Text style={{ color: "#E64D37" }}>e</Text>
                  <Text style={{ color: "#606369" }}>r</Text>
                </Text>
              </Text>
            </View>

            <View style={styles.sectionHeadingStyle} />
            <TouchableOpacity onPress={this.navigateToScreen("Home")}>
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen("CateListPost",{cateId:2})}>
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>Laravel</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen("CateListPost",{cateId:4})}>
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>Linux</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToScreen("CateListPost",{cateId:6})}>
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>ReactJs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen("CateListPost",{cateId:5})}>
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>React Native</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={this.navigateToScreen("CateListPost",{cateId:10})}
            >
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>Flutter</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen("About")}>
              <View style={styles.navSectionStyle}>
                <Text style={styles.navItemStyle}>Giới thiệu</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default index;
