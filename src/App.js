import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { styled } from "styled-components";

function App() {
  const [cars, setCars] = useState([]);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [car, setCar] = useState("");
  const [logs, setLogs] = useState([]);

  // title: Joi.string().required(),
  // brand: Joi.string().required(),
  // price: Joi.number().required(),
  // age: Joi.number().integer().min(0).max(9999),

  function getAllCars() {
    try {
      const promise = axios.get(`${process.env.REACT_APP_URL}listCars`);
      promise.then((res) => setCars(res.data));
    } catch (error) {
      toast("Erro na API tente novamente");
    }
  }

  function postCar(e) {
    e.preventDefault();

    try {
      const body = { title, brand, price, age };
      const promise = axios.post(`${process.env.REACT_APP_URL}createCar`, body);
      promise.then((res) => setCar(res.data));
    } catch (error) {
      toast("Erro na API tente novamente");
    }

    setTitle("");
    setBrand("");
    setPrice("");
    setAge("");
  }

  function getAllLogs() {
    try {
      const promise = axios.get(`${process.env.REACT_APP_URL}logs`);
      promise.then((res) => setLogs(res.data));
    } catch (error) {
      toast("Erro na API tente novamente");
    }
  }

  return (
    <div>
      <header>
        <h1>BHUT NodeJS test</h1>
      </header>

      <div>
        <h1>Get api/listCars</h1>
        <button onClick={() => getAllCars()}>
          Clique para listar todos os carros
        </button>
        <ListCarsSec>
          {cars.length === 0
            ? ""
            : cars.map((a, b) => (
                <ListCars>
                  <p>Id do Carro: {a._id}</p>
                  <p>Nome do Carr: {a.title}</p>
                  <p>Marca: {a.brand}</p>
                  <p>Preço: {a.price}</p>
                  <p>Data de fabricação: {a.age}</p>
                </ListCars>
              ))}
        </ListCarsSec>
      </div>

      <PostCars>
        <h1>insira as informações do carro</h1>

        <form onSubmit={postCar}>
          <input
            placeholder="nome do carro"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          ></input>
          <input
            placeholder="marca"
            type="text"
            onChange={(e) => setBrand(e.target.value)}
            value={brand}
            required
          ></input>
          <input
            placeholder="preço"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          ></input>
          <input
            placeholder="ano de fabrição"
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            required
          ></input>
          <button type="submit">Crie um novo carro</button>
        </form>

        <CarCreated>
          <h1>Carro criado</h1>
          {car === "" ? (
            "Crie um carro para testar a função"
          ) : (
            <div>
              <p>Id: {car._id}</p>
              <p>title: {car.title}</p>
              <p>Brand: {car.brand}</p>
              <p>Price: {car.price}</p>
              <p>Age: {car.age}</p>
            </div>
          )}
        </CarCreated>
      </PostCars>

      <GetLogs>
        <h1>Clique no botão abaixo para buscar todos os Logs</h1>
        <button onClick={() => getAllLogs()}>GetAllLogs</button>

        {logs.length === 0
          ? ""
          : logs.map((a) => (
              <div>
                <p>Id: {a._id}</p>
                <p>data e hora da inclusao: {a.data_hora}</p>
                <p>ID do Carro criado: {a.car_id}</p>
              </div>
            ))}
      </GetLogs>
    </div>
  );
}

const ListCarsSec = styled.section`
  height: 200px;
  overflow-y: scroll;

  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
`;

const ListCars = styled.div`
  background-color: lightblue;
  gap: 30px;
  width: 300px;
  box-sizing: border-box;
  border-radius: 6px;
`;

const PostCars = styled.div``;
const CarCreated = styled.div``;

const GetLogs = styled.div`
  div {
    display: flex;
    gap: 15px;
    padding: 15px;
  }
`;

export default App;
