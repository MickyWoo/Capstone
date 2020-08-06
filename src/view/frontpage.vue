<template>
  <div class="Head">
    <h1> Financial View (working title) </h1>

    <div class="container">

      <div class="messages">
        <message-container v-bind:messages="messages"> </message-container>
      </div>

      
      <Top-News v-bind:latestNews="this.latestNews">  </Top-News>

      <!-- END Market News -->

          <!-- Stock ticker -->
          <div class=stockSearch>
            <h2> Please Enter Stock Ticker </h2>
            <form
              class="searchbar"
              v-on:submit.prevent="getTicker"
            >
              <div class="searchbar-input">
                <!-- Input -->
                <input
                  class="search"
                  v-model="ticker"
                  type="search"
                  placeholder="AAPL"
                >

              </div>

              <button type="submit"> submit </button>
            </form>

      
       <Loading-Spinner v-if="showLoading"> </Loading-Spinner>

      <StockBasic-Info v-bind:dailyChartData="this.dailyChartData" v-if="loaded"> </StockBasic-Info>

            <div
              class="no-results"
              v-if="noText "
            >

              <h2>Please Enter a Ticker</h2>
              <p> OR Please adjust your search</p>
            </div>

          </div>

        </div>
    <!-- End of News/Tick Search combo -->

    <!-- STOCK OverView Panels -->
    <Overview-Panels v-bind:results="this.results"  v-if="display"> </Overview-Panels>
  
    <!-- StockChart -->
    <div class="chartContainer">
      <h2> StockChart: {{ticker}} </h2>

      <div
        class="timeSeries"
        v-if="loaded" >

        <button
          v-for="sets in setsAvaliable"
          :key="sets.name"
          v-bind:value="sets.value"
          v-on:click="selected(sets.value); switchTimeSeries();"
        > {{ sets.text }} </button>

      </div>
      
        <!-- https://codepen.io/team/amcharts/pen/ZEYXEJV -->
          <div id="chartdiv"></div>

    </div>

  </div>

</template>


<script>

import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MessageContainer from "@/components/MessageContainer.vue";
require("vue2-animate/dist/vue2-animate.min.css");

import TopNews from "@/components/TopNews.vue";
import OverviewPanels from '@/components/OverviewPanels.vue';
import StockBasicInfo from '@/components/StockBasicInfo.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';



am4core.useTheme(am4themes_animated); //https://www.amcharts.com/docs/v4/getting-started/integrations/using-vue-js/

