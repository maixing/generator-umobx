/**
 * Created by maixing on 2017/4/10.
 */
import { FormattedMessage } from "react-intl";
import React from "react";

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
                    <FormattedMessage id="hello" />
                </div>
            </div>
        );
    }
}
