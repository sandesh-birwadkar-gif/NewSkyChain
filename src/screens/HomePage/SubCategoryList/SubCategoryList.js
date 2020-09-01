import React, { Component } from 'react';
import {
    View, Text, Image,
    SafeAreaView,TouchableOpacity,
    FlatList, ImageBackground
} from 'react-native';
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
import IconPack from '@login/IconPack';
import _CustomHeader from '@customHeader/_CustomHeader'


export default class SubCategoryList extends Component {
    constructor(props) {
        super(props);
        const data = this.props.route.params.subcategory;

        this.state = {
            subcategoryData: data
        };
    }

    subcategoryView = (item, index) => {
        console.log("item----", item);
        let baseUrl = 'http://jewel.jewelmarts.in/public/backend/collection/'

        return (
            <TouchableOpacity onPress={()=>this.getProductGridOrNot(item)}>
                <Animatable.View animation="flipInX" style={{ paddingTop: hp(0.5), paddingBottom: hp(0.5) }}>
                    <View style={{ flexDirection: 'row', flex: 1, marginLeft: hp(2), marginRight: hp(2) }}>
                        <View style={{ flex: 0.25, justifyContent: 'flex-start', }}>
                            <Image
                                style={{
                                    height: hp(10), width: hp(10), borderRadius: 10,
                                    borderWidth: 0.4, borderColor: color.gray
                                }}
                                source={{ uri: baseUrl + item.image_name }}
                                defaultSource={require('../../../assets/image/default.png')}
                            />
                        </View>

                        <View style={{ alignContent: 'center', justifyContent: 'center', flex: 0.70 }}>
                            <_Text numberOfLines={2} fwPrimary
                                //textColor={color.white}
                                fsMedium style={{ marginRight: hp(3) }}>
                                {item.col_name && capitalizeFirstLetter(item.col_name)}
                            </_Text>
                        </View>
                    </View>
                        <View
                            style={{
                                paddingTop: hp(0.8), marginLeft: wp(22), marginRight: wp(3),
                                alignSelf: 'stretch',
                                borderBottomColor: '#D3D3D3',
                                borderBottomWidth: 1,
                            }}
                        />
                </Animatable.View>
            </TouchableOpacity>
        )
    }

    getProductGridOrNot = (data) => {
        console.log("data----", data);
        if (data.subcategory.length === 0) {
            this.props.navigation.navigate("ProductGrid", { gridData: data })
        } else if (data.subcategory.length > 0) {
            this.props.navigation.navigate("SubCategoryList",{subcategory:data})
        }
    }


    render() {
        const { subcategoryData } = this.state
        return (
                <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
                    <_CustomHeader
                        Title={'Sub Category'}
                        RightBtnIcon1={require('../../../assets/image/BlueIcons/Search.png')}
                        RightBtnIcon2={require('../../../assets/image/BlueIcons/Notification.png')}
                        LeftBtnPress={() => this.props.navigation.goBack()}
                        RightBtnPressOne={()=> this.props.navigation.navigate('SearchScreen')}
                        RightBtnPressTwo={()=> this.props.navigation.navigate('Notification')}
                        rightIconHeight2={hp(3.5)}
                        LeftBtnPress={() => this.props.navigation.goBack()}
                    />
                   
                        <View style={{ justifyContent: 'center', width: wp(100), paddingVertical:  hp(1) }}>
                            <FlatList
                                onRefresh={() => alert('inProgress')}
                                refreshing={false}
                                data={subcategoryData.subcategory && subcategoryData.subcategory}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => (
                                    this.subcategoryView(item, index)
                                )}
                            />
                        </View>
                </SafeAreaView>

        );
    }
}
