import React, { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from "react-router-dom";
import Store from '../store';
import { Icon, Row } from 'antd';
import { observer } from 'mobx-react';
import qs from 'query-string';
import '../style.less'
import Comment from './Comment.jsx'
import NotData from './notData'
import { toJS } from 'mobx';

const Details = (props) => {
    const history = useHistory();
    const pageStore = useContext(Store)
    useEffect(() => {
        getId()
    }, []);
    const getId = () => {
        const url = history.location.search
        if (url) {
            const id = qs.parse(history.location.search).id
            pageStore.getReader(id)
            pageStore.allColumn(id)
            pageStore.getComment(id)
        } else {
            return
        }
    }
    const upDown = (row) => {
        pageStore.upDown(row)
    }
    return (
        <div className="chapter">
            <div className="chapters-list">
                <div className="chapters-title">
                    <h3>{pageStore.allData.title}</h3>
                </div>

                <div className="chapter-content">
                    <p>
                        {pageStore.allData.abstract}
                    </p>
                </div>
                <div className="up-down">
                    {pageStore.up.title ?
                        <div
                            className="up-down-title chapters-prev chapters-title"
                            onClick={() => upDown(pageStore.up)}>
                            <Icon type="left" />
                            <span>{pageStore.up.title}</span>
                        </div> : <div className="up-down-title chapters-switch chapters-prev">
                            <Icon type="left" />
                        </div>}
                    {pageStore.down.title ?
                        <div
                            className="up-down-title chapters-prev chapters-title"
                            onClick={() => upDown(pageStore.down)}
                        >
                            <span>{pageStore.down.title}</span>
                            <Icon type="right" />
                        </div> : <div className="up-down-title chapters-switch chapters-prev">
                            <Icon type="left" />
                        </div>}
                </div>
                <div className="recommend">
                    <Row>
                        <div className="section-intro-bd section-bd">
                            <h3>评论({pageStore.commentNum})</h3>
                        </div>
                    </Row>
                    <div className="comment-list">
                        {
                        pageStore.commentNum>0?
                        <Comment
                        commentList={pageStore.commentList}
                        />
                        :
                        <NotData/>
                    }
                  </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Details)
