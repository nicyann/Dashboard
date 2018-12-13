import React, { Component } from 'react';

import "./InfosSprts.css"

class InfosSports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: {},
            ids: [],
            currentArticle: null,


        };
    }

    componentDidMount() {
        const { articles, ids } = this.state;
        const {  refreshInterval } = this.props;

        fetch('https://newsapi.org/v2/top-headlines?sources=lequipe&apiKey=0c97859d12ab49b88a1733317d924c9e')
            .then(resp => resp.json())
            .then(data => {
                const articles = {};
                let ids = [];

                data.articles.map(article => {
                    articles[article.url] = article;
                    ids = [ ...ids, article.url ];
                })

                this.setState({
                    articles,
                    ids,
                    currentArticle: data.articles[0].url
                })

                const nbArticles = ids.length;
                let count = 1;

                this.timer = setInterval(() => {
                    this.props.animate().then(() => {
                        this.setState({
                            currentArticle: ids[count]
                        })
                        count = count === nbArticles - 1 ? 0 : count + 1;
                    });
                }, refreshInterval || 10000);
            })
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {

        const { articles, ids, currentArticle } = this.state;
        const { bgColor, textColor } = this.props;

        if (ids.length <= 0) return <p>Chargement...</p>

        let publishedAt = null;
        if (articles[currentArticle].publishedAt) {
            publishedAt = new Date(articles[currentArticle].publishedAt);
            publishedAt = "Le " + publishedAt.getDate() + "/0" + (publishedAt.getMonth() + 1) + "/" + publishedAt.getFullYear();
        }

        return (
            <div className={"InfosSports"} style={{ backgroundColor: bgColor, color: textColor }}>
                <img src={articles[currentArticle].urlToImage} alt={articles[currentArticle].title}/>
                <div>
                    <div className={"Title"}>{ articles[currentArticle].title }</div>
                    <div className={"Description"}>{ articles[currentArticle].description }</div>
                    <div className={"Date"}>{ publishedAt ? publishedAt : null }</div>
                </div>
            </div>
        );
    }
}

export default InfosSports;