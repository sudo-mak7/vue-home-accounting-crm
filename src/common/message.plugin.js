import M from "materialize-css"
import localizeFilter from "@/filters/localize.filter"

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast({ html: `${localizeFilter(html)}` })
    }

    Vue.prototype.$error = function(html) {
      M.toast({
        html: `[${localizeFilter("Error")}]: ${localizeFilter(html)}`
      })
    }
  }
}
