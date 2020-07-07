import React, { useState, useEffect, useContext } from 'react'
import { Table, Divider } from 'antd';
import { observer } from 'mobx-react';
import Store from './store';
import { toJS } from 'mobx';

import './style.less';

const TablePage = () => {
  const pageStore = useContext(Store);
  useEffect(() => {
    pageStore.setTable();
  }, []);
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '详情',
            dataIndex: 'describe',
            key: 'describe',
        },
        {
            title: '图片',
            dataIndex: 'imgUrl',
            key: 'imgUrl',
            render: (text,record) => (
                <img className="image-table" src={text} alt=""/>
            )
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: "操作",
            key: 'action',
            render: (text, record) => (
                <span>
                    <a>Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                </span>
            )
        }
    ];
    return (
        <div className="table-page">
            <Table rowKey={ record => record.id } dataSource={toJS(pageStore.dataSource)} columns={columns} />
        </div>
    )
}
export default (observer(TablePage))