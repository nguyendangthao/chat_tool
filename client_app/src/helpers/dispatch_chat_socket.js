

import { configureStore } from '../store/indexStore';
import { SEND_MESSAGE } from '../constants/actionReduct';

export default class DispatchChatSocket {
    sendMessageServer(contact) {
        configureStore.dispatch({
            type: SEND_MESSAGE,
            contact
        });
    }
}

