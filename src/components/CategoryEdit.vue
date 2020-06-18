<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "EditCategory" | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="c of categoriesReverse"
              :key="c.id"
              :value="c.id"
            >
              {{ c.title }}
            </option>
          </select>
          <label>{{ "SelectCategory" | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">{{ "CategoryName" | localize }}</label>
          <span
            v-if="$v.title.$error"
            class="helper-text invalid"
          >
            {{ "Enter_Category_Name" | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.required && !$v.limit.minValue }"
          />
          <label for="limit">{{ "Limit" | localize }}</label>
          <span
            v-if="$v.limit.$error"
            class="helper-text invalid"
          >
            {{ "MinAmount" | localize }} {{ $v.limit.$params.minValue.min }} ₽
          </span>
        </div>

        <div class="row">
          <div class="space col l3">
            <button class="btn waves-effect waves-light" type="submit">
              {{ "Button_Update" | localize }}
              <i class="material-icons right">send</i>
            </button>
          </div>

          <div class="col l3">
            <button class="btn waves-effect waves-light red" @click="removeHandler">
              {{ "Button_Delete" | localize }}
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import M from "materialize-css"

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  watch: {
    current(catId) {
      const { title, limit } = this.categories.find(c => c.id === catId);
      (this.title = title), (this.limit = limit)
    }
  },
  created() {
    let index = this.categories.length - 1
    index = index >= 0 ? index : 0
    const { id, title, limit } = this.categories[index];
    (this.current = id), (this.title = title), (this.limit = limit)
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch("updateCategory", categoryData)
        this.$message("Message_CategoryHasBeenUpdated")
        this.$emit("updated", categoryData)
      } catch (e) {
        e
      }
    },
    async removeHandler() {
      try {
        const categoryData = {
          id: this.current
        }
        await this.$store.dispatch("removeCategory", categoryData)
        this.$message("Message_CategoryHasBeenRemoved")
        this.$emit("removed", categoryData)
      } catch (e) {
        e
      }
    }
  },
  computed: {
    categoriesReverse() {
      return this.categories.slice().reverse()
    }
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
