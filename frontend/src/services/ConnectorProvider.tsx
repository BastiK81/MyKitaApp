import React, {ChangeEvent, createContext, MouseEventHandler, ReactElement, useContext, useState} from "react";
import {BackendCom} from "./BackendProvider";
import {UserItem} from "./UserProvider";
import {KitaCom, KitaItem} from "./KitaProvider";
import {SortDirection} from "@mui/material/TableCell/TableCell";
import {
    ITableHead,
    tableHeadsConnector,
    tableHeadsKita,
    tableHeadsUser
} from "../pages/connections/components/ConnectionSettings";

export interface IConnectorProvider {
    connector: ConnectorItem[],
    users: UserItem[],
    kitas: KitaItem[],
    getAllKitas: () => void,
    refreshUsers: (playSchoolId: string) => void,
    getAllAccepted: (playSchoolId: string) => void,
    getAllInProgress: (playSchoolId: string) => void,
    getAllPending: (playSchoolId: string) => void,
    getAllAcceptedUser: () => void,
    getAllInProgressUser: () => void,
    getAllPendingUser: () => void,
    addUserConnection: (userId: string, playSchoolId: string) => void,
    addKitaConnection: (userId: string, playSchoolId: string, userRole: string) => void,
    changeConnection: (id: string, userRole: string) => void,
    confirmConnection: (id: string) => void,
    deleteConnection: (id: string) => void,


    filterName: string,
    alignment: string,
    title: string,
    selected: string[];
    order: SortDirection,
    rowsPerPage: number,
    page: number,
    tableHeads: ITableHead[]
    orderBy: string,
    itemCount: number,
    pageSelection: string,

    handleFilterByName: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    handleSelectAllUserClick: (event: ChangeEvent<HTMLInputElement>) => void,
    handleRequestSort: (event: MouseEventHandler<HTMLAnchorElement>, property: string) => void,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    handleSelectAllConsClick: (event: ChangeEvent<HTMLInputElement>) => void,
    handleClickSelect: (event: ChangeEvent<HTMLInputElement>, name: string) => void,
    showSelection: (newAlignment: string, selection: string) => void,
    getAllParents: () => void,
    parentUser: UserItem[],
}

export const ConnectorCom = createContext<IConnectorProvider>({
    parentUser: [],
    connector: [],
    getAllParents(): void {
    },
    users: [],
    kitas: [],
    getAllKitas: () => {
    },
    refreshUsers: () => {
    },
    getAllAccepted: () => {
    },
    getAllInProgress: () => {
    },
    getAllPending: () => {
    },
    addUserConnection: () => {
    },
    addKitaConnection: () => {
    },
    getAllAcceptedUser: () => {
    },
    getAllInProgressUser: () => {
    },
    getAllPendingUser: () => {
    },
    changeConnection: () => {
    },
    confirmConnection: () => {
    },
    deleteConnection: () => {
    },
    filterName: '',
    alignment: '',
    title: '',
    selected: [],
    order: 'asc',
    rowsPerPage: 5,
    page: 0,
    tableHeads: [],
    orderBy: '',
    itemCount: 0,
    pageSelection: '',

    handleFilterByName: () => {
    },
    handleSelectAllUserClick: () => {
    },
    handleRequestSort: () => {
    },
    handleChangePage: () => {
    },
    handleChangeRowsPerPage: () => {
    },
    handleSelectAllConsClick: () => {
    },
    handleClickSelect: () => {
    },
    showSelection: () => {
    }
})

export interface ConnectorItem {
    id: string,
    userId: string,
    kitaId: string,
    userStatus: string,
    kitaStatus: string,
    userRole: string,
    implementationDate: Date,
    expireDate: Date
}

