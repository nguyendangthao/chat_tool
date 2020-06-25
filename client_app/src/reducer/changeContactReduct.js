import { CHANGE_CONTACT }
    from '../constants/actionReduct';

const INIT_STATE =
{
    _id: '',
    name: '',
    messages: [],
    isGroup: false,
    avatar: '',
    isOnline: null,
};

const changeContactReduct = (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_CONTACT:
            state = { ...action.contact };
            return state;
        default: return state;
    }
};

export default changeContactReduct;
