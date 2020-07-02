
import React from 'react'
import { useHistory } from 'react-router-dom';
import { Form, Input, Checkbox, Button, Icon, message } from 'antd';
import { observer } from 'mobx-react';

import './style.css';

const LoginPage = props => {
    return (
        <div>
            <Button type="primary" htmlType="submit" className="login-form-button">
                登录
          </Button>
        </div>

    )
}

export default observer(LoginPage)