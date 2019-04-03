import React, { Component } from "react";
import Gif from "../components/Gif";
import Header from "../components/Header";
import Search from "../components/Search";
import InfiniteScroller from "../components/InfiniteScroller";
import { API } from "../api";
import { debounce } from "../utils";

class Home extends Component {
  apiInstance;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      gifs: [],
      offset: 0,
      limit: 25,
      totalCount: 0,
      query: "",
      theme: "light"
    };

    this.debunceFunction = debounce(this.fetchGifs, 200);
  }

  componentDidMount() {
    this.registerSW();
    this.apiInstance = new API();
  }

  registerSW = () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("service worker registered."))
        .catch(err => console.dir(err));
    }
  };

  fetchGifs = async (scrollTop = null, reset = true) => {
    const { offset, limit, query } = this.state;
    const keywords = query.split(" ").join("+");
    const gifResponse = await this.apiInstance.fetchGifs(
      keywords,
      limit,
      offset
    );
    const { data, pagination } = gifResponse;
    const newOffset = offset + limit;
    this.setState(prevState => ({
      ...prevState,
      isLoading: false,
      offset: newOffset,
      hasMore: newOffset < pagination.total_count,
      gifs: this.getUpdatedGifData(data, reset),
      totalCount: pagination.total_count
    }));

    // retain the current scroll position
    this.scrollableTo.scrollTop = scrollTop || this.scrollableTo.scrollTop;
  };

  getUpdatedGifData = (data, reset) => {
    const gifs = data.map(g => {
      return {
        id: g.id,
        title: g.title,
        gifUrl: g.images.original_still.url,
        staticUrl: g.images.original.url,
        status: "paused"
      };
    });

    return reset ? gifs : [...this.state.gifs, ...gifs];
  };

  handleSearch = e => {
    const { value } = e.target;
    this.setState(
      prevState => ({
        ...prevState,
        query: value,
        isLoading: true
      }),
      () => this.debunceFunction()
    );
  };

  handlePlayPause = e => {
    const { id } = e.target.dataset;
    const { gifs } = this.state;
    const gif = gifs.find(g => g.id === id) || {};
    if (gif.status === "paused") {
      const url = gif.gifUrl;
      gif.gifUrl = gif.staticUrl;
      gif.staticUrl = url;
      gif.status = "playing";
    } else {
      const url = gif.staticUrl;
      gif.staticUrl = gif.gifUrl;
      gif.gifUrl = url;
      gif.status = "paused";
    }

    this.setState({
      gifs
    });
  };

  getContent = () => {
    const { gifs, isLoading } = this.state;
    if (!isLoading && !gifs.length) {
      return <div className="empty">No GIFs to show</div>;
    } else {
      return gifs.map(gif => {
        const { gifUrl, id, status, title } = gif;
        return (
          <Gif key={id} url={gifUrl} title={title} status={status} id={id} />
        );
      });
    }
  };

  render() {
    const { query, isLoading, hasMore, theme } = this.state;

    const isLightTheme = theme === "light";

    return (
      <div ref={el => (this.scrollableTo = el)} className="app-container">
        <Header />
        <Search query={query} handleSearch={this.handleSearch} />
        <div className="gif-cotainer" onClick={this.handlePlayPause}>
          {this.getContent()}
        </div>
        <InfiniteScroller
          hasMore={hasMore}
          isFetching={isLoading}
          fetchMore={this.fetchGifs}
        />
        <OfflineSupport />
        <style jsx>{`
          :global(body) {
            margin: 0;
            background: ${isLightTheme ? "#fff" : "#000"};
            color: ${isLightTheme ? "#333" : "#fff"};
          }
          .app-container {
            display: flex;
            flex-direction: column;
            margin: 1rem;
            max-height: 800px;
            overflow-y: scroll;
          }

          .gif-cotainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }

          :global(.empty) {
            width: 100%;
            padding: 2rem;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
