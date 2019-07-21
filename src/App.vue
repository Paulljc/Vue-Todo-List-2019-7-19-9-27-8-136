<template>
  <div id="todo">
    <Index />
  </div>
</template>

<script>
import Index from './components/Index.vue'

export default {
  name: 'app',
  components: {
    Index
  }
}
</script>

<style scoped>
  body{
    margin: 0;
    min-height: 200vh;
    min-width: 200vw;
    overflow-y: hidden;
    background-color: #f4f4f4;
  }
  #todo{
    max-width: 200vw;
  }
</style>
