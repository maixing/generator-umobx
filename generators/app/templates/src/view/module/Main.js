/**
 * Created by maixing on 2017/4/10.
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';
import './main.scss';
export default class Main extends React.PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {
    }
    render() {
        return (
            <div className="main-wrap">
                <div className="hello"><FormattedMessage id="hello"></FormattedMessage></div>
            </div>
        )
    }
}