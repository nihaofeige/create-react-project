import { observable, action } from 'mobx';

import { createContext } from 'react';

import request from "@/service/index"

class TableStore {
    @observable dataSource = []
    @observable tableData = []
    @observable loading = false
    @observable status = false
    @observable current = 1
    @observable total = 0
    @observable size = 10

    @action.bound
    async setTable() {
        this.loading = true
        const res = await request({
            url: 'http://localhost:9000/home/index',
            method: 'post',
            data: {}
        });
        if (res.success) {
            this.loading = false
            this.tableData = res.data.data || []
            this.total = res.data.total || 0
            this.dataSource = this.setPage(this.tableData)
        }
    }
    @action.bound
    onShowSizeChange(current, pageSize) {
        this.size = pageSize
        this.current = current
        this.dataSource = this.setPage(this.tableData)
    }
    @action.bound
    delFolder(data) {
        console.log(data)
    }
    @action.bound
    pageChange(current) {
        console.log(current)
        this.current = current
        this.dataSource = this.setPage(this.tableData)
    }
    @action.bound
    setPage(data) {
        let start = this.size * this.current - this.size;
        let end = this.size * this.current;
        return data.slice(start, end);
    }
    @action.bound
    setFormData(data) {
        console.log(data, "store")
        this.tableData.unshift(data)
        this.total = this.tableData.length
    }
}
export default createContext(new TableStore());