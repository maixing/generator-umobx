import serverconfig from '../config/config.json';
import config from './FacadeConfig';
import cookie from 'js-cookie';
import md5 from 'md5';
import action from '../util/Action';
import actionType from '../util/ActionType';
let url = "http://" + serverconfig.ip + ":" + serverconfig.port;
let baseUrl = "http://" + serverconfig.ip + ":" + serverconfig.port + config.base;

let rnum = 0;
function endRespones(arg1, arg2) {
    rnum--;
    // console.log("endRespones---->>"+arg2+'  '+rnum);
    if(rnum == 0){
        action.onNext({
            name: actionType.HIDELOADING,
        });
    }
    if(arg2 == '登录异常或超时'){
        action.onNext({
            name: actionType.LOGINTIMMEOUT,
        });
    }
}
function startRequest(arg1, arg2) {
    rnum++;
    // console.log("startRequest---->>"+arg1+'  '+rnum);
    action.onNext({
        name: actionType.SHOWLOADING,
    });
}
let instance = {
    baseUrl:baseUrl,
}
export default instance;
