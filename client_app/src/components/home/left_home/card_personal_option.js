import React, { useState } from 'react';

export const CardPersonalOption = (props) => {
    // Declare a new state variable, which we'll call "count"
    //const [count, setCount] = useState(0);

    return (
        <div className="action_menu">
            <ul>
                <li><i className="fas fa-user-circle" /> View profile</li>
                <li><i className="fas fa-users" /> Add to close friends</li>
                <li><i className="fas fa-plus" /> Add to group</li>
                <li><i className="fas fa-ban" /> Block</li>
                <li><i className="fas fa-sign-out-alt" /> Logout</li>
            </ul>
        </div>
    );
}