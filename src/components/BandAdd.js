import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const BandAdd = () => {
  const { socket } = useContext(SocketContext);
  const [valor, setValor] = useState("");
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (valor.trim().length > 0) {
      socket.emit("create-band", { name: valor });
    }
  };

  return (
    <div>
      <h3> Agregar banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </div>
  );
};

export default BandAdd;
