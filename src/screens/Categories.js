import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import axios from '../utils/axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../utils/colors';
import Fonts from '../utils/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {inject} from 'mobx-react';
import CustomButton from '../components/CustomButton';
import CategoriesType from '../components/CategoriesType';
import tailwind from 'tailwind-rn';

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);
const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

@inject('Products')
export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories_data: null
    }
  }

  componentDidMount = async () => {
    // console.log('Starting the app');
    let [response_fetched, categories] = await this.props.Products.getCategories();
    let categories_data = {}
    if (response_fetched){
      // categories.forEach((category) => {
      //   if (categories_data[`${category.attributes.category_name}`]){
      //     categories_data[`${category.attributes.category_name}`].push(category);
      //   } else {
      //     categories_data[`${category.attributes.category_name}`] = []
      //     categories_data[`${category.attributes.category_name}`].push(category);
      //   }
      // });
      await this.setState({ categories_data: categories });
    }
    // console.log('Categories ------> ', JSON.stringify(this.state.categories_data));

  };
  
  showCategorisedCatalogue = async (sub_category_id) => {
    console.log('ExtraParams', `&sub_category_id=${sub_category_id}`)
    this.props.navigation.navigate('CategorisedCatalogues', {
      extra_params: `&sub_category_id=${sub_category_id}`
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>Categories</Text>
        </View>
          {/* <CategoriesType /> */}
          
            <View
              style={{
                flex: 1,
                padding: 12,
                marginBottom: 24
              }}>
                {this.state.categories_data && (
                //  Object.keys(this.state.categories_data).map((category) => {
                //    return(
                //      this.state.categories_data[category].map((sub_category) => {
                //        return (
                //        <TouchableOpacity style={{paddingBottom: 12}}>
                //        <Image
                //          source={require('../../assets/new.png')}
                //          style={{width: 40, height: 40, alignSelf: 'center'}}
                //        />
                //        <Text
                //          style={{alignSelf: 'center', fontSize: 12, paddingTop: 6}}>
                //          {sub_category.attributes.name}
                //        </Text>
                //      </TouchableOpacity>
                //        )
                //      })
                //   )
                // })
                <FlatList
                data={this.state.categories_data}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 10,
                      backgroundColor: Colors.white,
                    }}
                  />
                )}
                ListFooterComponent={() => (
                  <View style={{paddingBottom: 24}} />
                )}
                renderItem={({item}) => (
                  <TouchableOpacity 
                  activeOpacity={1}
                  onPress={ () => this.showCategorisedCatalogue(item.attributes.id)}
                  style={{
                    padding: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderColor: Colors.lightGray2,
                    borderRadius: 10,
                  }}>
                    <Text>{item.attributes.category_name} - {item.attributes.name}</Text>
                    <TouchableOpacity onPress={ () => this.showCategorisedCatalogue(item.attributes.id)}>
                      <FontAwesome
                        name="arrow-circle-o-right"
                        size={28}
                        color={Colors.color5}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
              )}
            </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  header: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.borderGray,
    borderBottomWidth: 1,
  },
});
