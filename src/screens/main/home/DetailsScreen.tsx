import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../../redux/store/store'
import { getDataById, handleFavorite } from '../../../redux/slices/PlacesSlice'
import LoadingComponent from '../../../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const DetailsScreen = ({ props, navigation, route }: any,) => {

  const id = route.params

  const [isLoading, setisLoading] = useState(true)
  const dispatch = useDispatch<AppDispatch>()
  const { favorites,place } = useSelector((state: StateType) => state.PlacesSlice)
  const {theme}= useSelector((state:StateType)=>state.SettingsSlice)

  useEffect(() => {
    dispatch(getDataById(id)).then(() => {
      setisLoading(false)
    })

  }, [])
  const openLink = async (url: string) => {
    Linking.openURL(url)
  }

  return (
    isLoading ? <LoadingComponent /> : <View style={[styles.container,{ backgroundColor:theme == 'light'? '#F9FAEA':'#000000', }]}>

      <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />
      
      <View>
        <Image style={styles.image} source={{ uri: place.placeImage }} />
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={styles.backicon}>
          <Ionicons name='chevron-back-outline' size={35} color={'black'} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
        <View>
          <Text style={[styles.placeName, { fontSize: 22,color:theme=='light'?'black':'white' }]}>{place.placeName},</Text>
          <Text style={[styles.placeName, { fontSize: 16,color:theme=='light'?'black':'white' }]}>{place.locationName}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => dispatch(handleFavorite(place))}>
            <MaterialIcons name='favorite' size={28} color={favorites.find((c: any) => c._id == place._id) ? 'red' : theme == 'light'?'black':'white'} />
          </TouchableOpacity>
        </View>


      </View>
      <View style={{ marginTop: '10%', }}>
        <Text style={[styles.detailtext, { alignSelf: 'center',color:theme == 'light'?'black':'white' }]}>{place.placeDetails}</Text>

      </View>
      <View style={{ marginTop: '10%',  }}>
        <Text style={[styles.infotext,{color:theme == 'light'?'black':'white'}]}>Ratings :  {place.placeRating}</Text>
        <Text style={[styles.infotext,{color:theme == 'light'?'black':'white'}]}>✆ {place.contactInfo}</Text>
        <TouchableOpacity onPress={() => openLink(place.websiteInfo)}>
          <Text style={[styles.infotext, { borderBottomWidth: 0.8,borderBottomColor:theme=='light'?'black':'white',color:theme == 'light'?'black':'white' }]}>{place.websiteInfo}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttoncontainer}>
        <TouchableOpacity onPress={()=>openLink(`http://www.google.com/maps/place/${place.longitude},${place.latitude}`)}>
          <Text style={styles.buttontext}>Go To Map</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAEA',
    paddingHorizontal: 8
  },
  backicon: {
    position: 'absolute',
    top: 7,
    left: 7,
    color: 'black',
    borderRadius: 40,
    backgroundColor: '#F9FAEA'
  },
  buttoncontainer:{
    position:'absolute',
    bottom:'10%',
    paddingHorizontal:'30%',
    alignSelf:'center',
    padding:10,
    backgroundColor:'#474747',
    borderRadius:12,
    marginTop:'10%',

  },
  buttontext:{
    alignSelf:'center',
    color:'white',
    fontSize:20,
    fontFamily:'OpenSans-Regular'
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 10

  },
  logoimage: {
    resizeMode: 'contain',
    height: '10%',
    alignSelf: 'center'
  },
  placeName: {
    alignSelf: 'baseline',
    fontWeight: '400',
    fontFamily: 'BebasNeue-Regular'
  },
  detailtext: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 13  ,
  },
  infotext: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 14,
    alignSelf: 'baseline'
  }
})