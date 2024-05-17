import React, { useRef, useState } from "react";
import Editor from 'react-simple-wysiwyg';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {message,Form,Input,Button} from "antd"


const CreateNow = () => {

    const [html, setHtml] = useState('');
    const [form] = Form.useForm();
    const onChange = (e) => {
        setHtml(e.target.value);
    }
   
    const handleCreateClick = async () => {
        try {
            // Extract the content from the HTML
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;
            const content = tempElement.innerText.trim();
            const popupId = uuidv4();  //unique id for each popup content
            const { startDelay, sendInterval, hideDuration } = form.getFieldsValue();
            const response = await axios.post('https://popupbackend-jyry.onrender.com/api/v1/pop/create', {
                popupId:popupId,
                content: content,
                startDelay,
                sendInterval,
                hideDuration
            });

            console.log(response.data); // Log response from API
            form.resetFields();
            // Handle success
            const createNowSection = document.getElementById("home");
            if (createNowSection) {
                createNowSection.scrollIntoView({ behavior: "smooth" });
            }
            console.log('Popup content saved successfully!');
            message.success('Popup saved successfully');
        } catch (error) {
            // Handle error
            console.error('Error:', error);
            const createNowSection = document.getElementById("home");
            if (createNowSection) {
                createNowSection.scrollIntoView({ behavior: "smooth" });
            }
            console.log('Error saving popup content!');
            message.error("Getting error while saving ");
        }

    };
    return (
        <div id="create-now" className="work-section-wrapper">
            <div className="work-section-top">
                <p className="primary-subheading">Create</p>

                <p className="primary-text">
                    Create Multiple PopUps
                </p>
            </div>
            <div className="testimonial-section-bottom">
                <div style={{ width: '100%' }}>
                    <Editor value={html} onChange={onChange} />
                    <Form
                        form={form}
                        onFinish={handleCreateClick}
                        layout="vertical"
                        initialValues={{
                            startDelay: '',
                            sendInterval: '',
                            hideDuration: ''
                        }}
                    >
                        <Form.Item name="startDelay" label="Start Popup after (ms)">
                            <Input type="number" style={{borderColor:"#fe9e0d"}}/>
                        </Form.Item>
                        <Form.Item name="sendInterval" label="Send popup every (ms)">
                            <Input type="number" style={{borderColor:"#fe9e0d"}}/>
                        </Form.Item>
                        <Form.Item name="hideDuration" label="Hide popup after (ms)">
                            <Input type="number" style={{borderColor:"#fe9e0d"}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"  style={{backgroundColor:"#fe9e0d"}} >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </div>
                {/* <button style={{ marginTop: "10px" }} className="secondary-button" onClick={handleCreateClick}>
                    Create
                </button> */}
            </div>
        </div>
    );
};

export default CreateNow;
