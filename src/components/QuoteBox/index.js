import React, { Component } from 'react';
import Loader from '../Loader';
import style from './index.css';
import { TwitterShareButton } from 'react-share';



let quoteIndex = Math.floor(Math.random()*25);
console.log(quoteIndex);

const escapeChars = { lt: '<', gt: '>', quot: '"', apos: "'", amp: '&' };

function unescapeHTML(str) {//modified from underscore.string and string.js
    return str.replace(/\&([^;]+);/g, function(entity, entityCode) {
        var match;

        if ( entityCode in escapeChars) {
            return escapeChars[entityCode];
        } else if ( match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
        } else if ( match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
}

class QuoteBox extends Component {
  state={
    quote: '',
    author: '',
    isFetching: true
  }

  componentDidMount(){
    fetch('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=' + quoteIndex  )
      .then(response => response.json())
      .then(json => this.setState({isFetching: false, author: unescapeHTML(json[0].title), quote: unescapeHTML(json[0].content.replace(/<\/*p>/ig, ''))}))
      quoteIndex++;
  }

  newQuote = () => {

    this.setState({quote: '', author: '', isFetching: true});
    fetch('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=' + quoteIndex)
      .then(response => response.json())
      .then(json => this.setState({quote: unescapeHTML(json[0].content.replace(/<\/*p>/ig, '')), author: unescapeHTML(json[0].title), isFetching: false}))
      quoteIndex++;
  }

  tweetQuote = () => {

  }


  render(){
    return(
      <div id="quote-box">
        {this.state.isFetching ?
          <div id="loader"><Loader /></div> :
            <div>
              <p id="text">{this.state.quote}</p>
              <p id="author">--{this.state.author}--</p>
                <div id='button-div'>
                  <button id="butto">
                    <a className="twitter-share-button"
                      id="tweet-quote"
                      type="button"
                      href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.state.quote)  + "--" + encodeURIComponent(this.state.author) }
                      size="large">
                  tweet</a>
              </button>
                  <input
                    id="new-quote"
                    type="button"

                    value="next"
                    onClick={this.newQuote} />
                </div>
            </div>
          }

      </div>
    )
  }
}

export default QuoteBox
