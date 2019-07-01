import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

import { host } from "../src/index";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 42rem;
  margin: 0 auto;
  padding: 1rem;
  font-family: Oswald, sans-serif;

  button {
    width: 120px;
  }
`;

const Iframe = styled.iframe`
  height: 240px;
  width: 240px;
  border: none;
`;

function makeRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function Demo() {
  const iframe = React.useRef(null);
  const [color, setColor] = React.useState();
  const [connection, setConnection] = React.useState();

  React.useEffect(() => {
    (async function () {
      const _connection = await host.connect(iframe.current, {
        setColor,
      });
      setConnection(_connection);
    }());
  }, []);

  return (
    <Background style={{ background: color }}>
      <div style={{ flex: 1 }}>
        <h1>HOST</h1>
        <button onClick={() => connection.remote.setColor(makeRandomColor())}>
          call guest
      </button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Iframe
          title="guest"
          ref={iframe}
          src={"https://storage.googleapis.com/m.au-re.com/static/index.html"}
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </Background>);
}

storiesOf("rimless", module)
  .add("iframe communication", () => <Demo />)
