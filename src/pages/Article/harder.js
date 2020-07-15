import React from 'react'
import { observer } from 'mobx-react';

const Header = (props) => {

    const { author } = props
    console.log(props, author)
    return (
        <div className="header">
            <h5>{author.title}</h5>
            <div>
                <img src={author.agent.picture}></img>
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