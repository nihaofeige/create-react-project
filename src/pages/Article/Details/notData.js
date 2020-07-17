import React from 'react'
import { Icon } from 'antd'
import './style.less'
function NotData() {
    return (
        <div className="not-404">
            <Icon type="inbox" style={{fontSize: '50px', color: 'rgba(0, 0, 0, 0.25)'}}/>
            <p>暂无评论</p>
        </div>
    )
}

export default NotData
