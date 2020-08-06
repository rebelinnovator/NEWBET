import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseLoadable} from '@fuse';
import {authRoles} from 'app/auth';

export const CourseAppConfig = {
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
            path     : '/browse/:courseId/:contentId',
            component: FuseLoadable({
                loader: () => import('./Browse')
            })
        },
        {
            path     : '/courses/list/:mode',
            component: FuseLoadable({
                loader: () => import('./CourseList')
            })
        },
        {
            path     : '/courses/detail/:id',
            component: FuseLoadable({
                loader: () => import('./CourseDetail')
            })
        },  
        {
            path     : '/manage/courses/:courseId',
            component: FuseLoadable({
                loader: () => import('./CourseContents')
            })
        },
        {
            path     : '/manage/courses',
            component: FuseLoadable({
                loader: () => import('./CourseApp')
            })
        },      
        {
            path     : '/courses',
            component: () => <Redirect to="/courses/list/all"/>
        },
    ]
};
