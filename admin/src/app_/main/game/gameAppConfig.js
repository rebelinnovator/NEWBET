import React from 'react';
import Game from './gameApp';
import GameResult from './gameResult';
import ManageGame from './manage'
import {authRoles} from 'app/auth';

export const GameConfig = {
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
            path     : '/game',
            component: Game
        },
        {
            path     : '/result/:resultId?',
            component: GameResult
        },
        {
            path :'/manage/game',
            component: ManageGame

        }
    ]
};
