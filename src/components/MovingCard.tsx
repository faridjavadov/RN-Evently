import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../redux/store/store'
import { handleFavorite } from '../redux/slices/PlacesSlice'


const MovingCard = (props: any, navigation: any) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const { favorites } = useSelector((state: StateType) => state.PlacesSlice)
    const { theme } = useSelector((state: StateType) => state.SettingsSlice)
    const dispatch = useDispatch<AppDispatch>();


    return (
        <TouchableOpacity onPress={props.GoToDetails}>
            <View style={styles.container}>
                <View style={styles.favoriteWrapper}>
                    <TouchableOpacity onPress={() => dispatch(handleFavorite(props.item))}>
                        <MaterialIcons name='favorite' size={25} color={favorites.find((c: any) => c._id == props.item._id) ? 'red' : 'white'} />
                    </TouchableOpacity>
                </View>


                <Image style={styles.image} source={{ uri: props.item.placeImage }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.placename,{color:theme=='light'?'black':'white'}]}>{props.item.placeName}</Text>
                    <Text style={[styles.placename,{color:theme=='light'?'black':'white'}]}>{props.item.locationName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MovingCard

const styles = StyleSheet.create({
    container: {
        alignSelf:'center',
        justifyContent:'center'
    },
    favoriteWrapper: {
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 10,
        right: 10,
        top: 10,
        padding: 10,
        borderRadius: 50,
    },
    image: {
        height: 160,
        width: 250,
        resizeMode: 'cover',
        borderRadius: 15
    },
    placename: {
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'BebasNeue-Regular'
    },
})