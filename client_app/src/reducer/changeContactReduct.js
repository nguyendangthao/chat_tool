import { CHANGE_CONTACT, SEND_MESSAGE, ADD_GROUP }
    from '../constants/actionReduct';

const INIT_STATE =
{
    _id: '',
    name: '',
    messages: [],
    isGroup: false,
    avatar: '',
    isOnline: null,
    isNone: true,
    avatar: ''
};

const changeContactReduct = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_CONTACT:
            state = { ...action.contact, isNone: false };
            return state;
        case SEND_MESSAGE:
            state = { ...action.contact, };
            return state;
        default: return state;
    }
};

export default changeContactReduct;
