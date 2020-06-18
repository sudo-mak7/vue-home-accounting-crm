<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ "ExchangeRates" | localize }}</span>
        </div>
        <table>
          <thead>
            <tr class="currency-rate">
              <th class="table-padding">{{ "Currency" | localize }}</th>
              <th>{{ "Rate" | localize }}</th>
              <th>{{ "Date" | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="cur in currencies"
              :key="cur"
              class="currency-rate"
            >
              <td class="table-padding">{{ cur }}</td>
              <td>{{ (rates.RUB / rates[cur]).toFixed(4) }} ₽</td>
              <td>{{ date | date("date") }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates", "date"],
  data: () => ({
    currencies: ["USD", "EUR"]
  })
}
</script>
