import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'

export default class updateLogsContainer extends Component {
  static right = (props) => {
    return (
      <TouchableOpacity onPress={() => props.sortButton()}>
        <View style={{ width: 24, height: 24, marginRight: 25, }} />
      </TouchableOpacity >
    );
  }
  render() {
    return (
      <View style={{ margin: 10 }}>
        <ScrollView>

          <Text>1. Initial Release (MVP) 1.0.0  🔱</Text>
          <View style={{ margin: 10 }}></View>

          <Text> - Coin listings </Text>
          <Text> - Coin Graph </Text>
          <Text> - Coin Details </Text>
          <Text> - Search Coins </Text>
          <Text> - Tabar Navigation </Text>
          <View style={{ margin: 10 }}></View>

          <Text>2. Release 2.0.0 ⚜️</Text>
          <View style={{ margin: 10 }}></View>

          <Text> - Favourite coins </Text>
          <Text> - Database storage </Text>
          <Text> - Faster network access </Text>
          <Text> - Fixed UI bugs </Text>

          <View style={{ margin: 10 }}></View>

          <Text>3. Release 3.0.0 🌀</Text>
          <View style={{ margin: 10 }}></View>

          <Text> - Hero/Zero</Text>
          <Text> - Improved performance by 200% </Text>
          <Text> - Added sidebar navigation</Text>
          <Text> - Added update logs for users </Text>
          <Text> - Added share </Text>

          <View style={{ margin: 10 }}></View>

          <Text>Roadmap 🏁</Text>
          <View style={{ margin: 10 }}></View>

          <Text> * Improve sorting speed (next release)</Text>
          <Text> * Profile page viewing growth/loss  (next release)</Text>
          <Text> * AI for predicting market growth (comming soon)</Text>
          <Text> * Find coin conversion rate and charges (comming soon)</Text>
          <Text> * More.. </Text>

          <View style={{ margin: 10 }}></View>

          <Text>Thanks for your support and love 💖</Text>
          <View style={{ margin: 10 }}></View>
          <Text> * Support us by sharing the app.</Text>
          <Text> * If you liked the app support us by rating.</Text>

        </ScrollView>
      </View>
    )
  }
}