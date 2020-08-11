export interface IChannel {
    _id: string;
    name: string,
    members:object[],
    messages: [
        {
            account_id: string,
            account_name: string,
            message: string,
            time: Date,
        }
    ],
    created_at: Date,
    updated_at: Date,
    avatar: string,
    admin: {
        account_id: string,
        account_name: string,
    },
    isGroup: boolean,
}

