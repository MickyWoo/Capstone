<template>

  <transition name="fade" appear tag="div">
    <div class="panelContainer">
        <div class="panel-1">
          <h3> Valuation </h3>
          <div> PERatio: {{results.PERatio}} </div>
          <div> DividendPerShare {{results.DividendPerShare}} </div>
          <div>DividendYield: {{results.DividendYiel}} </div>
          <div> AnalystTargetPrice: {{results.AnalystTargetPrice}} </div>

        </div>
        <div class="panel-2">
          <h3> Company Profile </h3>

          <div> {{results.Description}} </div>
          <div> Address: {{results.Address}} </div>
          <div> FullTimeEmployees: {{results.FullTimeEmployees}} </div>

        </div>
        <div class="panel-3">
          <h3> Balance Sheet </h3>
          <div> MarketCapitalization: {{results.MarketCapitalization}} </div>
          <div>TrailingPE: {{results.TrailingPE}} </div>
          <div> ForwardPE: {{results.ForwardPE}} </div>
          <div>PriceToBookRatio: {{results.PriceToBookRatio}} </div>

        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "OverviewPanels",
  props: {
    results: {},
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.panelContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.panelContainer div {
  min-width: 200px;
  max-width: 400px;
  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
  overflow: auto;
  /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
  max-height: 550px;
}

.panel-1,
.panel-3 {
  background-color: #f1f1f1;
  font-weight: bold;
}
</style>