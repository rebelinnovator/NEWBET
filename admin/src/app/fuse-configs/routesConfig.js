import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {CourseAppConfig} from 'app/main/courses/CourseAppConfig';
import {UsersAppConfig} from 'app/main/users/UsersAppConfig';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {ForgotPwdConfig} from 'app/main/forgotpwd/ForgotPwdConfig';
import {HomeConfig} from 'app/main/home/HomeConfig';
import {TestConfig} from 'app/main/test/TestConfig';

import {ContactConfig} from 'app/main/contact/ContactConfig';
import {QuizConfig} from 'app/main/quiz/QuizConfig';
import {RegisterConfig} from 'app/main/register/RegisterConfig';
import {LogoutConfig} from 'app/main/logout/LogoutConfig';
import {ProfilePageConfig} from 'app/main/profile/ProfilePageConfig'
import {SettingsConfig} from 'app/main/settings/SettingsConfig'
import {Error404PageConfig} from 'app/main/error/404/Error404PageConfig'
 
import {GameConfig} from 'app/main/game/gameAppConfig'
import {MyConfig} from 'app/main/my/myconfig'
import {AdminConfig} from 'app/main/admin/adminConfig'

const routeConfigs = [
    CourseAppConfig,
    UsersAppConfig,
    LoginConfig,
    ForgotPwdConfig,
    RegisterConfig,
    HomeConfig,
    TestConfig,
    ContactConfig,
    QuizConfig,
    LogoutConfig,
    ProfilePageConfig,
    SettingsConfig,
    Error404PageConfig,
    GameConfig,
    MyConfig,
    AdminConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path : '/',		
        exact : true,
        component : () => <Redirect to="/game"/>
    },
	{
		component: () => <Redirect to="/errors/error-404" />
	}
];

 export default routes;
