<template>
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

</template>

<script>
export default {
    name: "TopNews",
    props: {
        latestNews: {},
    },
    data () {
        return {

        }
    },
    
}
</script>

<style scoped>
.News {
  max-width: 600px;

  border: 2px solid black;
  padding: 10px;
  list-style-type: none;
  margin: 10px;
  
}
</style>