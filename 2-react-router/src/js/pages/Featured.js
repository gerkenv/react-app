import React from "react";

import Article from "../components/Article";

export default class Featured extends React.Component {
  getArticles() {
    const Articles = [
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
    ].map((title, i) => <Article key={i} title={title}/> );

    return Articles;
  }

  getRandomAd() {
    const adText = [
      "Ad spot #1",
      "Ad spot #2",
      "Ad spot #3",
      "Ad spot #4",
      "Ad spot #5",
    ];
    const randomAd = adText[Math.round( Math.random() * (adText.length-1) )];

    return randomAd;
  }

  render() {
    return (
      <div>
        <h1>Featured</h1>

        <div class="row">
          <div class="col-lg-12">
            <div class="well text-center">
              {this.getRandomAd()}
            </div>
          </div>
        </div>

        <div class="row">{this.getArticles()}</div>
      </div>
    );
  }
}