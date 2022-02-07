import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import "./styles.css";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSeach() {
    if (input === "") {
      return alert("Digite um CEP válido!");
    }

    try {
      const response = await api.get(`${input}/json`);

      if (response.data.erro) {
        return alert("CEP não encontrado!");
      }
      setCep(response.data);
      setInput("");
    } catch (err) {
      alert("CEP inválido!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Digite o CEP..."
        />

        <button
          onClick={() => handleSeach()}
          type="button"
          className="buttonSearch"
        >
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
