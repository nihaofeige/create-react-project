import React, { useState, useEffect, useContext } from 'react'
import { Drawer, Form, Button, Col, Row, Input, Upload, DatePicker, Icon } from 'antd';
import { observer } from 'mobx-react';
import Store from './store';
import Moment from 'moment'

const Item = Form.Item

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const NewForm = (props) => {

    console.log(props.form.getFieldsValue().date, "<><><><><>")

    const pageStore = useContext(Store)

    const [state, setState] = useState({
        visible: props.visible,
        loading: false,
        imageUrl: ''
    });

    useEffect(() => {
        setBaseInfo(props.formData)
    }, []);

    function onClose() {
        setState({ visible: false });
        props.onShow(false)
    }
    function onsubmit(e) {
        const info = props.form.getFieldsValue()
        e.preventDefault();
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = values
                data.date = Moment(data.date).format("YYYY-MM-DD HH:mm:ss")
                pageStore.setFormData(data)
                onClose()
            }else {
                message.warning('请补全信息数据');  
            }
        });
    }
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    function handleChange(info) {
        if (info.file.status === 'uploading') {
            setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    }
    function setBaseInfo(data) {
        if(JSON.stringify(props.formData) === "{}") return
        const { form } = props;
        Object.keys(form.getFieldsValue()).forEach(key => {
            const obj = {};
            if (data[key]) {
                if(key === 'date'){
                   obj[key] = Moment(data[key]) ||null
                }else{
                   obj[key] = data[key] || null; 
                }
            }
            form.setFieldsValue(obj);
        });
    };

    const { getFieldDecorator } = props.form;

    const uploadButton = (
        <div>
            <Icon type={state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    function normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        if (e.file.response) {
            return e.file.response.url
        }
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    
    return (
        <div className="new-form">
            <Drawer
                title="新建"
                width={720}
                onClose={onClose}
                visible={props.visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form layout="horizontal" {...formItemLayout}>
                    <Row gutter={16}>
                        <Item label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter user name' }],
                            })(<Input placeholder="请填写姓名" />)}
                        </Item>
                        <Item label="详情">
                            {getFieldDecorator('describe', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写详情',
                                    },
                                ],
                            })(<Input.TextArea rows={3} placeholder="请填写详情" />)}
                        </Item>
                        <Item label="图片">
                            {getFieldDecorator('imgUrl', {
                                valuePropName: 'avatar',
                                getValueFromEvent: normFile,
                            },

                            )(<Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {props.form.getFieldsValue().imgUrl ? <img src={props.form.getFieldsValue().imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>)}
                        </Item>
                        <Item label="日期">
                            {getFieldDecorator('date',{
                               initialValue: Moment(props.form.getFieldsValue().date)
                            })(
                                <DatePicker
                                  showTime 
                                  format={"YYYY-MM-DD HH:mm:ss"} />,
                            )}
                        </Item>
                        <Item label="ID">
                            {getFieldDecorator('id', {
                            })(<Input placeholder="请填写ID" />)}
                        </Item>
                    </Row>
                </Form>
                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        取消
            </Button>
                    <Button onClick={onsubmit} type="primary">
                        确认
            </Button>
                </div>
            </Drawer>
        </div>
    )
}

export default Form.create({ NewForm })(observer(NewForm))