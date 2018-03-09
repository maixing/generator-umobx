import React from 'react';
import 'antd/dist/antd.less';
import './style/customer_ant.scss';
import './style/magic.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-progress-2/main.css';
import 'font-awesome/css/font-awesome.min.css';
import Routes from './router/routes';
import promis from 'es6-promise';
import {addLocaleData, IntlProvider} from 'react-intl';
import {LocaleProvider} from 'antd';
import cnLocale from './local/zh-CN';
import intl from 'intl';
import {Provider} from 'mobx-react';
import {observable} from 'mobx';
import appstore from './stores/AppStore';

global.Intl = intl;//解决react intl的ie问题
promis.polyfill();//
addLocaleData(cnLocale.data);
module.exports = (
    <IntlProvider locale={cnLocale.locale} messages={cnLocale.messages}>
        <LocaleProvider>
            <Provider {...appstore}>
                <Routes></Routes>
            </Provider>
        </LocaleProvider>
    </IntlProvider>
);
