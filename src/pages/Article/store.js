import { observable, action } from 'mobx';

import { createContext } from 'react';
import request from "@/service/index"

class ArticleData {
    @observable dataSource = [1,2,3,54,56,89,99]
    @observable authorDetails = {}
    @observable loading = false
    @observable data = []

    @action.bound 
    async getchapters() {
       this.loading = true
       const res = await request({
        url: '/j/column_v2/33879818/chapters',
        prefix: 'douban',
        method: 'get',
        params: {all: 1}
    });
    if (res) {
        this.loading = false
        this.data = res.list
        console.log(res)
      }
    }
    @action.bound
    async getAuthor() {
       this.loading = true
       const res = await request({
        url: '/j/column/33879818/',
        prefix: 'douban',
        method: 'get',
        params: { fields_filter: 138947206 }
    });
     if(res){
        this.loading = false
         this.authorDetails = res
     }
    }
}

export default createContext(new ArticleData())