import { authRoles } from 'app/auth';

const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : '',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'game',
                'title': 'BETTING',
                'type' : 'item',
                'url'  : '/game'
            },
            {
                'id'   : 'manage',
                'title': 'Admin',
                'type' : 'collapse',
                'url'  : '/manage',
                'auth' : authRoles.admin,
                'children': [
                    {
                        'id'   : 'betting',
                        'title': 'BETTING',
                        'type' : 'item',
                        'url'  : '/manage/game',
                        'exact': true
                    },
                    {
                        'id'   : 'task',
                        'title': 'TASK',
                        'type' : 'item',
                        'url'  : '/admin/task',
                        'exact': true
                    },
                    {
                        'id'   : 'users',
                        'title': 'USERS',
                        'type' : 'item',
                        'url'  : '/manage/users'
                    }
                ]
            }, /*
            {
                'id'   : 'admin',
                'title': 'Admin',
                'type' : 'item',
                'url'  : '/admin',
                'auth' : authRoles.admin,
                
               
            }, */
            {
                'id'   : 'user',
                'title': 'MY',
                'type' : 'item',
                'url'  : '/my',
                'auth' : authRoles.user
            }, 
            {
                'id'   : 'profile',
                'title': 'PROFILE',
                'type' : 'item',
                'url'  : '/profile'
            },   
            /*         
            {
                'id'   : 'contact-us',
                'title': 'CONTACT US',
                'type' : 'item',
                'url'  : '/contact-us'
            },
           */
          
            {
                'id'   : 'logout',
                'title': 'LOGOUT',
                'type' : 'item',
                'url'  : '/logout'
            }
        ]
    }
];

export default navigationConfig;
