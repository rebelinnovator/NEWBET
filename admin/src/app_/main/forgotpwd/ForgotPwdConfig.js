import {authRoles} from 'app/auth';
import ForgotPwd from './ForgotPwd';

export const ForgotPwdConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    
    routes  : [
        {
            path     : '/forgot-password',
            component: ForgotPwd
        }
    ]
};

