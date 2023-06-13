import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { StateType } from '../../../redux/store/store';
import axios from 'axios';
import LoadingComponent from '../../../components/Loading';

const ProfileScreen = () => {
  const { theme, language, loginUserID } = useSelector((state: StateType) => state.SettingsSlice);
  const { favorites } = useSelector((state: StateType) => state.PlacesSlice)
  const [loading, setloading] = useState(true)
  const [user, setuser] = useState<any>({})

  useEffect(() => {


    try {
      axios.get(`http://172.16.0.105:8080/api/auth/${loginUserID}`).then(data => {
        setuser(data.data);
        setloading(false)
      })

    } catch (error) {
      
      console.log(error);

    }

  },)

  return (
    loading ? <LoadingComponent /> :
      <View style={[styles.container, { backgroundColor: theme == 'light' ? '#F9FAEA' : '#000000' }]}>

        <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />
        <View style={{ gap: 20 }}>
          <View>
            <Image source={{ uri: 'https://i.pinimg.com/564x/02/dc/5b/02dc5baf1eeb939ba787ce260a945efa.jpg' }} style={[styles.image,{borderColor:theme=='light'?'black':'#F9FAEA'}]} />
          </View>

          <View style={styles.userdetails}>
            <Text style={[styles.usertexts,{color: theme == 'light'?'black':'white'}]}>{user.name}</Text>
            <Text style={[styles.usertexts,{color: theme == 'light'?'black':'white'}]}>{user.surname}</Text>

          </View>
        </View>
        <View style={styles.userdetailsextra}>
          <Text style={styles.usertextsextra}>Evently Member Since:</Text>
          <Text style={styles.usertextsextra}>Jun 13, 2023</Text>

          <View style={styles.datadetails}>
            <Text style={styles.usertexts}>Total Favorites :</Text>
            <Text style={styles.usertexts}> {favorites.length}</Text>

          </View> 
        </View>



      </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAEA',
    gap: 10
  },

  logoimage: {
    resizeMode: 'contain',
    height: '10%',
    alignSelf: 'center'
  },
  image: {
    borderWidth:1,
    alignSelf: 'center',
    borderRadius: 20,
    width: '50%',
    height: 200
  },
  userdetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  userdetailsextra: {
    backgroundColor:'#E7DFD8',
    borderRadius:20,
    borderWidth: 1,
    marginHorizontal: '5%',
    paddingBottom: '75%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  datadetails: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  usertexts: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center',
    fontFamily:'BebasNeue-Regular'
  },
  usertextsextra: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    alignSelf: 'center'
  }
})