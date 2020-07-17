import React from 'react'
import { observer } from 'mobx-react';

const Header = (props) => {

    const { author } = props
    return (
        <div className="header">
            <h3 style={{lineHeight: '40px'}}>{author.title}</h3>
            <div>
                <img className="author-name" src={author.agent.picture}></img>
                <p>{author.agent.name}</p>
                <p>
                    <span>作者简介: </span>
                    <span>{author.agent.intro}</span>
                </p>
            </div>
        </div>
    )
}

export default observer(Header)