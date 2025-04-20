import { useState, useEffect } from "react";
import io from "socket.io-client";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const votar = (id) => {
    socket.emit("votar-band", id);
  };

  const removeBand = (id) => {
    socket.emit("remove-band", id);
  };

  const changeBandName = (band) => {
    socket.emit("change-name-band", band);
  };

  const createBand = (name) => {
    socket.emit("create-band", name);
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success"> Online </span>
          ) : (
            <span className="text-danger"> Offline </span>
          )}
        </p>
      </div>

      <h1>BandName</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList data={bands} votar={votar} removeBand={removeBand} changeBandName={changeBandName} />
        </div>

        <div className="col-4">
          <BandAdd createBand={createBand}/>
        </div>
      </div>
    </div>
  );
}

export default App;
