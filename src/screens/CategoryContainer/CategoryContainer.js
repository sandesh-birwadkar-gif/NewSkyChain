import React, { Component } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ImageBackground, SafeAreaView,
  Image, TouchableOpacity, ActivityIndicator
}
  from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import _Text from '@text/_Text';
import { strings } from '@values/strings';
import { color } from '@values/colors';
import { capitalizeFirstLetter } from "@values/validate";
import _Header from '@header/_Header'
import * as Animatable from 'react-native-animatable';
import _CustomHeader from '@customHeader/_CustomHeader'
import _Container from '@container/_Container';
import { connect } from 'react-redux';



const LIST = [
  { id: '1', name: 'Choco Chains' },
  { id: '2', name: 'Choco Chains' },
  { id: '3', name: 'Choco Chains' },
  { id: '4', name: 'Choco Chains' },
  { id: '5', name: 'Choco Chains' },
  { id: '6', name: 'Choco Chains' },
  { id: '7', name: 'Choco Chains' },
  { id: '8', name: 'Choco Chains' },
  { id: '9', name: 'Choco Chains' },
  { id: '1', name: 'Choco Chains' }


]

class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    const collection = this.props.route ? this.props.route.params.collection : [];
    const fromSeeMore = this.props.route ? this.props.route.params.fromSeeMore : false

    this.state = {
      categories: collection,
      fromSeeMore: fromSeeMore,
      successHomePageVersion: 0,
      errorHomePageVersion: 0,

    };
  }

  componentDidMount = () => {
    const { homePageData } = this.props
    const { fromSeeMore } = this.state

    if (!fromSeeMore && homePageData.collection && (homePageData.collection).length > 0) {
      this.setState({
        categories: homePageData.collection
      })
    }

  }


  showToast = (msg, type, duration) => {
    Toast.show({
      text: msg ? msg : 'Server error, Please try again',
      type: type ? type : 'danger',
      duration: duration ? duration : 2500,
    });
  };


  showNotification = () => {
    alert('showNotification from category')
  }

  onSearchPress = () => {
    alert('onSearch from category')
  }

  renderLoader = () => {
    return (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" color={color.brandColor} />
      </View>
    );
  };

  getProductGridOrNot = (data) => {
    if (data.subcategory.length === 0) {
      this.props.navigation.navigate("ProductGrid", { gridData: data })
    } else if (data.subcategory.length > 0) {
      this.props.navigation.navigate("SubCategoryList", { subcategory: data })
    }
  }

  
  noDataFound = (msg) => {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center', bottom: hp(5) }}>
        <Image
          source={require("../../assets/gif/noData.gif")}
          style={{ height: hp(20), width: hp(20) }}
        />
        <Text style={{ fontSize: 18, fontWeight: '400',textAlign:'center' }}>{msg}</Text>
      </View>
    )
  }



  render() {
    const { categories, fromSeeMore } = this.state

    let baseUrl = 'http://jewel.jewelmarts.in/public/backend/collection/'

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>

        {fromSeeMore &&
          <_CustomHeader
            Title={'Category'}
            RightBtnIcon1={require('../../assets/image/BlueIcons/Search.png')}
            RightBtnIcon2={require('../../assets/image/BlueIcons/Notification.png')}
            LeftBtnPress={() => this.props.navigation.goBack()}
            RightBtnPressOne={()=> this.props.navigation.navigate('SearchScreen')}
            RightBtnPressTwo={()=> this.props.navigation.navigate('Notification')}
            rightIconHeight2={hp(3.5)}
            LeftBtnPress={() => this.props.navigation.goBack()}
          />}

        <View style={{
          justifyContent: 'center', width: wp(100),
          marginBottom: !fromSeeMore ? 0 : hp(9)
        }}>
          <FlatList
            onRefresh={() => alert("inProgress")}
            refreshing={false}
            data={categories && categories}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => this.getProductGridOrNot(item)}>
                <Animatable.View animation="flipInX" style={{ paddingTop: hp(1), paddingBottom: hp(0.5) }}>
                  <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(2), marginRight: hp(2) }}>
                    <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                      <Image
                        style={{
                          height: hp(10), width: hp(10), borderRadius: 10,
                          borderWidth: 0.4, borderColor: color.gray
                        }}
                        source={{ uri: baseUrl + item.image_name }}
                        defaultSource={require('../../assets/image/default.png')}
                      />
                    </View>

                    <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.70 }}>
                      <_Text numberOfLines={2} fwPrimary
                        //textColor={color.white}
                        fsMedium style={{ marginRight: hp(3), marginLeft: Platform.OS === 'ios' ? hp(1) : 0 }}>
                        {capitalizeFirstLetter(item.col_name)}
                      </_Text>
                    </View>
                  </View>
                  {index !== 9 &&
                    <View
                      style={{
                        paddingTop: hp(1), marginLeft: wp(22), marginRight: wp(3),
                        alignSelf: 'stretch',
                        borderBottomColor: '#D3D3D3',
                        borderBottomWidth: 1,
                      }}
                    />}
                </Animatable.View>
              </TouchableOpacity>
            )
            }
          />
        </View>

        {(!categories || categories.length === 0) ? this.noDataFound(this.props.errorMsg) : null}

      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  loaderView: {
    position: 'absolute',
    height: hp(80),
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  }
});


function mapStateToProps(state) {
  return {
    isFetching: state.homePageReducer.isFetching,
    error: state.homePageReducer.error,
    errorMsg: state.homePageReducer.errorMsg,
    successHomePageVersion: state.homePageReducer.successHomePageVersion,
    errorHomePageVersion: state.homePageReducer.errorHomePageVersion,
    homePageData: state.homePageReducer.homePageData,
  };
}

export default connect(mapStateToProps, null)(CategoryContainer);
 