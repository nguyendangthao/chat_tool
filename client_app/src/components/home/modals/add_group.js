


import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Row, Container, Col } from 'react-bootstrap';
import mainService from '../../../uitls/main_service';
import ActionChatSocket from "../../../helpers/action_chat_socket";
import storage from '../../../helpers/storage';
import { useSelector } from 'react-redux';
export default function AddGroup(props) {

    const [account, setAccount] = useState([]);
    const [keyValue, setKeyValue] = useState('');
    const [accountSelect, setAccSelect] = useState([]);
    const chanel = useSelector(state => state.changeContactReduct);
    useEffect(() => {
        findAccountFriend();
    }, [chanel?._id]);

    async function findAccountFriend(keyValue = '') {
        await mainService.findAccountFriend({ keyValue }).then(res => {
            if (res.status === 200) {
                if (chanel?.isGroup) {
                    res.data = res.data.filter(e => chanel.members.every(x => x.account_id !== e.account_id))
                }
                setAccount(res.data);
            }
        },
            err => {
                if (err?.response?.data) {
                }
            }
        );
    }
    const search = (e) => {
        setKeyValue(e.target.value);
        findAccountFriend(e.target.value);
    }
    const choiceAcc = (e, i) => {
        let acc = [...accountSelect];
        if (e.target.checked) {
            acc.push(i);
        } else {
            acc = acc.filter(x => x.account_id !== i.account_id);
        }
        setAccSelect(acc);
    }
    const clearSearch = (e) => {
        setKeyValue('');
        findAccountFriend();
    }
    const closeGroup = () => {
        setAccSelect([]);
        props.closeGroup();
    }
    const add = () => {
        setAccSelect([]);
        props.closeGroup();
        if (chanel.isGroup) {
            ActionChatSocket.updateGroup({ account: accountSelect, chanel })
        } else {
            ActionChatSocket.addGroup({ account: accountSelect, admin: storage.getAccount() })
        }

    }
    return (
        <>
            <Modal show={props.isAddGroup} onHide={closeGroup}>
                <Modal.Header closeButton md={12}>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <Button style={{ borderRadius: '50px' }} onClick={add} disabled={accountSelect.length === 0}>done</Button>
                            </Col>
                            <Col md={8}>
                                <Modal.Title >Add to Group</Modal.Title>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group">
                        <input type="text" placeholder="Search..." className="form-control search" onChange={e => search(e)} value={keyValue} />
                        <div className="input-group-prepend">
                            {keyValue && <span className="input-group-text search_btn" onClick={(e) => clearSearch(e)}><i className="fas fa-times" /></span>}
                        </div>
                    </div>
                    <ListGroup variant="flush" className="listGroup">
                        {
                            account?.map((item, i) =>
                                <ListGroup.Item key={i}>{item?.account_name}
                                    <input className="form-check-input" type="checkbox" onChange={(e) => choiceAcc(e, item)}></input>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}








