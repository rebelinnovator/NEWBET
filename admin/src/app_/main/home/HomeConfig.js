import React from 'react';
import Home from './Home';
import {authRoles} from 'app/auth';

export const HomeConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: true
                },
                toolbar       : {
                    display: true
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: true
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },  
    auth    : authRoles.user,
    routes  : [
        {
            path     : '/home',
            component: Home
        }
    ]
};
