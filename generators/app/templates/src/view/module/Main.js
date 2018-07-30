/**
 * Created by maixing on 2017/4/10.
 */
import React from "react";
import { FormattedMessage } from "react-intl";
import {Icon} from 'antd';

import "./main.less";

export default class Main extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {}
    render() {
        return (
            <div className="main-wrap">
                <div className="hello">
                    <Icon type="smile" /><FormattedMessage id="hello" />
                </div>
            </div>
        );
    }
}
