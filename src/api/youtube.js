import axios from 'axios'

const APP_KEY = process.env.REACT_APP_API_KEY;

const commentsAPI = (videoId, nextPageToken) => axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/commentThreads',
        params: {
            key: APP_KEY,
            part: 'snippet',
            maxResults: 100,
            textFormat: 'plainText',
            pageToken: nextPageToken,
            videoId: videoId
        }
});

const searchAPI = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: APP_KEY
    }
});

export { commentsAPI, searchAPI }