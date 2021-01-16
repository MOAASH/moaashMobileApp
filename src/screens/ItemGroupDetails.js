import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';

import Colors from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CategoriesList from '../components/CategoriesList';
import AdSlider from '../components/AdSlider';
import QualityBanner from '../components/QualityBanner';
import WhatsappPopup from '../components/WhatsappPopup';
import Loader from '../components/Loader';
import ItemsList from '../components/ItemsList';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
@inject('User')
@inject('Products')
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharing: false,
      itemsData: {},
      itemGroupData: {},
      loaded: true,
    };
  }

  componentDidMount = async () => {
    console.log(
      'item group details and items are ',
      this.props.navigation.state.params.groupID,
    );
    // console.log('result is  ', result);

    this.getItemGroups();
  };
  getItemGroups = async () => {
    let gettingItem = await this.props.Products.getItems(
      this.props.navigation.state.params.groupID,
    );
    console.log(
      'item data ',
      this.props.Products.items.item_group_data.data.attributes.name,
    );
    this.setState({
      itemsData: this.props.Products.items.items_data,
      itemGroupData: this.props.Products.items.item_group_data.data,
      loaded: false,
    });
  };
  shareProduct = async () => {
    this.setState({sharing: true});
  };
  hidePopup = async () => {
    this.setState({sharing: false});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{marginBottom: SCREEN_HEIGHT / 18}}>
          <View style={{paddingHorizontal: 12, paddingTop: 12}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              {this.props.Products.items.item_group_data.data.attributes.name}
            </Text>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              <HTML
                source={{
                  html: this.props.Products.items.item_group_data.data
                    .attributes.description,
                }}
                contentWidth={SCREEN_WIDTH}
                style={{fontSize: 18, fontWeight: '600'}}
                containerStyle={{paddingTop: 12}}
                tagsStyles={
                  (div = {
                    textAlign: 'center',
                    fontStyle: 'italic',
                    color: 'grey',
                  })
                }
              />
            </Text>
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            data={this.props.Products.items.items_data}
            renderItem={(item) => (
              <ItemsList
                Products={item}
                scrollEnabled={false}
                navigation={this.props.navigation}
              />
            )}
          />
        </ScrollView>
        {this.state.sharing && <WhatsappPopup hidePopup={this.hidePopup} />}
        {this.state.loaded && <Loader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputStyle: {
    paddingHorizontal: 10,
    shadowColor: 'black',
    borderColor: Colors.color2,
    borderWidth: 1,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 12,
    backgroundColor: Colors.lightGray,
    marginBottom: 8,
    color: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
  productCard: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderColor: Colors.color5,
    paddingVertical: 8,
    marginBottom: 8,
  },
});
