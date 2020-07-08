import React, { useState, useEffect, useContext } from 'react'
import { Table, Divider, Button, Pagination, Icon } from 'antd';
import { observer } from 'mobx-react';
import Store from './store';
import { toJS } from 'mobx';
import NewForm from './newForm'

import './style.less';

const TablePage = () => {
    const pageStore = useContext(Store);

    const [state, setState] = useState({ visible: false });

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
            render: (text, record) => (
                <img className="image-table" src={text} alt="" />
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
                <span className="operation">
                    <Button type="link" block onClick={() => pageStore.delFolder(record)}>编辑</Button>
                    <Divider type="vertical" style={{ background: '#ff5722' }} />
                    <Button type="link" block>Delete</Button>
                </span>
            )
        }
    ];
    function onShow(status) {
        setState({ visible: status })
    }
    function showDrawer() {
        console.log("..........")
        setState({ visible: true })
    }
    return (
        <div className="table-page">
            <Button type="primary" onClick={showDrawer}>
                <Icon type="plus" /> 新建
            </Button>
            <div style={{ margin: "10px 0" }}></div>
            <Table
                pagination={false}
                rowKey={record => record.id}
                dataSource={toJS(pageStore.dataSource)}
                columns={columns}
            />
            <Pagination
                showSizeChanger
                loading={pageStore.loading}
                onChange={pageStore.pageChange}
                onShowSizeChange={pageStore.onShowSizeChange}
                current={pageStore.current}
                defaultCurrent={1}
                total={pageStore.total}
            />
            {state.visible ? <NewForm visible={state.visible} onShow={onShow} /> : null}
        </div>
    )
}
export default (observer(TablePage))