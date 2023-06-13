import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface PlaceState {
    data: any,
    place: any,
    counter: Number,
    favorites: any,
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    error: any,
}

const InitialState: PlaceState = {
    data: [],
    place:{},
    counter: 0,
    favorites: [],
    status: null,
    error: null,

}

export const getData = createAsyncThunk('get/places', async () => {
    const response = await axios.get('http://172.16.0.105:8080/api/places');
    return response.data
})
export const getDataById = createAsyncThunk('get/place',async (id:any) =>{
        
    const response = await axios.get(`http://172.16.0.105:8080/api/places/${id}`)
    return response.data
})

const PlacesSlice = createSlice({
    name: 'PlaceSlice',
    initialState: InitialState,
    reducers: {
        handleFavorite: (state, action) => {
            if (state.favorites.find((c: any) => c._id == action.payload._id)) {
                state.favorites = state.favorites.filter((c: any) => c._id != action.payload._id)
            }
            else {
                state.favorites.push(action.payload)
            }
        },
        getCount:(state)=>{
            console.log(state.counter);
            state.counter = state.data.length
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.status = 'pending'
        }).addCase(getData.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.data = action.payload

            state.counter = state.data.length
            
        }).addCase(getData.rejected, (state) => {
            state.status = 'rejected'
        })

        builder.addCase(getDataById.pending,(state)=>{
            state.status = 'pending'
        }).addCase(getDataById.fulfilled,(state,action)=>{
            state.status = 'fulfilled'
            state.place = action.payload
        }).addCase(getDataById.rejected, (state)=>{
            state.status = 'rejected'
        })

    }
})


export default PlacesSlice.reducer

export const { handleFavorite,getCount } = PlacesSlice.actions

