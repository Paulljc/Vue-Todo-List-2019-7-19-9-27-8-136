export default {
    all(items){
      return this.active(items).concat(this.completed(items))
    },
    completed(items){
      return items.filter(function (item) {
        return item.isFinished
      }).reverse()
    },
    active(items){
      return items.filter(function (item) {
        return !item.isFinished
      }).reverse()
    }
  }