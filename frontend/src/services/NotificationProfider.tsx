import React, {createContext, ReactElement, useContext, useState} from "react";
import {INotifications} from "../layouts/mainPage/NotificationPopover";
import {BackendCom} from "./BackendProvider";

export interface INotificationContext {
    notifications: INotifications[]
    markAllAsRead: () => void,
    getUserNotifications: () => void
}

export const NotificationCom = createContext<INotificationContext>({
    notifications: [],
    markAllAsRead: () => {
    },
    getUserNotifications: () => {
    },
})

const NotificationProfider = ({children}: { children: ReactElement<any, any> }) => {

    const {callBackend} = useContext(BackendCom);

    const [notifications, setNotifications] = useState<INotifications[]>([]);

    const markAllAsRead = () => {
        setNotifications(
            // @ts-ignore
            notifications.map((notification) => ({
                ...notification,
                isUnRead: false
            }))
        );
    };

    const getUserNotifications = () => {
        callBackend('/api/userNotification', 'GET', {}, false)
            .then((json: INotifications[]) => setNotifications(json))
    }

    return (<NotificationCom.Provider value={{
        notifications, markAllAsRead, getUserNotifications
    }}>
        {children}
    </NotificationCom.Provider>)

}

export default NotificationProfider