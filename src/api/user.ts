import request from "../unit/request";

/**
 * 游客登录
 **/
export function AnonymousRegister() {
    return request({
        url: '/register/anonimous',
        method: 'get',
    })
}

/** 获取用户详情
 * @param params.uid 用户的id
 **/
export function getUserDetail(params: object) {
    return request({
        url: '/user/detail',
        method: 'get',
        params,
    })
}


/** 获取用户歌单
 * @param params.uid 用户的id
 * @param params.limit 取出歌单数量 , 默认为 30
 * @param params.offset 偏移数量 , 用于分页 , ( 页数 -1)*30, 其中 30 为 limit 的值
 **/
export function getUserPlaylist(params: object) {
    return request({
        url: '/user/playlist',
        method: 'get',
        params,
    })
}



