<template>
  <li :class="['todo-list', {completed: item.isCompleted}]">
    <input v-show="!editing" class="content-checkbox" type="checkbox" :checked="item.isCompleted"
           @click="completeItem">
    <label v-show="!editing" :class="['item-content']" @dblclick="editItem">
      {{item.content}}
    </label>
    <input v-if="editing" class="content-edit" v-model="content" @blur="completeEdit"
           @keyup.enter="completeEdit" @keyup.esc="cancelEdit" />
    <button v-show="!editing" class="content-delete" @click="deleteItem"></button>
  </li>
</template>

<script>
  export default{
    props: ['item'],
    data() {
      return {
        editing: false,
        content: '',
      }
    },
    created(){
      this.content = this.item.content
    },
    methods: {
      completeItem(){
        this.$emit('completeItem', this.item)
      },
      deleteItem(){
        this.$emit('deleteItem', this.item)
      },
      editItem(){
        this.editing = true;
      },
      completeEdit(){
        this.editing = false;
        this.content !== '' ? this.$emit('editItem', {item: this.item, newLabel: this.content}) : this.cancelEdit
      },
      cancelEdit(){
        this.editing = false;
        this.content = this.item.content;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  border-color = #fc999a
  .todo-list {
    color #2c3e50
    width 100%
    padding 15px 0
    // min-height 64px
    border-style solid
    border-width 0
    background white
    opacity: 1
    border-left-color: border-color
    border-right-color: border-color
    .content-checkbox {
      padding 12px 0
      text-align: center;
      width: 50px;
      box-sizing border-box !important
      height 64px
      position absolute
      top 0
      bottom 0
      margin: auto 0;
      border: none; /* Mobile Safari */
      -webkit-appearance: none;
      appearance: none;
      display block
      user-select text
      /*writing-mode horizontal-tb*/
      outline none !important
      @media screen and (max-width 767px) {
        padding 17px 0
        width 40px
      }
    }
    .content-checkbox {
      &:after {
        content url("../assets/img/checkbox.svg")
        @media screen and (max-width 767px) {
          content url("../assets/img/sm_checkbox.svg")
        }
      }
      &:checked {
        background white !important
        &:after {
          content: url("../assets/img/checkbox_checked.svg")
          @media screen and (max-width 767px) {
            content url("../assets/img/sm_checkbox_checked.svg")
          }
        }
      }
    }
    .item-content, .content-edit {
      margin -15px 0
      padding 15px 15px 15px 55px
      font-size 24px
      line-height 34px
      vertical-align middle
      width 83.5%
      font-weight 400
      font-family 'Avenir', Helvetica, Arial, sans-serif;
      @media screen and (max-width 767px) {
        font-size 20px
        padding-left 45px
      }
    }
    .content-edit {
      border 1px solid #fc999a
      outline none
      margin -20px 0px -15px
      padding 19px 50px 15px 45px
      border-radius 0 !important
      box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
      z-index 3
      @media screen and (min-width 768px) {
        padding-left 55px
      }
    }
    .content-delete {
      position absolute
      color #fc999a
      top: -5px
      right: 10px;
      bottom: 0;
      width: 30px;
      height: 64px;
      margin: auto 0;
      font-size: 30px;
      line-height 1.0
      vertical-align top
      background rgba(0, 0, 0, 0)
      border: none
      font-weight 100
      font-family 'Avenir', Helvetica, Arial, sans-serif;
      padding 0
      outline none
      display none
      @media screen and (min-width 640px) {
        right 15px
      }
      &:after {
        content: '×'
      }
    }
    &.completed {
      .item-content {
        color: #bbb
        text-decoration:line-through
      }
    }
    &:hover .content-delete {
      display block
      @media screen and (max-width 767px) {
        display none
      }
    }
  }
</style>
