import React, { useState, useEffect } from "react";
import { commentsAPI } from "../api/youtube";
import axios from "axios";
import Sentiment from "sentiment";


const CommentsAnalysis = ({ video }) => {
  const [comments, setComments] = useState([])
  const [text, setText] = useState([]);
  const [item, setItem] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('')

  useEffect(() => {
    if (!video) {
      return;
    }
    setText([])
    setComments(video.id.videoId)
    showComments(video.id.videoId);
    
  }, [video]);

  

  const showComments = async (videoId) => {
    const response = await commentsAPI(videoId).get(
      "",
      {},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      }
    );
   
    console.log(response.data.items);
    
    setNextPageToken(response.data.nextPageToken)
    setItem(response.data.items)
  };
  const APP_KEY = process.env.REACT_APP_API_KEY;
  const videoSrc = comments;
  console.log(videoSrc)
  let url_comments_nextPage = "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=" + videoSrc + "&key=" + APP_KEY + "&maxResults=100&pageToken=" + nextPageToken;
  const getComments1 = async() => {
    return axios.get( url_comments_nextPage ).then( async( response ) => {
        
        setItem( ( item ) => [ ...item, ...response.data.items ] );
      
    })
  }

  const sentiment = new Sentiment()

  const handleAnalyzeComments = () => {
    const mapComments = () => {
        return item.map(comment =>
            comment.snippet.topLevelComment.snippet.textDisplay
        )
    }
    const result = sentiment.analyze(JSON.stringify(mapComments()));
    const countWords = result.tokens.reduce((accumulator, value) => {
      
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
        
    },{}); 
    
     var sortWords = [];
   for(let word in countWords) {
      if(word.length > 2)
      sortWords.push([word, countWords[word]])
      
    } 
    sortWords.slice(0, 15)
    sortWords.sort((a, b) => { return b[1] - a[1]})
    
    setText(sortWords.slice(0, 15))
  } 

  
 
  const getCommentss = () =>
    item.map((comment) => {
      return (

        <div className="ui container dividing header" key={comment.id}>
          <div className="comment">
            <div className="avatar">
              <img
                alt="icons"
                src={
                  comment.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
              ></img>
            </div>

            <div className="content">
              <a className="author" href="/">
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
              </a>
              <div className="metadata">
                <span className="date">
                  {comment.snippet.topLevelComment.snippet.updatedAt}
                </span>
              </div>
            </div>
          </div>
          <div className="text">
            {comment.snippet.topLevelComment.snippet.textOriginal}
          </div>
        </div>
      );
    });

  return (
    <div className="ui comments">
      <button onClick={handleAnalyzeComments}>Analysis Comments</button> 
      <div>
        {text.map(([accumulator, value], i) => (
          <p key={i}>{accumulator} : {value}</p>
        ))}
      </div>
      <div>
        
      </div>
      {getCommentss()}
      <div style={{textAlign: 'center'}}>
      <button  onClick={getComments1}>Load More</button>
      </div>
    </div>
  );
};

export default CommentsAnalysis;