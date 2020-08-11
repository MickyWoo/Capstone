<template>
  <div class="Head">


  <div id="app">
   <nav class="main-nav">
     <div class="logo">
  <h1> My company </h1>
     </div>
     <Burger-nav></Burger-nav>
   </nav>

   <Sidebar-nav>
     <ul class="sidebar-panel-nav">
       <li><a href="#home">Home</a></li>
       <li><a href="#about">About</a></li>
       <li><a href="#contact">Contact</a></li>
     </ul>
   </Sidebar-nav>
 </div>
    <hr>
  
    <h1> Financial View (working title) </h1>


    <div class="container">

      <div class="messages">
        <message-container v-bind:messages="messages"> </message-container>
      </div>

     

        <!-- Market News -->
      <Top-News v-bind:latestNews="this.latestNews">  </Top-News>

    

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

          <!-- v-on continuation of emit Child Function > and set it to a new function in Parent component which is definded
           in parent component. -->
      <StockBasic-Info v-bind:dailyChartData="this.dailyChartData" v-on:showPanels="show()" v-if="loaded" > </StockBasic-Info>

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
    <div class="chartContainer" >
      <h2> {{ticker}} Stock Chart </h2>

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
      
          <div id="chartdiv" v-bind:class="{hidden: !loaded}"  ></div>
       
           <!-- v-bind:style="{visibility: !loaded ? 'visable' : 'hidden' }" -->
         

    </div>

  </div>

</template>


<script>
  //  import { store, mutations } from '@/store.js'
import Burger from '@/components/menu/Burger.vue';
import Sidebar from '@/components/menu/Sidebar.vue';

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
    "Burger-nav": Burger,
    "Sidebar-nav": Sidebar,
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
   
              this.stockChart();
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
            "Access-Control-Allow-Origin": "*",
 
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
                    this.chart.data = this.chartdata.results;
            this.loaded = true;
            document.getElementsByClassName("hidden").visibility = "visable",

    

            this.checkResults();

            this.dailyData();
                //  this.stockChart();
  
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


    //https://www.amcharts.com/docs/v4/tutorials/taming-candlestick-series/
    stockChart: function () {
      am4core.useTheme(am4themes_animated);
       this.chart = am4core.create("chartdiv", am4charts.XYChart);

      
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

    show: function () {
      this.display = !this.display;
     },

    dailyData: function () {
      this.dailyChartData = this.chartdata.results[
        this.chartdata.results.length - 1
      ];
    },

//    ToggleMode: function() {
//    var element = document.body;
//    element.toggle("dark-mode");
// },
    
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

.hidden{
  visibility: hidden;
}

/* SideBar CSS */
html {
   height: 100%;
   overflow:hidden;
 }

 body {
   border: 0; margin: 0; padding: 0;
   font-family: 'Lato';
   height: 100%;
   background: rgb(101,31,87);
   background: linear-gradient(45deg, rgba(101,31,87,1) 0%, rgba(225,113,87,1) 48%, rgba(249,248,113,1) 100%);
 }

 .logo {
   align-self: center;
   color: rgb(255, 1, 1);
   font-weight: bold;
   font-family: 'Lato'
 }

 .main-nav {
   display: flex;
   justify-content: space-between;
   padding: 0.5rem 0.8rem;
 }

 ul.sidebar-panel-nav {
   list-style-type: none;
 }

 ul.sidebar-panel-nav > li > a {
   color: rgb(255, 255, 255);
   text-decoration: none;
   font-size: 1.5rem;
   display: block;
   padding-bottom: 0.5em;
 }



/* dark mode css */
/* .dark-mode {
  background-color: black;
  color: white;
}


.theme-switch-wrapper {
  display: flex;
  align-items: center;


}
.theme-switch {
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
}

.theme-switch input {
  display:none;
}

.slider {
  background-color: #ccc;
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: #fff;
  bottom: 4px;
  content: "";
  height: 26px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 26px;
}

input:checked + .slider {
  background-color: #66bb6a;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} */

</style>