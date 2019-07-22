<template>
  <div class="outer-layer">
    <div class="container">
      <div class="layout">
        <div class="title">{{ title }}</div>
        <div class="inner-content">
          <content-input @createNewItem="createItem"></content-input>
          <ul v-if="(items.length !== 0)" :class="['items-list']">
            <content-list v-for="item in itemFilters" :item="item" :key="item.id"
                       @completeItem="completeItem"
                       @deleteItem="deleteItem"
                       @editItem="editItem">
            </content-list>
          </ul>
          <content-filter v-if="(items.length !== 0)" :status="status" 
            @category="changeCategory">
          </content-filter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentInput from './ContentInput.vue'
  import ContentList from './ContentList.vue'
  import ContentFilter from './ContentFilter.vue'

  import Store from '../utils/store.js'

  export default{
    components: {
      ContentInput,
      ContentList,
      ContentFilter
    },
    created(){
      this.items = Store.fetchItems() || [];
    },
    data(){
      return {
        title: 'Simple Todo List with adding and filter by diff status.',
        items: [],
        status: 'all',
        editing: false,
        statusFilter: {
          all(items){
            return this.active(items).concat(this.completed(items))
          },
          completed(items){
            return items.filter(function (item) {
              return item.isCompleted
            }).reverse()
          },
          active(items){
            return items.filter(function (item) {
              return !item.isCompleted
            }).reverse()
          }
        }
      }
    },
    methods: {
      createItem(item){
        this.items.push(item);
        (this.status === 'all' || this.status === 'active') ? void(0) : this.status = 'all';
      },
      completeItem(item){
        item.isCompleted = !item.isCompleted
      },
      deleteItem(item){
        this.items.splice(this.items.indexOf(item), 1)
      },
      editItem(item){
        item.item.content = item.newLabel
      },
      changeCategory(prop){
        this.status = prop
      }
    },
    watch: {
      items: {
        handler: function (items) {
          Store.saveItems(items)
        },
        deep: true
      }
    },
    computed: {
      itemFilters(){
        return this.statusFilter[this.status](this.items)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .outer-layer {
    padding 40px 0 0
    @media screen and (max-width 767px) {
      padding 50px 0 10px
    }
    .layout {
      width 640px
      margin 30px auto 0
      @media screen and (max-width: 767px) {
        margin-top 5px
        width 640px
      }
      @media screen and (max-width 640px) {
        width 100%
      }
    }
  }
  .title {
    margin-top 20px
    margin-bottom 10px
    font-size 22px
    line-height 1
    font-family Microsoft YaHei
    font-weight 100
    color #2c3e50
    user-select none
    -webkit-user-select none
    -moz-user-select none
    -ms-user-select none
    @media screen and (max-width 767px) {
      font-size 40px
      margin-bottom 5px
    }
  }
  .inner-content {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
  .items-list {
    list-style none
    padding 0
    margin 0
    border-top: 1px solid #e6e6e6;
    transition-duration .3s
    transition-timing-function ease-in-out
    & li {
      position: relative;
      font-size: 24px;
      border: 1px solid #ededed;
      border-left-width 0
      border-right-width 0
      margin-top -1px
    }
  }
</style>
