import {Icon, IconifyIcon} from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import homeFill from "@iconify/icons-eva/home-fill";
import React from "react";

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => <Icon icon={name} width={22} height={22}/>

export interface ISidebarConfig {
    title: string
    path: string,
    icon: JSX.Element
}

const sidebarConfig: ISidebarConfig[] = [
    {
        title: 'Kita',
        path: '/main/playSchool',
        icon: getIcon(homeFill)
    },
    {
        title: 'Gruppen',
        path: '/main/groups',
        icon: getIcon(peopleFill)
    },
    {
        title: 'Kinder',
        path: '/main/children',
        icon: getIcon(peopleFill)
    },
    {
        title: 'user',
        path: '/main/user',
        icon: getIcon(peopleFill)
    },
    {
        title: 'product',
        path: '/main/products',
        icon: getIcon(shoppingBagFill)
    },
    {
        title: 'blog',
        path: '/main/blog',
        icon: getIcon(fileTextFill)
    },
    {
        title: 'login',
        path: '/login',
        icon: getIcon(lockFill)
    },
    {
        title: 'register',
        path: '/register',
        icon: getIcon(personAddFill)
    },
    {
        title: 'Not found',
        path: '/404',
        icon: getIcon(alertTriangleFill)
    }
];

export default sidebarConfig;
