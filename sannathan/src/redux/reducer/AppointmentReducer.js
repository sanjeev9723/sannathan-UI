import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderList:[],
    appointmentFields:[
        {field:"date", displayName:"Date",placeholder:"Date",className:"fa fa-calendar fa ", value:new Date().toLocaleDateString(), type:"text",disabled:true,inputType:"inputbox"}, 
        {field:"location", displayName:"Location",placeholder:"Location", className:"fa fa-map-marker fa-lg" , value:"Chirala",disabled:true,inputType:"inputbox",newline:true}, 
        {field:"name", displayName:"Patient Name",required:true, placeholder:"Full name", className:"fa fa-user fa", value:"", optional:false,inputType:"inputbox",validationMsg:"Please enter the User Name",newline:true},         
        {field:"contactNumber", displayName:"Contact Number", placeholder:"ContactNo",className:"" ,  value:"",optional:false,inputType:"inputbox",validationMsg:"Please enter the ContactNo",newline:true},

        {field:"gender", displayName:"Gender",type:"select",className:"	fa fa-venus-mars", value:"", optional:false,inputArry:[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }],inputType:"selectbox" ,newline:false},
        {field:"age", displayName:"Age",required:true,placeholder:"Age", className:"	fa fa-sort", value:"", optional:false,inputType:"inputbox",validationMsg:"Please enter the Age"},
        {field:"weight", displayName:"Weight",className:"fas fa-weight", placeholder:"Weight",value:"", optional:false,inputType:"inputbox" },

        // {field:"weight", displayName:"Weight",required:true,className:"fas fa-weight", placeholder:"Weight",value:"", optional:false,inputType:"inputbox" },
        {field:"address", displayName:"Address",required:true, placeholder:"Address", className:"	far fa-building", value:"", optional:false,inputType:"inputbox",validationMsg:"Please enter the Address",newline:true},  
        {field:"mobileNo", displayName:"Mobile Number",placeholder:"Mo-marsbileNo",className:"fa fa-mobile" ,  value:"", optional:true,inputType:"inputbox"},
        {field:"whatsappNo", displayName:"Whatsapp Number", placeholder:"WhatsappNo",className:"fa fa-mobile" ,  value:"",optional:true,inputType:"inputbox"},
        {field:"prescription", displayName:"Prescription",placeholder:"Prescription",  value:"", optional:true,inputType:"inputbox"},
    ],
   
}

export const AppointmentReducer = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
      setOrderList: (state, action) => {
        state.orderList = [...action.payload.orderList];
      },
      addNewOrder: (state, action) => {
        let orders = [...state.orderList];
        orders.push(action.payload);
        state.orderList = orders;
      },
      markVisited: (state, action) => {
        const { patientId } = action.payload;
        state.orderList = state.orderList.map((order) => {
          if (order.patientId === patientId) {
            return {
              ...order,
              visited: true,
            };
          }
          return order;
        });
      },
      
    },
    extraReducers: {},
  });
  
  export const { setOrderList, addNewOrder, markVisited } = AppointmentReducer.actions;
  
  export default AppointmentReducer.reducer;