export default {
  name: "frontpage",
  components: {
    "message-container": MessageContainer,
    "Top-News": TopNews,
    "Overview-Panels": OverviewPanels,
    "StockBasic-Info": StockBasicInfo,
    "Loading-Spinner": LoadingSpinner,
  },

  data() {
    return {
      ticker: "",
      results: [],
      latestNews: [],
      noText: false,
      messages: [],

      loaded: false,
      display: false,
      showLoading: false,

      dailyChartData: [],
      chart: "",
      chartdata: [],

      chosenValue: "",
      setsAvaliable: [
        { text: "Daily", value: "daily" },
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" },
        { text: "Yearly", value: "yearly" },
      ],
    };
  },

  mounted() {
    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    this.getNews(); // inital retreive
    // setInterval( ()=> this.getNews(), 5*60*1000); // and continous update every 5mins https://www.w3schools.com/js/js_timing.asp
    // I have LIMITED API calls, so i commented it out.
    console.log("Latest news updates every 5 mins!!");
  },

  methods: {
    getNews: function () {
      axios
        .get(`http://newsapi.org/v2/top-headlines?country=us`, {
          params: {
            "Access-Control-Allow-Origin": "newsapi.org",
            pageSize: "5",
            category: "business",
            apiKey: "f702b0d64e0f48b5809e0c8db7c9a399",
          },
        })
        .then((response) => {
          this.latestNews = response.data;
        })
        .catch((error) => {
          this.errors.push(error);
          
        });
    },

    getTicker: function () {
      this.noText = false;
      this.showLoading = true;
      this.chartdata = [];
      this.results = [];
 
    

      if (this.ticker !== "") {
        // check if search has any text
        axios
          .get(
            `https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=dailyContinue&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true`, // Stock Dialy Close
            {
              params: {
                symbol: this.ticker,
              },
            }
          )
          .then((response) => {
            this.chartdata = response.data;
            this.loaded = true;
    

            this.checkResults();

            this.dailyData();
            this.stockChart();
          });
            

        axios
          .get(
            `https://www.alphavantage.co/query?function=OVERVIEW&apikey=JSAD44QMQ8EVHSX7`, // Stock OverVIEW
            {
              params: {
                symbol: this.ticker,
              },
            }
          )
          .then((response) => {
            this.results = response.data;
                    this.showLoading = false;
          })

          .catch((error) => {
            this.messages.push({
              type: "error",
              text: error.message,
              
            });
    
          });
      } else {
        this.noText = true;
        this.loaded = false;
      }
  
    },

    switchTimeSeries: function () {
      this.chartdata = [];
    

      axios
        .get(
          `https://marketdata.websol.barchart.com/getHistory.json?startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true`,
          {
            params: {
              symbol: this.ticker,
              type: this.chosenValue,
              apikey: "faf40b2f41f0480230752ec47aacc00f",
            },
          }
        )
        .then((response) => {
          this.chartdata = response.data;
          this.chart.data = this.chartdata.results;

        })
        .catch((error) => {
          this.errors.push(error);
        });
    },

    checkResults: function () {
      if (this.chartdata.results === null) {
   
        this.noText = true;
        this.loaded = false;
        this.chartdata.results = [];
        this.chart = [];
      }
    },
    // show: function () {
    //   this.display = !this.display;
    // },

    dailyData: function () {
      this.dailyChartData = this.chartdata.results[
        this.chartdata.results.length - 1
      ];
    },

    //https://www.amcharts.com/docs/v4/tutorials/taming-candlestick-series/
    stockChart: function () {
      am4core.useTheme(am4themes_animated);

 

      
      this.chart.paddingRight = 20;

      this.chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

      var dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 60;

      var valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      var series = this.chart.series.push(new am4charts.CandlestickSeries());
      series.name = this.ticker;
      series.dataFields.dateX = "tradingDay";
      series.dataFields.valueY = "close";
      series.dataFields.openValueY = "open";
      series.dataFields.lowValueY = "low";
      series.dataFields.highValueY = "high";
      series.tooltipText =
        "Open: [bold]${openValueY.value}[/]\nLow: [bold]${lowValueY.value}[/]\nHigh: [bold]${highValueY.value}[/]\nClose: [bold]${valueY.value}[/]";

      this.chart.cursor = new am4charts.XYCursor();

      this.chart.scrollbarX = new am4core.Scrollbar();

      this.chart.data = this.chartdata.results;

      series.legendSettings.labelText =
        "[{column.fill}]Open: ${valueY.open} Low: ${valueY.low} High: ${valueY.high} Close: ${valueY.close}[/]";

      series.legendSettings.itemLabelText =
        "[{column.fill}]Open: ${openValueY.value} Low: ${lowValueY.value} High: ${highValueY.value} Close: ${valueY.value}[/]";

      // Legend
      this.chart.legend = new am4charts.Legend();
    },

    // timeSeriesSelection
    selected: function (value) {
      this.chosenValue = value;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  margin: 15px;
  justify-content: center;
  flex-wrap: wrap;
}



.search {
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: 3px solid rgb(0, 17, 250);
  border-radius: 25px;
}

#chartdiv {
  width: 100%;
  height: 500px;
  min-width: 500px;
  padding: 10px;
}

.chartContainer button{
  min-width: 80px;
 padding: 5px;

}
</style>