
import React, { useState, useEffect, useContext } from 'react'
import { Row } from 'antd';
import Store from './store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Header from './harder'

import './style.less';

const Article = (props) => {
    const pageStore = useContext(Store)
    useEffect(() => {
        pageStore.getAuthor();
        pageStore.getchapters()
    }, []);
    console.log(pageStore.authorDetails, "........")
    return (
        <div className="article-details">
            {JSON.stringify(pageStore.authorDetails) !== "{}" ? <Header author={pageStore.authorDetails} /> : null}
            <Row className="">
                <div className="section-intro-bd section-bd">
                    <h3>小说简介</h3>
                </div>
                <div className="section-intro-hd section-hd">{pageStore.authorDetails.abstract}</div>
            </Row>
            <Row>
                <div className="section-intro-bd section-bd">
                    <h3>章节目录</h3>
                </div>
            </Row>
            <div className="chapters">
                <ul className="chapters-ul">
                    {
                        pageStore.data.map((item, key) => {
                            return (
                                <li key={key} className="section-chapters-bd chapter-item">
                                    <h3>{item.title}</h3>
                                    <p>{item.abstract}</p>
                                    <div className="commentCount">
                                        <div className="on-sale-time">{item.onSaleTime}</div>
                                        <div className="meta-right">
                                            <span className="readCount">阅读 {item.readCount}</span>
                                            <span className="commentCount">讨论 {item.commentCount}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default observer(Article)