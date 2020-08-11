

import { configureStore } from '../store/indexStore';
import { SEND_MESSAGE, ADD_GROUP } from '../constants/actionReduct';

export default class DispatchChatSocket {
    sendMessageServer(contact) {
        configureStore.dispatch({
            type: SEND_MESSAGE,
            contact
        });
    }
    addGroupServer(contact) {
        debugger
        configureStore.dispatch({
            type: ADD_GROUP,
            contact
        });
    }
}

