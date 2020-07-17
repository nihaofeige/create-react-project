import React from 'react'
import { Avatar, Button } from 'antd'
import moment from 'moment'
import './style.less'
function Comment(props) {
    return (
        <ul className="list-items">
            {
                props.commentList.map((item, index) => {
                    return (
                        <li className="list-item" key={index}>
                            <div className="list-item-meta">
                                <div className="list-item-meta-avatar">
                                    {/* <span className="avatar avatar-circle avatar-image"> */}
                                    {/* <img src={item.author_picture} alt=""/> */}
                                    <Avatar src={item.author_picture} />
                                    {/* </span> */}
                                </div>
                                <div className="list-item-meta-content">
                                    <h4 className="list-item-meta-title">
                                        {item.author_name}
                                    </h4>
                                    <div className="list-item-meta-description">
                                        <span className="list-item-meta-time">{moment(item.created_time).format("MM-DD")}</span>
                                        <span>参与讨论</span>
                                    </div>
                                    <div className="list-item-meta-description">
                                        {item.text}
                                    </div>
                                    <div className="list-item-meta-repaly">
                                        <Button type="link" size="small"> 回复 </Button>
                                        <Button type="link" size="small"> 点赞 </Button>
                                        <Button type="link" size="small"> 分享 </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Comment
