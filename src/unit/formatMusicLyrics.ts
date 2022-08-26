export interface LyricsResp {
    lrc: LyricResp,
    tlyric: LyricResp,
}

export interface LyricResp {
    lyric: string,
    version: number,
}

export interface Lyric {
    time: number,
    timeStr: string,
    lyric: string,
    tlyric: string,
}

function getTime(time: string): number {
    let t = time.split(':');
    return Number(t[0]) * 60 + Number(t[1]);
}

export function formatMusicLyrics(lyrics: LyricsResp) {
    let returnLyric: Lyric[] = [];
    let lrc = lyrics.lrc.lyric.split(/\[\d{2}:\d{2}.\d{2,3}]/).slice(1);
    let timeLrc = lyrics.lrc.lyric.match(/\d{2}:\d{2}.\d{2,3}/g) as Array<string>;
    for (let i = 0; i < lrc.length; i++) {
        returnLyric.push({lyric: "", timeStr: "", time: 0, tlyric: ""});
        returnLyric[i].lyric = lrc[i];
        returnLyric[i].timeStr = timeLrc[i];
        returnLyric[i].time = getTime(timeLrc[i]);
    }
    if (lyrics.tlyric?.lyric !== '') {
        let j = 0;
        let timeTlyric = lyrics.tlyric.lyric.match(/\d{2}:\d{2}.\d{2,3}/g) as Array<string>;
        let tlyric = lyrics.tlyric.lyric.split(/\[\d{2}:\d{2}.\d{2,3}]/).slice(1);
        for (let i = 0; i < lrc.length; i++) {
            if (returnLyric[i].timeStr === timeTlyric[j]) {
                returnLyric[i].tlyric = tlyric[j];
                j++;
            }
        }
    }
    return returnLyric;
}

