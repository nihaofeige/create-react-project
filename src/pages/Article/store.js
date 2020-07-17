import { observable, action } from 'mobx';
import { toJS } from 'mobx';
import { createContext } from 'react';
import request from "@/service/index"

class ArticleData {
    @observable dataSource = [1,2,3,54,56,89,99]
    @observable authorDetails = {}
    @observable loading = false
    @observable data = []
    @observable total = 0
    @observable allData = {}
    @observable readerObj = {}
    @observable up = {}
    @observable down = {}
    @observable allList = []
    @observable totalNum = 0
    @observable commentList = []
    @observable commentNum = 0

    @action.bound 
    async getchapters(params) {
       this.loading = true
       const res = await request({
        url: '/j/column_v2/33879818/chapters',
        prefix: 'douban',
        method: 'get',
        params: params
    });
    if (res) {
        this.loading = false
        const resData = res.list
        this.total = res.total
        this.data.push.apply(this.data,resData)
        console.log("res", this.data.length)
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
    @action.bound
    async allColumn(id) {
        const res = await request({
            url: '/j/column_v2/33879818/chapters',
            prefix: 'douban',
            method: 'get',
            params: { 
               all: 1
             }
        });
        if(res) {
            const allData = res.list
            this.allList = allData
            this.totalNum = res.total
            const obj = allData.find(el => el.id === id)
            this.allData = obj
            const index = allData.findIndex(el => el.id === id)
            if(index === 0) {
                this.up= {}
            }else {
                this.up = allData[index-1]
            }
            if(index === this.totalNum-1){
                this.down = {} 
            }else{
               this.down = allData[index+1] 
            }
            console.log(this.up)
        }
    }
    @action.bound
    async getComment(id) {
        const res = await request({
            url: `/j/article_v2/${id}/comment?limit=100&start=0`,
            prefix: 'douban',
            method: 'get',
        });
        if(res) {
          this.commentList = res.data
          this.commentNum = res.total
        }
    }
    @action.bound
    async getReader(id) {
        const res = await request({
            url: `/j/article_v2/${id}/comment`,
            prefix: 'douban',
            method: 'get',
            params: { 
            limit: 10,
            start: 0
            }
        });
        if(res) {
            this.readerObj = res
        }
    }
    @action.bound
    upDown(row) {
        console.log(row)
        this.getComment(row.id)
        const allList = this.allList
        const index = allList.findIndex(el => el.id === row.id)
        console.log(index)
        this.allData = allList[index]
        if(index === 0) {
            this.up= {}
        }else {
            this.up = allList[index-1]
        }
        if(index === this.totalNum-1){
            this.down = {} 
        }else{
           this.down = allList[index+1] 
        }
    }
}

export default createContext(new ArticleData())