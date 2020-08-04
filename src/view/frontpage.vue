<template>
  <div class="Head">
    <h1> Financial View (working title) </h1>

    <div class="container">
      <div class="topNews">
        <h2> Latest Market News </h2>
        <div
          class="News"
          v-for="story in latestNews.articles"
          :key="story.title"
        >

          <li class="storyTitle"> <a v-bind:href="story.url"> {{story.title}} </a> </li>

          <li class="time"> published Date/Time: <br> {{story.publishedAt}} </li>

        </div>
      </div>

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

        <div
          class="stockInfo"
          v-if="loaded"
        >

          <div
            class="stockContainer"
            v-for="(value, name) in dailyChartData"
            :key="name.open"
          >
            <div> {{ name }}: {{ value }}</div>

          </div>

          <!-- dropdown INFO -->
          <div class="dropdown">
            <button
              class="dropbtn"
              v-on:click="show"
            >Complete OverView</button>
            <div v-if="display">
              <div
                id="myDropdown"
                class="dropdown-content"
              >
              </div>

            </div>
          </div>

        </div>

        <div
          class="no-results"
          v-if="noText"
        >

          <h2>Please Enter a Ticker</h2>
          <p> OR Please adjust your search</p>
        </div>

      </div>

    </div>
    <!-- End of News/Tick Search combo -->

    <div
      class="panelContainer"
      v-if="display"
    >

      <div class="panel-1">
        <h3> Panel 1 </h3>
        <div> PERatio: {{results.PERatio}} </div>
        <div> DividendPerShare {{results.DividendPerShare}} </div>
        <div>DividendYield: {{results.DividendYiel}} </div>
        <div> AnalystTargetPrice: {{results.AnalystTargetPrice}} </div>

      </div>
      <div class="panel-2">
        <h3> Panel 2 </h3>

        <div> {{results.Description}} </div>
        <div> Address: {{results.Address}} </div>
        <div> FullTimeEmployees: {{results.FullTimeEmployees}} </div>

      </div>
      <div class="panel-3">
        <h3> Panel 3 </h3>
        <div> MarketCapitalization: {{results.MarketCapitalization}} </div>
        <div>TrailingPE: {{results.TrailingPE}} </div>
        <div> ForwardPE: {{results.ForwardPE}} </div>
        <div>PriceToBookRatio: {{results.PriceToBookRatio}} </div>

      </div>

    </div>

    <!-- StockChart -->
    <div>
      <h2> StockChart: {{ticker}} </h2>

    </div>
    <div
      class="timeSeries"
           v-if="loaded"
    >

       
          <button   
          v-for="sets in setsAvaliable"
                :key="sets.name"
                v-bind:value="sets.value" v-on:click="selected(sets.value); switchTimeSeries();"> {{ sets.text }}  </button>



    </div>
    <!-- https://codepen.io/team/amcharts/pen/ZEYXEJV -->
    <div id="chartdiv"></div>
  </div>

</template>


<script>
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated); //https://www.amcharts.com/docs/v4/getting-started/integrations/using-vue-js/

export default {
  name: "frontpage",
  components: {},

  data() {
    return {
      ticker: "",
      results: [],
      latestNews: [],
      noText: false,
      messages: [],
      loaded: false,
      chartdata: [],
      // options: null,
      display: false,
      dailyChartData: [],
      chart: "",


      chosenValue:"",
       setsAvaliable: [
        { text: "Daily", value: "daily" },
        { text: "Weekly", value: "weekly" },
        { text: "Monthly", value: "monthly" },
        { text: "Yearly", value: "yearly" },
    
       ]
    };
  },

  mounted() {
    // allows me to Get Latest News without going into Methods and calling on it form there. which i cant.  https://vuejs.org/v2/api/#created

    this.getNews(); // inital retreive
    // setInterval( ()=> this.getNews(), 5*60*1000); // and continous update every 5mins https://www.w3schools.com/js/js_timing.asp
    console.log("Latest news updates every 5 mins!!");
  },

  methods: {
    getNews: function () {
      axios
        .get(
          `http://newsapi.org/v2/top-headlines?country=us`,
          {
            params: {
               "Access-Control-Allow-Origin": "newsapi.org",
              pageSize: "5",
              category: "business",
              apiKey: "f702b0d64e0f48b5809e0c8db7c9a399",
             
            },
          }
        )
        .then((response) => {
          this.latestNews = response.data;
        })
        .catch((error) => {
          this.errors.push(error);
          //  this.showLoading = false; // this.showLoading = false was outside of the tryCatch block, so no matter what i did it is registering showLoading as false
        });
    },

    getTicker: function () {
      this.noText = false;
      // this.showLoading = true;
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
            this.dailyData();
            this.stockChart();

            // this.showLoading = false;
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
          })

          .catch((error) => {
            this.messages.push({
              type: "error",
              text: error.message,
            });
            // this.showLoading = false;
          });
              } else {
                this.noText = true;
              }
            },


    switchTimeSeries: function () {
       this.chartdata = [];
    

      axios
        .get(
          `https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&startDate=20100101&maxRecords=10&interval=60&order=asc&sessionFilter=EFK&splits=true&dividends=true&volume=sum&nearby=1&jerq=true`,
          {
            params: {
              symbol: this.ticker,
              type: this.chosenValue,
            },
          }
        )
        .then((response) => {
          this.chartdata = response.data;
         this.chart.data = this.chartdata.results;
        
         
         
          // this.stockChart();
        })
        .catch((error) => {
          this.errors.push(error);
          //  this.showLoading = false; // this.showLoading = false was outside of the tryCatch block, so no matter what i did it is registering showLoading as false
        });
    },

    /* When the user clicks on the button, 
      toggle between hiding and showing the dropdown content */
    show: function () {
      this.display = !this.display;
    },

    dailyData: function () {
      this.dailyChartData = this.chartdata.results[
        this.chartdata.results.length - 1
      ];
    },

    //https://www.amcharts.com/docs/v4/tutorials/taming-candlestick-series/
    stockChart: function () {
      am4core.useTheme(am4themes_animated);

      this.chart = am4core.create("chartdiv", am4charts.XYChart);  // i need to work around this create
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
    selected: function(value){
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
.News,
.stockContainer div {
  max-width: 600px;

  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
}
.stockContainer div {
  background-color: #e7e9eb;
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

.dropdown {
  display: flex;
  justify-content: center;
}

.dropdown-content {
  background-color: #f1f1f1;
  min-width: auto;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  max-height: 350px;
}

.dropdown-content a {
  color: black;
  text-decoration: none;
  display: flex;
}

.dropdown-content div {
  margin: 5px;
}

.panelContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.panelContainer div {
  min-width: 200px;
  max-width: 450px;
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
</style>