import {Icon, IconifyIcon} from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import homeFill from "@iconify/icons-eva/home-fill";
import React from "react";

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => <Icon icon={name} width={22} height={22}/>

export interface ISidebarConfig {
    title: string
    path: string,
    icon: JSX.Element,
    alwaysShow: boolean
}

const sidebarConfig: ISidebarConfig[] = [
    {
        title: 'Kita',
        path: '/main/playSchool',
        icon: getIcon(homeFill),
        alwaysShow: true
    },
    {
        title: 'Gruppen',
        path: '/main/groups',
        icon: getIcon(peopleFill),
        alwaysShow: false
    },
    {
        title: 'Kinder',
        path: '/main/children',
        icon: getIcon(peopleFill),
        alwaysShow: false
    },
    {
        title: 'Kita Connections',
        path: '/main/kitaConnection',
        icon: getIcon(peopleFill),
        alwaysShow: false
    },
    {
        title: 'User Connections',
        path: '/main/userConnection',
        icon: getIcon(peopleFill),
        alwaysShow: true
    },
    {
        title: 'login',
        path: '/login',
        icon: getIcon(lockFill),
        alwaysShow: true
    },
    {
        title: 'register',
        path: '/register',
        icon: getIcon(personAddFill),
        alwaysShow: true
    }
];

export default sidebarConfig;
