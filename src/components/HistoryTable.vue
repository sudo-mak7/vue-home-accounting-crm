<template>
  <table class="table-fix">
    <thead>
      <tr>
        <th>{{ "Number" | localize }}</th>
        <th>{{ "Amount" | localize }}</th>
        <th>{{ "Date" | localize }}</th>
        <th>{{ "Type" | localize }}</th>
        <th>{{ "Detail" | localize }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency("RUB") }}</td>
        <td>{{ record.date | date("datetime") }}</td>
        <td>
          <span
            :class="[record.typeClass]"
            class="white-text badge"
          >{{ record.typeText }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">info_outline</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
