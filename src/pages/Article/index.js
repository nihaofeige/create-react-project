
import React, { useState, useEffect, useContext, useRef } from 'react'
import { useHistory } from "react-router-dom";
import { Row } from 'antd';
import Store from './store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Header from './header'
import Recommend from './recommend'
import './style.less';

const Article = (props) => {
    const pageStore = useContext(Store)
    const [state, setState] = useState({ start: 0 });
    const latest = useRef();
    const history = useHistory();
    useEffect(() => {
        pageStore.getAuthor();
        pageStore.getchapters({
          start: 0,  
          limit: 10,
          latestFirst:0
        })
    }, []);
    const getMore = () =>{
        
        setState({
            start: ++state.start
        })
        console.log("setState",state.start)
        pageStore.getchapters({
            start: (state.start)*10,  
            limit: 10,
            latestFirst:0
      })
      latest.current = state.start
    }
    const jumpDetalis = (row) =>{
        history.push( {
            pathname: '/article/api',
            search: `?id=${row.id}`
        })
    }
    return (
        <div className="article-details">
            <div className="article-author">
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
            <Row>
                <div className="section-latest-chapter">
                    <label className="label-icon">最新章节</label>
                    <span className="title">剑来</span>
                </div>
            </Row>
            <div className="chapters">
                <ul className="chapters-ul">
                    {
                        toJS(pageStore.data).map((item, key) => {
                            return (
                                <li key={key} className="section-chapters-bd chapter-item" onClick={()=>jumpDetalis(item)}>
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
                    {
                    toJS(pageStore.data).length !== pageStore.total ?
                    <li className="lnk-more" onClick={getMore}>加载更多</li> 
                    : null
                    }
                </ul>
            </div>
            <div className="recommend">
            <Row>
                <div className="section-intro-bd section-bd">
                    <h3>同类文学名单推荐</h3>
                </div>
            </Row>
            <Recommend/>
            </div>
            </div>
        </div>
    )
}

export default observer(Article)