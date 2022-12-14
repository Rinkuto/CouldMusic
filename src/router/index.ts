import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import PersonalityRecommended from "../views/PersonalityRecommended.vue"
import SongList from "../views/SongList.vue"
import TopList from "../views/TopList.vue"
import Artist from "../views/Artist.vue"
import Album from "../views/Album.vue"
import Exclusive from "../views/Exclusive.vue"
import PlayList from "../views/PlayList.vue"
import User from "../views/User.vue"
import ArtistInfo from "../views/ArtistInfo.vue"

const routes: Array<RouteRecordRaw> = [{
    path: '/',
    redirect: '/discover',
}, {
    path: '/discover',
    children: [{
        path: '',
        component: PersonalityRecommended,
        name: 'main',
    }, {
        path: 'exclusive',
        name: 'exclusive',
        component: Exclusive,
    }, {
        path: 'playlist',
        name: 'songList',
        component: SongList,
        props: true,
    }, {
        path: 'toplist',
        name: 'topList',
        component: TopList,
    }, {
        path: 'artist',
        name: 'artist',
        component: Artist,
        props: true,
    }, {
        path: 'album',
        name: 'Album',
        component: Album,
    }]
}, {
    path: '/playlist/:id?',
    name: 'playlist',
    component: PlayList,
    props: true,
}, {
    path: '/user/:userId',
    name: 'user',
    component: User,
    props: true,
}, {
    path: '/artist/:id',
    name: 'artistInfo',
    component: ArtistInfo,
    props: true,
}];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
