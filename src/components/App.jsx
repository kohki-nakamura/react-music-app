import React from "react";
import { getMusics } from "../api";
import { fromEvent, timer } from "rxjs"; // この行を追加
import { debounce } from "rxjs/operators"; // この行を追加


// components
import ErrorPage from "../components/modules/error";
import NoResult from "../components/modules/no_result";
import Result from "../components/modules/result";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      resultType: "init",
      items: []
    };
  }

  componentDidMount() {
    this.subscription = fromEvent(this.input, "input")
      .pipe(debounce(() => timer(500)))
      .subscribe(this.onSearch.bind(this));
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleInputChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  onSearch() {
    getMusics(this.state.keyword)
      .then(res => {
        const { data } = res;
        if (data.resultCount === 0) {
          this.setState({
            resultType: "no_result"
          });
        } else {
          this.setState({
            resultType: "success",
            items: data.results
          });
        }
      })
      .catch(err => {
        this.setState({
          resultType: "failure"
        });
      });
  }

  switchView(resultType) {
    switch (resultType) {
      case "no_result":
        return <NoResult />;
      case "success":
        return <Result items={this.state.items} />;
      case "failure":
        return <ErrorPage />;
      default:
        return <p>検索してみよう！</p>;
    }
  }

  render() {
    const Comp = this.switchView(this.state.resultType);
    return (
      <div>
        <div className="search-area">
          <input
            ref={input => (this.input = input)}
            type="text"
            className="search-input-rx"
            value={this.state.keyword}
            onChange={this.handleInputChange.bind(this)}
          />
        </div>
        {Comp}
      </div>
    );
  }
}