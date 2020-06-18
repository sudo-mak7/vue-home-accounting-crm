<template>
  <div class="col s12 m6 space">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Button_Create" | localize }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
        
        <button class="waves-effect waves-light btn" type="submit">
          {{ "Button_Create" | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators"
import M from "materialize-css"

export default {
  data: () => ({
    title: "",
    limit: 100
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch("createCategory", {
          title: this.title,
          limit: this.limit
        })
        this.title = "",
        this.limit = 100,
        this.$v.$reset()
        this.$message("Message_CategoryHasBeenCreated")
        this.$emit("created", category)
      } catch (e) {
        e
      }
    }
  }
}
</script>
