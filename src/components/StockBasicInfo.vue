<template>

  <div
    class="stockInfo"
    >
<transition-group name="fade" appear tag="div" >
  <!-- Keyed must be unique and with the two (value, name) name is unique identifyer to avoid Error in child component -->
    <div
      class="stockContainer"
      v-for="(value, name) in dailyChartData"
      :key="name">
      <div> {{ name }}: {{ value }}</div>

    </div>
</transition-group>

    <div class="overview">
      <button class="dropbtn"
        v-on:click="show"
        >  
        Stock OverView
      </button>

    </div>

  </div>
</template>

<script>
export default {
    name: "StockBasicInfo",
    props: {
        dailyChartData: {},

    },
     data () {
      return {
  
      }
  },

    methods: {
         show: function () {
       
             this.$emit('showPanels') // emit a new function name (showPanels) into Parent
     },

 },
}
</script>

<style scoped>
.stockContainer div {
  max-width: 600px;

  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
  background-color:#e7e9eb;

  font-weight: bold;

}


.stockInfo {
  max-width: 500px;

  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
}

/* dropDown Style */
.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #2980b9;
}

.search {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: 3px solid rgb(0, 17, 250);
  border-radius: 25px;
}

</style>