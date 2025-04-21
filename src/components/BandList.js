import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const BandList = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const changeName = (event, id) => {
    const newName = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }

        return band;
      })
    );
  };

  const onBlur = (id, name) => {
    socket.emit("change-name-band", { id, name });
  };

  const votar = (id) => {
    socket.emit("votar-band", id);
  };

  const removeBand = (id) => {
    socket.emit("remove-band", id);
  };

  const crearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(event) => changeName(event, band.id)}
            onBlur={() => onBlur(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => removeBand(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
