import Admin from './adminApp'
import TaskAdmin from './taskAdmin'
import {authRoles} from 'app/auth';

export const AdminConfig = {
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
    auth    : authRoles.admin,
    routes  : [
        {
            path    :'/admin/task',
            component:TaskAdmin
        },
        {
            path    :'/admin',
            component:Admin
        }
         
    ]
};