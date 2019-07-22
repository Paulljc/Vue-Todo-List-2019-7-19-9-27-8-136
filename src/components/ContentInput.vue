<template>
  <div :class="['input-layout']">
    <input id="content-input" v-model="content" @keyup.enter="createNewItem" type="text" placeholder="Input your plans!" maxlength="30"/>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        newItem: {},
        content: ''
      }
    },
    methods: {
      createNewItem(){
        let content = this.content;
        if (content === '') return;
        this.newItem = {
          content: content,
          isCompleted: false,
          id: new Date().getTime(),
        };
        this.$emit('createNewItem', this.newItem);
        this.content = '';
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  font-roboto = 'Avenir', Helvetica, Arial, sans-serif
  .input-layout {
    margin 10px 0 0
    width 100%
    font-family 'Avenir', Helvetica, Arial, sans-serif;
    @media screen and (max-width 767px) {
      margin-top 5px
    }
    &.blank > #content-input {
      padding-left 15px
    }
    #content-input {
      color #2c3e50
      // width 100%
      border none
      height 64px
      padding 18px 10px 18px 55px
      font-size 24px
      line-height 24px
      vertical-align bottom
      outline none
      box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
      border-radius 1px
      -webkit-appearance: none
      transition-property padding
      transition-duration .3s
      transition-timing-function ease-in-out
      @media screen and (max-width 767px) {
        font-size 20px
        padding-left 45px
      }
      &::-webkit-input-placeholder {
        vertical-align middle
        line-height 30px
        font-family 'Avenir', Helvetica, Arial, sans-serif;
        font-weight 100
        color #ddd
      }
    }
  }
</style>
