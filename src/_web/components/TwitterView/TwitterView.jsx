import RoundCard from "../RoundCard/RoundCard";
import avatarImage from '../DexFundCard/avatar.png';
import { useState } from "react";
import { useEffect } from "react";
import './TwitterView.css';

const TwitterView = ({ props, state }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    setTweets([
      {
        name: 'Ryan Gosling',
        id: '@gosling685',
        content: 'News from the SEC on the XRP Case! This is huge for the adoption of crypto, regulation will bring mass adoption!'
      },
      {
        name: 'Ryan Gosling',
        id: '@gosling685',
        content: 'News from the SEC on the XRP Case! This is huge for the adoption of crypto, regulation will bring mass adoption!'
      },
      {
        name: 'Ryan Gosling',
        id: '@gosling685',
        content: 'News from the SEC on the XRP Case! This is huge for the adoption of crypto, regulation will bring mass adoption!'
      }
    ]);
  }, [])
  return (
    <div className="twitter-wrapper">
      <h4 className="twitter-wrapper-title">Tweets</h4>
      {
        tweets.map(tweet => (
          <div className="tweet-item">
            <img src={avatarImage} alt="avatar" className="tweet-avatar" />
            <div className="tweet-body">
              <div className="tweet-author">
                <span className="tweet-author-name">{tweet.name}</span>
                <span className="tweet-author-id">{tweet.id}</span>
              </div>
              <p className="tweet-content">{tweet.content}</p>
            </div>
          </div>
        ))
      }
      
    </div>
  )
}

export default TwitterView;