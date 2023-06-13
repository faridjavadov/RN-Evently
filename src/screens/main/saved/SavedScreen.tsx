import { Image, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StateType } from '../../../redux/store/store'
import Card from '../../../components/Card'



const SavedScreen = ({navigation}:any) => {

    const
        dispatch = useDispatch<AppDispatch>();
    const { favorites } = useSelector((state: StateType) => state.PlacesSlice)
    const {theme,language} = useSelector((state:StateType)=>state.SettingsSlice);
    const GoToDetails = (item: any) => {

        navigation.navigate('PlacesDetails', item._id)
    }
    const renderItem = ({ item }: any) => {

        return (
            <Card item={item} GoToDetails = {()=>GoToDetails(item)}/>
        )
    }

    return (
        <View style={[styles.container,{ backgroundColor:theme == 'light'? '#F9FAEA':'#000000', }]}>
            
                <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />
            
            <View style={styles.list}>
                <View>
                    <Text style={{fontSize:28,fontWeight:'500',fontFamily:'Pacifico-Regular',color:theme == 'light'?'black':'white'}}>Favorites</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={favorites}
                    renderItem={renderItem}
                />
            </View>
        </View>

    )
}

export default SavedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },

    logoimage: {
        resizeMode: 'contain',
        height: '10%',
        alignSelf:'center'
    },
    list: {
       
        height: '80%'
    },
    
})