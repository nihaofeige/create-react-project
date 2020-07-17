import React from 'react'
import { list } from './data'
function Recommend() {
    return (
        <div className="recommend-list">
            <ul className="worksList--25BFr">
                {
                    list.map((item, index) => {
                        return (
                            <li key={index} className="item--rYmBn">
                                <div className="cover shadow-cover ">
                                  <a className="pic"><img src={item.cover}></img></a>
                                </div>
                                <h4 className="title">{item.title}</h4>
                                <div className="author">{item.author[0].name}</div>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default Recommend
