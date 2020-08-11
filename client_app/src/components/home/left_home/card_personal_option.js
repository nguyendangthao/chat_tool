import React, { useState, useEffect, useRef } from 'react';
import storage from '../../../helpers/storage';
import { useHistory } from "react-router-dom";
import Profile from '../modals/profile';
import ChangePass from '../modals/change_pass';


export const CardPersonalOption = (props) => {

    const [isViewProfile, setViewProfile] = useState(false);
    const [isChangePass, setChangePass] = useState(false);
    const history = useHistory();

    const logOut = () => {
        storage.logout();
        history.push('/login');

    }
    const wrapperRef = useRef(null);
    useEffect(() => {
        //  close if clicked on outside of element
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target) && !isShowChild()) { // isShowChild is option by logic
                props.close();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    const isShowChild = () => {
        return isViewProfile || isChangePass;
    }

    return (
        <div className="action_menu" ref={wrapperRef}>
            <ul>
                <li onClick={() => setViewProfile(true)}><i className="fas fa-user-circle" /> View profile</li>
                <li onClick={() => setChangePass(true)}><i className="fas fa-exchange-alt" /> Change password</li>
                <li><i className="fas fa-plus" /> Add to group</li>
                <li><i className="fas fa-ban" /> Block</li>
                <li onClick={logOut}><i className="fas fa-sign-out-alt" /> Logout</li>
            </ul>
            <Profile isViewProfile={isViewProfile} close={() => setViewProfile(false)} />
            <ChangePass isChangePass={isChangePass} close={() => setChangePass(false)} />
        </div>
    );
}