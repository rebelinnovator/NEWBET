import React from 'react';
import Error404Page from './Error404Page'

export const Error404PageConfig = {
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
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
	routes: [
		{
			path: '/errors/error-404',
			component: Error404Page
		}
	]
};

