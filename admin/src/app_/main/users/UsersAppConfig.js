import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';
import {authRoles} from 'app/auth';

export const UsersAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },    
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/manage/users/:id',
            component: FuseLoadable({
                loader: () => import('./UsersApp')
            })
        },
        {
            path     : '/manage/users',
            component: () => <Redirect to="/manage/users/all"/>
        }
    ]
};
