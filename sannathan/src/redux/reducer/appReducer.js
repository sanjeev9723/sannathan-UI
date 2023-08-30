import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    orderList:[],
    appointmentFields:[
        
        {field:"location", displayName:"Location", value:"Chirala"},        
        {field:"userName", displayName:"User Name", optional:false},        
        {field:"password", displayName:"Password", optional:false},
        {field:"contactNo", displayName:"Contact No", optional:true},
        {field:"mobileNo", displayName:"Mobile No", optional:false},
        {field:"whatsupNo", displayName:"whatsupNo", optional:true},
        {field:"prescription", displayName:"Prescription", optional:true},
    ]
}

export const AppReducer = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        setOrderList :(state,action) => {
            state.orderList = [...action.payload.orderList];
        },
        addNewOrder:(state,action) =>{
            let orders = [...state.orderList];
            orders.push(action.payload);
            state.orderList = orders;
        }
    },
    extraReducers:{

    }
})

export const { setOrderList ,addNewOrder} = AppReducer.actions

export default AppReducer.reducer