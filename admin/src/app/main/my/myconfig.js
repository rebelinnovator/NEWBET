import React from 'react';
import My from './MyApp';
import MyTask from './MyTask';
import MyOwnTask from './MyOwnTask';

import MyPromotion from './MyPromotion'
import MyPromotionSubmit from './MyPromotionSubmit'
import MyPromotionRecord from './MyPromotionRecord'
import MyBonusRecord from './MyBonusRecord'
import MyApplyBonusRecord from './MyApplyBonusRecord'
import MyApplyBonusSubmit from './MyApplyBonusSubmit'

import MyFinancial from './MyFinancial'
import MyWallet from './MyWallet'
import MyBank from './MyBank'

import Invite from './Invite'
import Complaint from './Complaint'
import ComplaintNew from './ComplaintNew'
import {authRoles} from 'app/auth';

export const MyConfig = {
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
            path    :'/my/task',
            component:MyTask
        },
        {
            path    :'/my/promotion/submit',
            component:MyPromotionSubmit
        },
        {
            path    :'/my/promotion/promotionrecord',
            component:MyPromotionRecord
        },
        {
            path    :'/my/promotion/bonusrecord',
            component:MyBonusRecord
        },
        {
            path    :'/my/promotion/applybonus',
            component:MyApplyBonusRecord
        },
        {
            path    :'/my/promotion/submitbonus',
            component:MyApplyBonusSubmit
        },
        {
            path    :'/my/promotion',
            component:MyPromotion
        },
        {
            path    :'/my/invite/:who?',
            component:Invite
        },        
        {
            path    :'/my/owntask',
            component:MyOwnTask
        },
        {
            path    :'/my/financial',
            component:MyFinancial
        },
        {
            path    :'/my/bank',
            component:MyBank
        },
        {
            path    :'/my/wallet',
            component:MyWallet
        },
        {
            path    :'/my/complaint/new',
            component:ComplaintNew
        },
        {
            path    :'/my/complaint',
            component:Complaint
        },
        
        {
            path     : '/my',
            component: My
        }
        
    ]
};
