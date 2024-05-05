export type Board = {
    id: string;
    name: string;
    owner: any;
    studio: Studio;
    created: Date;
    updated: Date;
    active: boolean;
    settings: {};
};

export type Studio = {
    id: string;
    name: string;
    owner: any;
    created: Date;
    updated: Date;
    active: boolean;
    settings: {};
    members: [];
    managers: [];
};

export type User = {
    initials: string;
    id: string;
    username: string;
    type: number;
    settings: {};
    created: Date;
    updated: Date;
    renewal_date: Date;
    password_expired: boolean;
}