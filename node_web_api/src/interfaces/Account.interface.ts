export interface AccountInterface {
    _id: string;
    created_id: string;
    account_name: string;
    password: string;
    email: string;
    phone_number: number;
    scope_access: boolean;
    lock: boolean;
    status: string;
    roles: string[];
    created_at: Date;
    updated_at: Date;
    // had better research model again
    personal: PersonalInterface;
    organization: OrganizationInterface
}

export interface PersonalInterface {
    full_name: string;
    birth_day: string;
    avatar: string;
    description: string;
}

export interface OrganizationInterface {
    o_code: string;
    o_name: string;
    o_tax_code: string;
    o_address: string;
    o_email: string;
    o_phone_number: number;
    bank_information: {
        bank_name: string;
        account_holder: string;
        accout_number: string;
        branch_bank: string;
    }
}
