import request from "../unit/request";


/**
 * 获得首页内容
 **/
export function homepage() {
    return request({
        url: '/homepage/block/page',
        method: 'get'
    })
}

export function getBanner() {
    return request({
        url: '/banner',
        method: 'get',
    })
}

/** 推荐歌单
 * @param params.limit 取出数量,默认为30
 **/
export function getREMDPlayList(params: object) {
    return request({
        url: '/personalized',
        method: 'get',
        params,
    })
}


/** 获取歌单的全部歌曲
 * @param params.limit 取出数量,默认为10
 * @param params.id 歌单的id
 **/
export function getMusicListAllTracks(params: object) {
    return request({
        url: '/playlist/track/all',
        method: 'get',
        params,
    })
}

/** 获取歌单的详细信息
 * @param params.id 歌单的id
 **/
export function getMusicListDetailedInfo(params: object) {
    return request({
        url: '/playlist/detail',
        method: 'get',
        params,
    })
}

/** 获取歌曲的的url
 * @param params.id 歌曲的id
 **/
export function getMusicUrl(params: object) {
    return request({
        url: '/song/url',
        method: 'get',
        params,
    })
}

/** 获取歌曲的的url
 * @param params.ids 歌曲的id,可传入多个
 **/
export function getMusicDetail(params: object) {
    return request({
        url: '/song/detail',
        method: 'get',
        params
    })
}

/** 获取歌曲的的歌词
 * @param params.id 歌曲的id
 **/
export function getLyric(params: object) {
    return request({
        url: '/lyric',
        method: 'get',
        params,
    })
}


/** 获取歌单(网友精选碟)
 @param params:order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 @param params:cat: tag, 比如 " 华语 "、" 古风 " ... , 默认为 "全部"
 @param params:limit: 取出歌单数量 , 默认为 50
 @param params:offset: 偏移数量 , 用于分页 , ( 页数 -1)*50, 其中 50 为 limit 的值
 **/
export function getTopPlayList(params: object) {
    return request({
        url: '/top/playlist',
        method: 'get',
        params
    })
}

/** 获取歌单(精品歌单)
 @param params.cat: tag, 比如 " 华语 "、" 古风 " ... , 默认为 "全部"
 @param params.limit: 取出歌单数量 , 默认为 20
 @param params.before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 **/
export function getHqPlayList(params: object) {
    return request({
        url: '/top/playlist/highquality',
        method: 'get',
        params
    })
}

/*
* 所有榜单
*/
export function getAllTopList() {
    return request({
        url: '/toplist',
        method: 'get',
    })
}


/** 获取歌单(精品歌单)
 @param params.id:  歌单 id
 @param params.limit: 取出歌单数量 , 默认为 20
 @param params.offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 @param params.before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
 **/
export function getPlayListComment(params: any) {
    return request({
        url: '/comment/playlist',
        method: 'get',
        params,
    })
}


/* 歌单分类
 */
export function getCategory() {
    return request({
        url: '/playlist/catlist',
        method: 'get',
    })
}

/**
 @param params.type -1:全部 1:男歌手 2:女歌手 3:乐队
 **/
export function getNewSongs(params: any) {
    return request({
        url: '/top/song',
        method: 'get',
        params,
    })
}

/*
-------------------歌手-----------------
 */

/** 获得歌手分类列表
 @param params.limit: 返回数量 , 默认为 30
 @param params.offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 @param params.initial: 按首字母索引查找参数 热门传-1,#传 0
 @param params.type -1:全部 1:男歌手 2:女歌手 3:乐队
 @param params.area -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 **/
export function getArtistList(params: any) {
    return request({
        url: '/artist/list',
        method: 'get',
        params,
    })
}
