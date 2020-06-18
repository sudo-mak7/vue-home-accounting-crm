<template>
  <div>
    <div class="page-title">
      <h3>{{ "RecordHistory" | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{ "No_Records" | localize }}. 
      <router-link to="/record">{{ "CreateNewRecord" | localize }}?</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from "@/mixins/pagination.mixin"
import HistoryTable from "@/components/HistoryTable"
import { Doughnut } from "vue-chartjs"
import localizeFilter from "@/filters/localize.filter"

export default {
  metaInfo() {
    return {
      title: this.$title("History")
    }
  },
  name: "history",
  extends: Doughnut,
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: []
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords")
    const categories = await this.$store.dispatch("fetchCategories")

    this.setup(categories)

    this.loading = false
  },
  methods: {
    setup(categories) {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            typeClass: record.type === "income" ? "green" : "red",
            typeText:
              record.type === "income"
                ? localizeFilter("Income")
                : localizeFilter("Outcome")
            }
          })
          .reverse()
      )

      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [
          {
            label: "Расходы по категориям",
            data: categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome") {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ]
          }
        ]
      })
    }
  },
  components: {
    HistoryTable
  },
  watch: {
    $route(to) {
      if (!to.query.page) {
        this.pageChangeHandler(1)
        this.page = 1
      }
    }
  }
}
</script>