const ConnectorProvider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom)
    const {kitaItem} = useContext(KitaCom);

    const [connector, setConnector] = useState<ConnectorItem[]>([])
    const [users, setUsers] = useState<UserItem[]>([])
    const [kitas, setKitas] = useState<KitaItem[]>([]);

    const [parentUser, setParentUser] = useState<UserItem[]>([]);
    const [pageSelection, setPageSelection] = useState('');
    const [filterName, setFilterName] = useState('');
    const [alignment, setAlignment] = React.useState('Confirmed');
    const [tableHeads, setTableHeads] = useState<ITableHead[]>(tableHeadsConnector);
    const [title, setTitle] = useState('Confirmed Connections');
    const [selected, setSelected] = useState<string[]>([]);
    const [order, setOrder] = useState<SortDirection>('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [itemCount, setItemCount] = useState(0);

    const getAllParents = () => {
        callBackend("/api/userConnection/getallparents/" + kitaItem.id, 'GET', {}, false)
            .then((json: UserItem[]) => setParentUser(json))
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const refreshUsers = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllConnectableUser/" + playSchoolId, 'GET', {}, false)
            .then((json: UserItem[]) => setUsers(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllAccepted = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllAccepted/" + playSchoolId, 'GET', {}, false)
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllInProgress = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllInProgress/" + playSchoolId, 'GET', {}, false)
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllPending = (playSchoolId: string) => {
        callBackend("/api/userConnection/getAllPending/" + playSchoolId, 'GET', {}, false)
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllAcceptedUser = () => {
        callBackend("/api/userConnection/getAllAcceptedUser/", 'GET', {}, false)
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllInProgressUser = () => {
        callBackend("/api/userConnection/getAllInProgressUser/", 'GET', {}, false)
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllPendingUser = () => {
        callBackend("/api/userConnection/getAllPendingUser/", 'GET', {}, false)
            .then((json: ConnectorItem[]) => setConnector(json))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getAllKitas = () => {
        callBackend("/api/userConnection/getAllKitas", 'GET', {}, false)
            .then((json: KitaItem[]) => setKitas(json))
    }

    const addUserConnection = (userId: string, playSchoolId: string) => {
        const data = {
            userId: userId,
            kitaId: playSchoolId,
            userRole: 'NONE'
        }
        callBackend("/api/userConnection/addUserSide", 'POST', data, true)
            .catch((error) => {
                console.error('Error:', error);
            });
        showSelection(alignment, pageSelection)
    }

    const addKitaConnection = (userId: string, playSchoolId: string, userRole: string) => {
        const data = {
            userId: userId,
            kitaId: playSchoolId,
            userRole: userRole,
        }
        callBackend("/api/userConnection/addKitaSide", 'POST', data, true)
            .catch((error) => {
                console.error('Error:', error);
            });
        showSelection(alignment, pageSelection)
    }

    const changeConnection = (id: string, userRole: string) => {
        callBackend("/api/userConnection/change/" + id + "/" + userRole, 'POST', {}, true)
            .catch((error) => {
                console.error('Error:', error);
            });
        showSelection(alignment, pageSelection)
    }

    const confirmConnection = (id: string) => {
        callBackend("/api/userConnection/confirm/" + id, 'POST', {}, true)
            .catch((error) => {
                console.error('Error:', error);
            });
        showSelection(alignment, pageSelection)
    }

    const deleteConnection = (id: string) => {
        callBackend("/api/userConnection/delete/" + id, 'POST', {}, true)
            .catch((error) => {
                console.error('Error:', error);
            });
        showSelection(alignment, pageSelection)
    }

    const handleRequestSort = (event: MouseEventHandler<HTMLAnchorElement>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllConsClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = users.map((n) => n.firstName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelectAllUserClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: string[] = users.map((n) => n.firstName);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const handleClickSelect = (event: ChangeEvent<HTMLInputElement>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const showSelection = (newAlignment: string, selection: string) => {
        setUsers([])
        setKitas([])
        setConnector([])
        setAlignment(newAlignment)
        setPageSelection(selection)
        if (newAlignment === 'Add New') {
            if (selection === 'User') {
                getAllKitas()
                setTableHeads(tableHeadsKita)
                setTitle('Available Kitas')
                setItemCount(kitas.length)
            } else {
                refreshUsers(kitaItem.id)
                setTableHeads(tableHeadsUser);
                setTitle('Available User')
                setItemCount(users.length)
            }
        } else {
            if (selection === 'User') {
                if (newAlignment === 'Confirmed') {
                    getAllAcceptedUser()
                }
                if (newAlignment === 'Pending') {
                    getAllPendingUser()
                }
                if (newAlignment === 'In Progress') {
                    getAllInProgressUser()
                }
            } else {
                if (newAlignment === 'Confirmed') {
                    getAllAccepted(kitaItem.id)
                }
                if (newAlignment === 'Pending') {
                    getAllPending(kitaItem.id)
                }
                if (newAlignment === 'In Progress') {
                    getAllInProgress(kitaItem.id)
                }
            }
            setTitle('All Connections ' + newAlignment)
            setTableHeads(tableHeadsConnector)
            setItemCount(connector.length)
        }
    }

    return (
        <ConnectorCom.Provider
            value={{
                connector,
                users,
                kitas,
                parentUser,
                getAllKitas,
                refreshUsers,
                getAllAccepted,
                getAllInProgress,
                getAllPending,
                getAllAcceptedUser,
                getAllInProgressUser,
                getAllPendingUser,
                addUserConnection,
                addKitaConnection,
                changeConnection,
                confirmConnection,
                deleteConnection,

                filterName,
                alignment,
                title,
                selected,
                order,
                rowsPerPage,
                page,
                tableHeads,
                orderBy,
                itemCount,
                pageSelection,

                getAllParents,
                handleFilterByName,
                handleSelectAllUserClick,
                handleRequestSort,
                handleChangePage,
                handleSelectAllConsClick,
                handleChangeRowsPerPage,
                handleClickSelect,
                showSelection,
            }}>
            {children}
        </ConnectorCom.Provider>
    )

}

export default ConnectorProvider