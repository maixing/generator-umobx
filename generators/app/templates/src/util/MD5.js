/**
 * Created by maixing on 2017/4/18.
 */
import md5 from 'md5';
let MD5 = {
    md5_16:function (str) {
        let code = md5(str);
        return code.substr(8,16) ;
    },
    md5_32:function (str) {
        return md5(str);
    }

}
export default MD5;