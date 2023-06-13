import { Dimensions, FlatList, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import Card from '../../../components/Card'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../../redux/store/store';
import { getCount, getData } from '../../../redux/slices/PlacesSlice';
import LoadingComponent from '../../../components/Loading';
import MovingCard from '../../../components/MovingCard';



const HomeScreen = ({ navigation }: any) => {

  const [isLoading, setisLoading] = useState(true)
  const flatListRef = useRef(null);
  const { theme, language } = useSelector((state: StateType) => state.SettingsSlice);
  const dispatch = useDispatch<AppDispatch>();

  const { data, counter } = useSelector((state: StateType) => state.PlacesSlice)
  const { loginStatus } = useSelector((state: StateType) => state.SettingsSlice)


  const renderItemHor = ({ item }: any) => {

    const GoToDetails = (item: any) => {

      navigation.navigate('PlacesDetails', item._id)
    }

    return (
      <TouchableOpacity  >
        <MovingCard item={item} GoToDetails={() => GoToDetails(item)} />
      </TouchableOpacity>
    )
  }
  const renderItemVer = ({ item }: any) => {

    const GoToDetails = (item: any) => {

      navigation.navigate('PlacesDetails', item._id)
    }

    return (
      <TouchableOpacity >
        <Card item={item} GoToDetails={() => GoToDetails(item)} />
      </TouchableOpacity>
    )
  }
  const scrollToIndex = (index: any) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };
  useEffect(() => {
    dispatch(getData()).then(() => {
      setisLoading(false)

    })

  }, [])

  useEffect(() => {

    let currentIndex = 0;


    const interval = setInterval(() => {
      scrollToIndex(currentIndex);
      currentIndex++;

      if (currentIndex === data.length) {
        currentIndex = 0;
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);


  return (

    isLoading ? <LoadingComponent /> : <View style={[styles.container, { backgroundColor: theme == 'light' ? '#F9FAEA' : '#000000', }]}>

      <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />


      <View>
        <Text style={{ fontSize: 28, color: theme == 'light' ? 'black' : 'white', fontWeight: '500', fontFamily: 'Pacifico-Regular' }}>Discover Places</Text>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          data={data}
          renderItem={renderItemHor}

        />
      </View>
      <View>
        <Text style={{ fontSize: 28, color: theme == 'light' ? 'black' : 'white', fontWeight: '500', fontFamily: 'Pacifico-Regular' }}>All Places</Text>
      </View>
      <View style={styles.listver}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          data={data}
          renderItem={renderItemVer}
          contentContainerStyle={styles.flatListContainer}

        />
      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  logo: {
    alignItems: 'center',

  },
  flatListContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  logoimage: {
    resizeMode: 'contain',
    height: '10%',
    alignSelf: 'center'
  },

  listver: {
    height: '40%'
  }
})