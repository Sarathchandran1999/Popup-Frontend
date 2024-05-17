import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from 'antd';
import Editor from 'react-simple-wysiwyg';


const ShowPop = () => {
    const [popups, setPopups] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editablePopup, setEditablePopup] = useState(null);
    
    const columns = [
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="link" style={{ color: "#fe9e0d" }} onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" style={{ color: "#fe9e0d" }} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const fetchPopups = async () => {
        try {
            const response = await axios.get("https://popupbackend-jyry.onrender.com/api/v1/pop/all");
            console.log("response.data------------------>",response.data);
            setPopups(response.data);
        } catch (error) {
            console.error("Error fetching popups:", error);
        }
    };
    useEffect(() => {
        
        fetchPopups();
        const intervalId = setInterval(fetchPopups, 5000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    const handleEdit = (popup) => {
        setEditablePopup(popup);
        setModalVisible(true);
    };

    const handleDelete = async (popup) => {
        try {
            await axios.delete(`https://popupbackend-jyry.onrender.com/api/v1/pop/delete/${popup._id}`);
            message.success('Popup deleted successfully');
            fetchPopups(); // Refresh popups list
        } catch (error) {
            console.error("Error deleting popup:", error);
            message.error('Failed to delete popup');
        }
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setEditablePopup(null);
    };

    const handleModalSubmit = async (values) => {
        try {
            console.log("values---------------->",values)
            await axios.put(`https://popupbackend-jyry.onrender.com/api/v1/pop/edit/${editablePopup._id}`, values);
            message.success('Popup updated successfully');
            fetchPopups(); // Refresh popups list
            setModalVisible(false);
            setEditablePopup(null);
        } catch (error) {
            console.error("Error updating popup:", error);
            message.error('Failed to update popup');
        }
    };
    return (
        <div id="all-popups" className="work-section-wrapper">
            <div className="work-section-top">
                <p className="primary-subheading">All PopUps</p>
                <p className="primary-text">
                    Show all the PopUps
                </p>
            </div>
            <div className="testimonial-section-bottom">
                <Table dataSource={popups} columns={columns} />
                <Modal
                    title="Edit Popup"
                    visible={modalVisible}
                    onCancel={handleModalCancel}
                    footer={null}
                >
                    <Form
                        layout="vertical"
                        initialValues={editablePopup}
                        onFinish={handleModalSubmit}
                    >
                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: 'Please input the popup content!' }]}
                        >
                            <Editor value={editablePopup?.content} onChange={(value) => setEditablePopup({ ...editablePopup, content: value })} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{backgroundColor:"#fe9e0d"}}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default ShowPop;












