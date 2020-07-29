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

          <div class="Stockcontainer">
            <div> Name:{{results.Name}} </div>

            <div> Sector:{{results.Sector}} </div>
            <br>
            <div> PE Ratio:{{results.PERatio}} </div>
            <div> Dividend:{{results.DividendPerShare}} </div>
          </div>

 <!-- dropdown INFO -->
          <div class="dropdown">
            <button
              v-on:click="myFunction"
              class="dropbtn"
            >Complete OverView</button>
            <div
              id="myDropdown"
              class="dropdown-content"
            >
            
            <div v-for="(value, name) in results" :key="name.Symbol" > {{ name }}: {{ value }} </div>
        
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

    <div> StockChart:{{ticker}} </div>
    <stock-Chart
      v-if="loaded"
      :chartdata="chartdata"
      :options="options"
    >

    </stock-Chart>
  </div>

</template>


<script>
import axios from "axios";
import stockChart from "@/components/stockChart.vue";
//https://vue-chartjs.org/guide/#creating-your-first-chart

export default {
  name: "frontpage",
  components: {
    "stock-Chart": stockChart,
  },

  data() {
    return {
      ticker: "",
      results: [],
      latestNews: [],
      noText: false,
      messages: [],
      loaded: false,
      chartdata: null,
      options: null,
      Data : false,
    };
  },

  // I think i could have use created(){ } as well
  //mounted is used because its after html is set so I can actually use the Methods via GET. if it was before Mounted, its before DOM was loaded so nothing is there.
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
          `http://newsapi.org/v2/top-headlines?country=us&pageSize=5&category=business&apiKey=f702b0d64e0f48b5809e0c8db7c9a399`
        )
        .then((response) => {
          this.latestNews = response.data;
          //  setTimeout(() => {

          //  }, timeout);

          //i have to push some data out
        })
        .catch((error) => {
          this.errors.push(error);
          //  this.showLoading = false; // this.showLoading = false was outside of the tryCatch block, so no matter what i did it is registering showLoading as false
        });
    },

    getTicker: function () {
      this.noText = false;
      this.showLoading = true;
      this.chartdata = null;
      this.results = null;

      if (this.ticker !== "") {
        // check if search has any text
        axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&&apikey=JSAD44QMQ8EVHSX7`, // Stock OVERVIEW
            {
              params: {
                symbol: this.ticker,
              },
            }
          )
          .then((response) => {
            this.chartdata = response.data;
            this.loaded = true;

            // this.showLoading = false;
          });

        axios
          .get(
            `https://www.alphavantage.co/query?function=OVERVIEW&apikey=JSAD44QMQ8EVHSX7`, // Stock Daily Close Data Line Chart
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
  },

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
 myFunction: function() {
  this.Data = true;

}


  
};
</script>

<style scoped>
.container {
  display: flex;
}
.News {
  flex: 0 0 50%;
  justify-content: center;
  max-width: 600px;

  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
}



.stockInfo {
  flex: 0 0 50%;
  justify-content: center;
  max-width: 600px;

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
  position: relative;
  display: inline-block;
}

.dropdown-content {
 
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: #ddd;
}


</style>