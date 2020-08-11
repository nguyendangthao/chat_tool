import { ADD_GROUP }
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

const addGroupReduct = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADD_GROUP:
            state = { ...action.contact, };
            return state;
        default: return state;
    }
};

export default addGroupReduct;
