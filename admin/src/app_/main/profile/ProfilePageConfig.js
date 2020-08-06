import {FuseLoadable} from '@fuse';

export const ProfilePageConfig = {
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
    routes  : [
        {
            path     : '/profile',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        }
    ]
};
