<template>
  <div class="category-layout">
    <ul class="category-list">
      <li @click="category(0)" :class="[{active: (status === 'all')}]">All</li>
      <li @click="category(1)" :class="[{active: (status === 'active')}]">Active</li>
      <li @click="category(2)" :class="[{active: (status === 'completed')}]">Complete</li>
    </ul>
  </div>
</template>

<script>
  export default{
    props: ['status'],
    methods: {
      category(index){
        switch (index) {
          case 0:
            this.$emit('category', 'all');
            break;
          case 1:
            this.$emit('category', 'active');
            break;
          case 2:
            this.$emit('category', 'completed');
            break;
          default:
            this.$emit('category', 'all')
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .category-layout {
    // width 100%
    height 50px
    background white
    border-top 1px solid #ededed
    padding 10px 15px
    font-weight 200
    font-size 20px
    box-sizing border-box
    font-family 'Avenir', Helvetica, Arial, sans-serif;
    .things-edit {
      float right
      z-index 3
      display none
      @media screen and (max-width 767px) {
        display block
      }
    }
    .category-list {
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      right: 0;
      left: 0;
      text-align center
      z-index 2
      & > li {
        line-height 22px
        height 22px
        display inline
        text-align center
        margin 0 20px
        color #333
        transition all .3s ease-in-out
        &.active {
          color #fc999a
          font-weight 700
        }
      }
      @media screen and (max-width 767px) {
        font-size 18px
        position relative
        margin 5px 0
        text-align left
        & > li {
          &:first-child {
            margin-left: 0
          }
        }
      }
    }
  }
</style>
