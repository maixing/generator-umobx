import serverconfig from "../../resource/serverconfig/server.json";
import config from './FacadeConfig';
let baseUrl = "";
if(production){
  baseUrl = "http://" + serverconfig.pro.serverIp + ":" + serverconfig.pro.serverPort + serverconfig.pro.serverBaseUrl;
}else{
  baseUrl = "http://" + serverconfig.dev.serverIp + ":" + serverconfig.dev.serverPort + serverconfig.dev.serverBaseUrl;
}
export default instance;
