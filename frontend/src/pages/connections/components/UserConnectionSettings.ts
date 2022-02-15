export interface ITableHead {
    id: string,
    label: string,
    alignRight: boolean
}

export const tableHeadsKita: ITableHead[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'playSchool', label: 'Kita', alignRight: false},
    {id: 'role', label: 'Rolle', alignRight: false},
    {id: 'add', label: 'Add User', alignRight: false}
];

export const tableHeadsUser: ITableHead[] = [
    {id: 'firstName', label: 'Name', alignRight: false},
    {id: 'lastName', label: 'Last Name', alignRight: false},
    {id: 'playSchool', label: 'Kita', alignRight: false},
    {id: 'role', label: 'Rolle', alignRight: false},
    {id: 'add', label: 'Add User', alignRight: false}
];

export const tableHeadsConnector: ITableHead[] = [
    {id: 'userId', label: 'userId', alignRight: false},
    {id: 'kitaId', label: 'kitaId', alignRight: false},
    {id: 'userStatus', label: 'userStatus', alignRight: false},
    {id: 'kitaStatus', label: 'kitaStatus', alignRight: false},
    {id: 'userRole', label: 'userRole', alignRight: false},
    {id: 'implementationDate', label: 'implementationDate', alignRight: false},
    {id: 'expireDate', label: 'expireDate', alignRight: false}
];