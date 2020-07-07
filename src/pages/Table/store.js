import { observable, action } from 'mobx';

import { createContext } from 'react';

import request from "@/service/index"

class TableStore {
    @observable dataSource = []

    @action.bound 
    async setTable() {
         const res = await request({
            url: 'http://localhost:9000/home/index',
            method: 'post',
            data: {}
        });
        if(res.success) {
            this.dataSource = res.data.data || []
        }
    }
}
export default createContext(new TableStore());