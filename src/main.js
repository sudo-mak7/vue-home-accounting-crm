import Vue from "vue"
import Vuelidate from "vuelidate"
import Paginate from "vuejs-paginate"
import VueMeta from "vue-meta"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import dateFilter from "./filters/date.filter"
import currencyFilter from "./filters/currency.filter"
import localizeFilter from "./filters/localize.filter"
import tooltipDirective from "./directives/tooltip.directive"
import messagesPlugin from "./common/message.plugin"
import titlePlugin from "./common/title.plugin"
import Loader from "./components/app/Loader"
import "./registerServiceWorker"
import "materialize-css/dist/js/materialize.min"

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

Vue.config.productionTip = false

Vue.use(messagesPlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter("date", dateFilter)
Vue.filter("localize", localizeFilter)
Vue.filter("currency", currencyFilter)
Vue.directive("tooltip", tooltipDirective)
Vue.component("Loader", Loader)
Vue.component("Paginate", Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyB9qGa1R0EZafRyCrmb9_D2w2LiJeyJ0SI",
  authDomain: "vuejs-crm-project.firebaseapp.com",
  databaseURL: "https://vuejs-crm-project.firebaseio.com",
  projectId: "vuejs-crm-project",
  storageBucket: "vuejs-crm-project.appspot.com",
  messagingSenderId: "713789903545",
  appId: "1:713789903545:web:6a78db0c5c89cdf4108168",
  measurementId: "G-ZF986V7RPE"
}

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app")
  }
})
