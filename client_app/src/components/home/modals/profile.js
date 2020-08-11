


import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Container, Col, InputGroup } from 'react-bootstrap';
import mainService from '../../../uitls/main_service';
import ActionChatSocket from "../../../helpers/action_chat_socket";
import storage from '../../../helpers/storage';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Profile(props) {

    const profile = storage.getAccount();
    const [validated, setValidated] = useState(false);
    let [account, setAccount] = useState(profile);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        if (account.account_name && account.phone_number) {
            mainService.update(account).then(res => {
                if (res.status === 200) {
                    storage.setAccount(account);
                    toast.success('Update is successfull!', { autoClose: 3000 });
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
    const changeFielde = (e, field) => {
        if (field === 'lock')
            account.lock = !account.lock;
        else
            account[field] = e.target.value;
        setAccount(account);
    }
    return (
        <>
            <Modal show={props.isViewProfile} onHide={props.close} size="lg">
                <Modal.Header closeButton md={12}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Button style={{ borderRadius: '50px' }} onClick={handleSubmit} >submit</Button>
                            </Col>
                            <Col md={6}>
                                <Modal.Title >Profile</Modal.Title>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={profile?.email}
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="name"
                                    defaultValue={profile?.account_name}
                                    onChange={e => changeFielde(e, 'account_name')}
                                />
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="phone"
                                    defaultValue={profile?.phone_number}
                                    onChange={e => changeFielde(e, 'phone_number')}
                                />
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" >
                                <Form.Label>Lock</Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    defaultChecked={profile?.lock}
                                    onChange={e => changeFielde(e, 'lock')}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}








