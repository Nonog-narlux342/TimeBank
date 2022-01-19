const initialState = () => ({
  ACTIVITY_ID: "",
  ACTIVITY_NAME: "",
  ACTIVITY_ADDRESS: "",
  ACTIVITY_SUBDISTRIC: "",
  ACTIVITY_DISTRICT: "",
  ACTIVITY_PROVINCE: "",
  ACTIVITY_ZIPCODE: "",
  ACTIVITY_TELEPHONE: "",
  ACTIVITY_COUNT: "",
  ACTIVITY_SEX: "",
  ACTIVITY_DAY: "",
  ACTIVITY_TIME: "",
  ACTIVITY_DETAILS: "",
  ACTIVITY_POINT: "",

  USERID: "",

  MEMBERSHIP_ID: "",
  MEMBERSHIP_FIRFENAME: "",
  MEMBERSHIP_LASTNAME: "",
  MEMBERSHIP_POINT: "",
  MEMBERSHIP_IMGE: "",
  MEMBERSHIP_BIRTH: "",

  ADMIN_ID: "",
  ADMIN: 0,

  APPPOINTMENT_TIME: ""

})
const state = initialState()

const getters = {
  ACTIVITY_ID: state => state.ACTIVITY_ID,
  ACTIVITY_NAME: state => state.ACTIVITY_NAME,
  ACTIVITY_ADDRESS: state => state.ACTIVITY_ADDRESS,
  ACTIVITY_SUBDISTRIC: state => state.ACTIVITY_SUBDISTRIC,
  ACTIVITY_DISTRICT: state => state.ACTIVITY_DISTRICT,
  ACTIVITY_PROVINCE: state => state.ACTIVITY_PROVINCE,
  ACTIVITY_ZIPCODE: state => state.ACTIVITY_ZIPCODE,
  ACTIVITY_TELEPHONE: state => state.ACTIVITY_TELEPHONE,
  ACTIVITY_COUNT: state => state.ACTIVITY_COUNT,
  ACTIVITY_SEX: state => state.ACTIVITY_SEX,
  ACTIVITY_DAY: state => state.ACTIVITY_DAY,
  ACTIVITY_TIME: state => state.ACTIVITY_TIME,
  ACTIVITY_DETAILS: state => state.ACTIVITY_DETAILS,
  ACTIVITY_POINT: state => state.ACTIVITY_POINT,
  USERID: state => state.USERID,

  MEMBERSHIP_ID: state => state.MEMBERSHIP_ID,
  MEMBERSHIP_FIRFENAME: state => state.MEMBERSHIP_FIRFENAME,
  MEMBERSHIP_LASTNAME: state => state.MEMBERSHIP_LASTNAME,
  MEMBERSHIP_POINT: state => state.MEMBERSHIP_POINT,
  MEMBERSHIP_IMGE: state => state.MEMBERSHIP_IMGE,
  MEMBERSHIP_BIRTH: state => state.MEMBERSHIP_BIRTH,

  ADMIN_ID: state => state.ADMIN_ID,
  ADMIN: state => state.ADMIN,
  APPPOINTMENT_TIME: state => state.APPPOINTMENT_TIME
}

const mutations = {
  SET_ACTIVITY_ID(state, data) {
    state.ACTIVITY_ID = data
  },
  SET_ACTIVITY_NAME(state, data) {
    state.ACTIVITY_NAME = data
  },
  SET_ACTIVITY_ADDRESS(state, data) {
    state.ACTIVITY_ADDRESS = data
  },
  SET_ACTIVITY_SUBDISTRIC(state, data) {
    state.ACTIVITY_SUBDISTRIC = data
  },
  SET_ACTIVITY_DISTRICT(state, data) {
    state.ACTIVITY_DISTRICT = data
  },
  SET_ACTIVITY_PROVINCE(state, data) {
    state.ACTIVITY_PROVINCE = data
  },
  SET_ACTIVITY_ZIPCODE(state, data) {
    state.ACTIVITY_ZIPCODE = data
  },
  SET_ACTIVITY_TELEPHONE(state, data) {
    state.ACTIVITY_TELEPHONE = data
  },
  SET_ACTIVITY_COUNT(state, data) {
    state.ACTIVITY_COUNT = data
  },
  SET_ACTIVITY_SEX(state, data) {
    state.ACTIVITY_SEX = data
  },
  SET_ACTIVITY_DAY(state, data) {
    console.log('%c'+data,'coloe:red;font-weight:600');
    state.ACTIVITY_DAY = data
  },
  SET_ACTIVITY_TIME(state, data) {
    state.ACTIVITY_TIME = data
  },
  SET_ACTIVITY_DETAILS(state, data) {
    state.ACTIVITY_DETAILS = data
  },
  SET_ACTIVITY_POINT(state, data) {
    state.ACTIVITY_POINT = data
  },

  //USERID
  SET_USERID(state, data) {
    state.USERID = data
  },
  //MEMBERSHIP_ID 
  SET_MEMBERSHIP_ID(state, data) {
    state.MEMBERSHIP_ID = data
  },
  SET_MEMBERSHIP_FIRFENAME(state, data) {
    state.MEMBERSHIP_FIRFENAME = data
  },
  SET_MEMBERSHIP_LASTNAME(state, data) {
    state.MEMBERSHIP_LASTNAME = data
  },
  SET_MEMBERSHIP_POINT(state, data) {
    state.MEMBERSHIP_POINT = data
  },
  SET_MEMBERSHIP_IMGE(state, data) {
    state.MEMBERSHIP_IMGE = data
  },
  SET_MEMBERSHIP_BIRTH(state, data) {
    state.MEMBERSHIP_BIRTH = data
  },

  //ADMIN_ID
  SET_ADMIN_ID(state, data) {
    state.ADMIN_ID = data
  },
  SET_ADMIN(state, data) {
    state.ADMIN = data
  },
  SET_APPPOINTMENT_TIME(state, data) {
    state.APPPOINTMENT_TIME = data
  },
}

const actions = {
  // increaseCounter ({commit,state}, payload){
  //     commit('INCREASE_CURRENT_COUNTER')
  // }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
