import { Route, IndexRoute, IndexRedirect } from "react-router";
import { Router, hashHistory, browserHistory } from "react-router";
import cookie from "js-cookie";
import React from "react";

function onEnter(nextState, replace, callback) {
    let agent = navigator.userAgent;
    console.log(agent);
    var regStr_ie = /MSIE\/[\d.]+/gi;
    var regStr_ff = /Firefox\/[\d.]+/gi;
    var regStr_chrome = /Chrome\/[\d.]+/gi;
    var regStr_saf = /Safari\/[\d.]+/gi;
    var edge = /rv:[\d.]+/gi;
    //IE
    if (agent.indexOf("rv") > 0 && agent.indexOf(".NET") > 0) {
        console.log(agent.match(edge) + "---->" + (agent.match(edge) + "").match(/[\d]+/));
    }
    //IE
    if (agent.indexOf("MSIE") > 0) {
        console.log(agent.match(regStr_ie) + "---->" + (agent.match(regStr_ie) + "").match(/[\d]+/));
    }

    //firefox
    if (agent.indexOf("Firefox") > 0) {
        console.log(agent.match(regStr_ff) + "---->" + (agent.match(regStr_ff) + "").match(/[\d]+/));
    }

    //Chrome
    if (agent.indexOf("Chrome") > 0) {
        console.log(agent.match(regStr_chrome) + "---->" + (agent.match(regStr_chrome) + "").match(/[\d]+/));
    }

    //Safari
    if (agent.indexOf("Safari") > 0 && agent.indexOf("Chrome") < 0) {
        console.log(agent.match(regStr_saf) + "---->" + (agent.match(regStr_saf) + "").match(/[\d]+/));
    }
    callback();
}
function onChange(prevState, nextState, replace, callback) {
    callback();
}
const routes = [
    {
        path: "/",
        onEnter: onEnter,
        onChange: onChange,
        getComponent(nextState, cb) {
            require.ensure([], function(require) {
                cb(null, require("../view/module/Main").default);
            });
        }
    }
];
export default class Routers extends React.Component {
    render() {
        return <Router history={hashHistory}>{routes}</Router>;
    }
}
