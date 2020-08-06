import React from 'react';
import Test from './Test';
import {authRoles} from 'app/auth';

export const TestConfig = {
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
            path     : '/test',
            component: Test
        }
    ]
};
