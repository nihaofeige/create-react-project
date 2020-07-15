import { observable, action } from 'mobx';

export default class ArticleData {
    @observable dataSource = [1,2,3,54,56,89,99]

    @action.bound 
    get() {

    }
}
