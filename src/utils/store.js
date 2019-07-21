const LOCALSTORAGE_KEY = 'todo_list';
export default {
  fetchItems(){
    return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY) || '[]')
  },
  saveItems(items){
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(items))
  }
}