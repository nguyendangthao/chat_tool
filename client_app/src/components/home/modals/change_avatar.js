


import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Container, Col, InputGroup } from 'react-bootstrap';
import mainService from '../../../uitls/main_service';
import storage from '../../../helpers/storage';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CHANGE_CONTACT } from '../../../constants/actionReduct';
export default function ChangeAvatar(props) {

    let profile = storage.getAccount();
    const [avatar, setAvater] = useState(null);
    const avt = props.channel ? props.channel.avatar : profile.personal.avatar;
    let url = avt ? mainService.getAvatar(avt) :
        'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg';
    const [avatarUrl, setAvaterUrl] = useState(null);
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        if (avatar) {
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('_id', props.channel ? props.channel._id : profile._id);
            mainService.uploadAvatar(formData, props.channel).then(res => {
                if (res.status === 200) {
                    if (props.channel) {
                        let contact = props.channel;
                        contact.avatar = res.data.avatar;
                        dispatch({
                            type: CHANGE_CONTACT, contact
                        });
                    } else {
                        profile.personal.avatar = res.data.avatar;
                        storage.setAccount(profile);
                    }
                    toast.success('Change is successfull!', { autoClose: 3000 });
                    props.close();
                }
            },
                err => {
                    if (err?.response?.data) {
                        toast.error(err.response.data.message, { autoClose: 3000 });
                    }
                }
            );
        }

    }
    const changeAvatar = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            return;
        }
        const arr = files[0].type.split('/');
        if (arr[0] === 'image') {
            // var reader = new FileReader();   // one in two ways
            // reader.onload = function (e) {
            //     setAvaterUrl(e.target.result);
            // }
            // reader.readAsDataURL(files[0]); // convert to base64 string
            const ur = URL.createObjectURL(files[0]);
            setAvaterUrl(ur);
            setAvater(files[0]);
        }
    }
    const close = () => {
        setAvaterUrl(null);
        setAvater(null);
        props.close();
    }
    return (
        <>
            <Modal show={props.isChangeAvatar} onHide={close} >
                <Modal.Header closeButton md={12}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Button style={{ borderRadius: '50px' }} onClick={handleSubmit} disabled={!avatar && !avatarUrl} >submit</Button>
                            </Col>
                            <Col md={6}>
                                <Modal.Title >Avatar</Modal.Title>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Form style={{ textAlign: '-webkit-center' }} >
                        <div className="img_cont_ava">
                            <img src={avatarUrl || url} className="rounded-circle user_img_ava"
                            />
                            <Form.File.Input onChange={changeAvatar} />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}








