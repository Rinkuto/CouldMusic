import request from "../unit/request";

/**
 * 游客登录
 **/
export function AnonymousRegister() {
    return  request({
        url: '/register/anonimous',
        method: 'get',
    })
}



