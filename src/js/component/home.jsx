import React, { useState, useEffect } from "react";

const Home = () => {
  const [todolist, setTodolist] = useState([{ label: "", done: false }]);
  const [isX, setIsX] = useState(false);
  const [nuevatarea, setNuevatarea] = useState("");
  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alonsogomez", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log("get");
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        setTodolist(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleKeyEnter = (e) => {
    let newTodo = [...todolist, { label: nuevatarea, done: false }];
    if (e.key === "Enter") {
      console.log(newTodo);
      setTodolist(newTodo);
      setNuevatarea("");
      anadido(newTodo);
    }
  };

  const borrado = (indice) => {
    const Ntodo = todolist.filter((item, index) => indice !== index);
    setTodolist(Ntodo);
    anadido(Ntodo);
  };

  const anadido = (nuevoTodolist) => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alonsogomezo", {
      method: "PUT",
      body: JSON.stringify(nuevoTodolist),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log("put");
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp);
        return resp.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTareas = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/alonsogomezo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log("get");
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        setTodolist(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <h1 className="text-center">ToDos</h1>
      </div>
      <div>
        <center>
          <input
            type="text"
            placeholder="Anadir tarea"
            value={nuevatarea}
            onChange={(e) => {
              setNuevatarea(e.target.value);
            }}
            onKeyDown={handleKeyEnter}
          ></input>
        </center>
      </div>
        <ul className="list-group">
          {todolist.map((item, index) => (
            <li
              onMouseOver={() => setIsX(true)}
              onMouseLeave={() => setIsX(false)}
              key={index}
              className="list-group-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {item.label}
              {isX && (
                <button
                  className="btn btn-danger"
                  onClick={() => borrado(index)}
                >
                  X
                </button>
              )}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Home;
