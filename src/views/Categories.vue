<template>
  <Loader v-if="loading" />
  <div v-else>
    <div class="page-title">
      <h3>{{ "Categories" | localize }}</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount || categories.length - updateCount"
          @updated="updateCategories"
          @removed="removeCategories"
        />
        <p v-else class="center">{{ "No_Categories" | localize }} <router-link to="/categories">{{ "Add_New_Category" | localize }}</router-link></p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "../components/CategoryCreate"
import CategoryEdit from "../components/CategoryEdit"

export default {
  metaInfo() {
    return {
      title: this.$title("Categories")
    }
  },
  name: "categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories")
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    },
    removeCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount--
      this.categories = this.categories.filter(c => c.id !== category.id)
    }
  }
}
</script>
