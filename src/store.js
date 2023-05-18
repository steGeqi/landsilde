import {
  createStore
} from 'vuex'

export default new createStore({
  state: {
    eqhead: '地震信息',
    myTimer:0,
    piclist: [],
    publishUri: '',
    eqCenter: null,
    getinfo: {},
    NewsID: "",
    CommentID: '',
    SwitchEarthquakes: -1,
    huapoDot:[],
    SketchDot:[],
    dailog:''
  },
  mutations: {
    setdialog:function (state,dailog){
      state.dailog = dailog
    },
    seteqhead: function (state, eqhead) {
      state.eqhead = eqhead;
    },
    setmyTimer: function (state, myTimer) {
      state.myTimer = myTimer;
    },
    sethuapoDot: function (state, huapoDot) {
      state.huapoDot = huapoDot;
    },
    setSketchDot: function (state, SketchDot) {
      state.SketchDot = SketchDot;
    },
    setpiclist: function (state, list) {
      state.piclist = list;
    },
    setChangepic: function (state, index) {
      state.piclist[index].flag = state.piclist[index].flag ? false : true
    },
    setpublishUri: function (state, publishUri) {
      state.publishUri = publishUri;
    },
    setEqCenter: function (state, eqCenter) {
      state.eqCenter = eqCenter;
    },
    SET_GETINFO: (state, getinfo) => {
      state.getinfo = getinfo
    },
    setNewsID: (state, NewsID) => {
      state.NewsID = NewsID
    },
    setCommentID: (state, CommentID) => {
      state.CommentID = CommentID
    },
    setSwitchEarthquakes:(state,SwitchEarthquakes) =>{
      state.SwitchEarthquakes = SwitchEarthquakes
    }
  },
  getters: {
    geteqhead: function (state) {
      return state.eqhead;
    },
    getmyTimer: function (state) {
      return state.myTimer;
    },
    getpiclist: function (state) {
      return state.piclist;
    },
    getpublishUri: function (state) {
      return state.publishUri;
    },
    getEqCenter: function (state) {
      return state.eqCenter;
    },
    getInfo: state => state.getinfo,
    getNewsID: state => state.NewsID,
    getCommentID: state => state.CommentID,
    getSwitchEarthquakes:state =>state.SwitchEarthquakes,
    gethuapoDot:state =>state.huapoDot,
    getSketchDot:state =>state.SketchDot,
    getdialog:state => state.dailog,

  },

})
