import { Image, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Card from '../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../../../redux/store/store';
import Ionicons from 'react-native-vector-icons/Ionicons'

const SearchScreen = ({ navigation }: any) => {

    const [searchText, setSearchText] = useState<String>('')
    const [Filtered, setFiltered] = useState<any>([])
    const [isFiltered, setisFiltered] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const dispatch = useDispatch<AppDispatch>();
    const { theme, language } = useSelector((state: StateType) => state.SettingsSlice);
    const { data, favorites } = useSelector((state: StateType) => state.PlacesSlice);
    const GoToDetails = (item: any) => {

        navigation.navigate('PlacesDetails', item._id)
    }
    useEffect(() => {
        try {
            const copydata = data
            const filteredData = copydata.filter((q: any) => q.placeName.toLowerCase().includes(searchText.toLowerCase()));
            setFiltered(filteredData)


        } catch (error) {
            console.log(error)
        }
    }, [searchText])
    const renderItem = ({ item }: any) => {

        return (
            <Card item={item} GoToDetails={() => GoToDetails(item)} />
        )
    }

    const FilterByUnfavorite = () => {
        if (isFiltered) {
            setFiltered(data);
            setisFiltered(false);
        }
        else {
            const unfavoriteData = Filtered.filter((item: any) => !favorites.includes(item));
            setFiltered(unfavoriteData);
            setisFiltered(true);
        }

    };

    return (
        <View style={[styles.container,{ backgroundColor:theme == 'light'? '#F9FAEA':'#000000', }]}>

            <Image style={styles.logoimage} source={require('../../../assets/logo/Logo.png')} />

            <View style={styles.inputs}>

                <TextInput onChangeText={setSearchText} style={styles.input} placeholder='search' />

            </View>

            <View style={styles.list}>
                <View style={styles.listoptions}>

                    <TouchableOpacity onPress={FilterByUnfavorite}>
                        <Ionicons name='filter-outline' size={25} color={theme == 'light'?'black':'white'} />
                    </TouchableOpacity>
                    <Text style={{color:theme == 'light'?'black':'white'}}>filter by unfavorite</Text>

                </View>
                <FlatList
                    ItemSeparatorComponent={() => <View style={{ height: 20 }} />}

                    showsVerticalScrollIndicator={false}
                    data={Filtered}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )

}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },

    logoimage: {
        resizeMode: 'contain',
        height: '10%',
        alignSelf: 'center'
    },
    inputs: {

    },
    input: {
        backgroundColor: '#E7DFD8',
        borderRadius: 24,
        paddingHorizontal: 20
    },
    list: {

        height: '70%',
        gap: 5
    },
    listoptions: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})