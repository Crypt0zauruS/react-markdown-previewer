import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { marked } from "marked";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const textRef = useRef();
  const previewRef = useRef();

  const initialState =
    "# Markdown Text goes here\n## You can also make subheadings\n\nThe **hardest** topic of this project was the use of `dangerouslySetInnerHTML` to make the previewer display the output of [marked.js](https://github.com/markedjs/marked/blob/master/README.md) as HTML instead of a string.\n\nAccording to the React Documentation,\n> dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. In general, setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack.\n\nExample Code:\n```\nfunction createMarkup() {\n  return {__html: 'First &middot; Second'};\n}\n\nfunction MyComponent() {\n  return <div dangerouslySetInnerHTML={createMarkup()} />;\n}\n```\n\nJust remember to:\n- Search, Read, Ask\n\n![Image](https://miro.medium.com/max/640/1*-mlSCRamu7N6Q6pHcACevA.png)";

  const [markdown, setMarkdown] = useState(initialState);
  const [markdownPreview, setMarkdownPreview] = useState(
    marked.parse(initialState)
  );

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  useEffect(() => {
    setMarkdownPreview(
      marked
        // to carriage break line
        .setOptions({
          breaks: true,
        })
        .parse(markdown)
    );
  }, [markdown]);

  useEffect(() => {
    const height = previewRef.current.scrollHeight + "px";
    textRef.current.style.height = height;
    textRef.current.style.minHeight = height;
  }, []);

  return (
    <div className="App bg-light p-3">
      <div className="container">
        <h1 className="m-5 bg-light p-5 border border-warning rounded">
          Welcome to my Markdown Previewer !
        </h1>
        <div className="row">
          <div className="col-sm-12 col-md-6 form-group shadow-textarea">
            <textarea
              className="form-control z-depth-1 textarea-autosize"
              rows="3"
              id="editor"
              value={markdown}
              ref={textRef}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div
            className="col-sm-12 col-md-6 border border-dark p-2"
            ref={previewRef}
          >
            <div
              id="preview"
              dangerouslySetInnerHTML={{ __html: markdownPreview }}
            />
          </div>
        </div>
      </div>
      <footer className="fs-5 m-4">
        &copy; Copyright by Crypt0zauruS
        <br />
        <p>
          Follow me on{" "}
          <a
            className="twitter"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/CryptosaurusRe4"
          >
            <i className="fab fa-twitter"></i>
          </a>{" "}
          and{" "}
          <a
            className="github"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Crypt0zauruS"
          >
            <i className="fab fa-github"></i>
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
