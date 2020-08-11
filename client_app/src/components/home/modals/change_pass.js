


import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Container, Col, InputGroup } from 'react-bootstrap';
import mainService from '../../../uitls/main_service';
import ActionChatSocket from "../../../helpers/action_chat_socket";
import storage from '../../../helpers/storage';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function ChangePass(props) {

    const profile = storage.getAccount();
    const [validated, setValidated] = useState(false);
    let [account, setAccount] = useState({ password: '', new_password: '', confirm_password: '' });
    const [isValidPass, setValidPass] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        if (account.password && account.new_password && account.confirm_password
            && account.confirm_password === account.new_password) {
            mainService.changePassword(account).then(res => {
                if (res.status === 200) {
                    toast.success('Change pass is successfull!', { autoClose: 3000 });
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
        if (field === 'confirm_password' && e.target.value !== account.new_password) {
            setValidPass(false);
        } else {
            setValidPass(true);
        }
        account[field] = e.target.value;
        setAccount(account);
    }
    return (
        <>
            <Modal show={props.isChangePass} onHide={props.close}>
                <Modal.Header closeButton md={12}>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Button style={{ borderRadius: '50px' }} onClick={handleSubmit} >submit</Button>
                            </Col>
                            <Col md={6}>
                                <Modal.Title >Change Pass</Modal.Title>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="password"
                                    onChange={e => changeFielde(e, 'password')}
                                />
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>New Pass</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="new pass"
                                    onChange={e => changeFielde(e, 'new_password')}
                                />
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Confirm Pass</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="confirm pass"
                                    onChange={e => changeFielde(e, 'confirm_password')}
                                />
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                                {
                                    !isValidPass &&
                                    <Form.Control.Feedback style={{ color: 'red' }}>Field is not map</Form.Control.Feedback>
                                }
                            </Form.Group>
                        </Form.Row>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}








