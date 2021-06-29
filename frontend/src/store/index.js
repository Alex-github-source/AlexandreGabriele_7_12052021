import Vue from 'vue'
import Vuex from 'vuex'


//import axios from "axios";



Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {
      pseudo: 'Nc',
      userId: 'Nc',
      email: 'Nc',
      token: null,
      isAdmin: false
    },
  },
 
  mutations: {
   
  },
    
  
  
  
  actions: {
  
}
})
