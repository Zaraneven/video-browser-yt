import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
import CommentsAnalysis from "./components/CommentAnalysis";
import useVideos from "./useVideos";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, search] = useVideos("Games");

  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);

  return (
    <div className="ui container">
      <SearchBar onTermSubmit={search} />
      <div className="ui grid">
        <div id="video" className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
       
          <div id="list" className="five wide column">
            <VideoList
              videos={videos}
              onVideoSelect={(video) => setSelectedVideo(video)}
            />
          </div>
          
          <CommentsAnalysis video={selectedVideo} />
        </div>
      </div>
    </div>
  );
};

export default App;
