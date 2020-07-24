<template>
  <div class="container">
    <h1> Financial View </h1>
    <div class="topNews" >
        <div class="News" v-for="story in latestNews" :key="story.id"> 
            <li class="newsSource" > </li>
            <li class="newsTitle" > </li>
            <li class="newsLink" > </li>
              <!-- sdinetigub -->

        </div>

    </div>

    <form
      class="searchbar"
      v-on:submit.prevent="getTicker"
    >
      <div class="searchbar-input">
        <!-- Input -->
        <input
          type="search"
          placeholder="Search in items"
        >
        <!-- Clear button -->
        <a
          href="#"
          class="searchbar-clear"
        ></a>
      </div>
      <!-- Cancel Link -->
      <div class="searchbar-cancel">Cancel</div>
    </form>


     <div
      class="no-results"
      v-if="noText"
    >
      
      <h2>Please Enter a Ticker</h2>
      <p> OR Please adjust your search</p>
    </div>


  </div>
</template>






<script>
import axios from "axios";


export default {
     name: "frontpage",
        components: {
            // "loading-spinner": loadingSpinner
                    },

    data() {
        return {
         results: [],
         latestNews: [],
         ticker: [],
         noText: false,
         
                 }
         },

      
        //mounted is used because its after html is set so I can actually use the Methods via GET. if it was before Mounted, its before DOM was loaded so nothing is there.
      mounted() {   // allows me to Get Latest News without going into Methods and calling on it form there. which i cant.  https://vuejs.org/v2/api/#created
    
        this.getNews(); // inital retreive 
        setInterval( ()=> this.getNews(), 5*60*1000); // and continous update every 5mins https://www.w3schools.com/js/js_timing.asp
        console.log("Latest news updates every 5 mins!!")
      },

    methods: {
      
      
              getNews: function() {
     
              axios.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f702b0d64e0f48b5809e0c8db7c9a399`)
                .then(response => {
                 this.latestNews = response.data;
                //  setTimeout(() => {
                   
                //  }, timeout);

                 //i have to push some data out
                
         
        })
                .catch(error => {
                this.errors.push(error);
                //  this.showLoading = false; // this.showLoading = false was outside of the tryCatch block, so no matter what i did it is registering showLoading as false
        });
        
      
        
        },
           
    
        
        



             getTicker: function() {
                 this.showLoading = true;
                 this.results = [];
                    if (this.ticker !== "") {
                        // check if search has any text
                        axios
                        .get(`https://marketdata.websol.barchart.com/getHistory.json?apikey=faf40b2f41f0480230752ec47aacc00f&type=daily&`, {
                            params: {
                            symbol: this.ticker
                            }
                        })
                        .then(response => {
                            this.results = response.data;
                            // this.showLoading = false;
                    
                        })
                        .catch(error => {
                            this.messages.push({
                            type: "error",
                            text: error.message
                            });
                            // this.showLoading = false;
                        });

                        }else {
                        this.noText = true;
                         }
                        
                    },

                    

                    
     
 
    },
}



</script>

<style scoped>
</style>