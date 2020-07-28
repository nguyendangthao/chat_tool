
// export default class ContactView {
//     _id: string;
//     name: string;
//     account_id: string;
//     account_name: string;
//     messages: Array<object>;
//     avatar: string;
//     isGroup: boolean;
//     created_at: string;
//     admin: boolean;
//     isOnline: boolean;
// }


export default class ContactView {
    _id = '';
    name = '';
    account_id = '';
    account_name = '';
    messages: any = [];
    avatar = '';
    isGroup = false;
    created_at: string;
    isOnline = false;
}

