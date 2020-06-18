<template>
  <div>
    <div class="page-title">
      <h3>{{ "Bill" | localize }}</h3>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "../components/HomeBill"
import HomeCurrency from "../components/HomeCurrency"

export default {
  metaInfo() {
    return {
      title: this.$title("Bill")
    }
  },
  name: "home",
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch("fetchCurrency")
    this.currency.rates["EUR"] = 1
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch("fetchCurrency")

      this.loading = false
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
