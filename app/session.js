'use client'

import axios from "axios";
import {useEffect, useState} from "react";

export default function ListClient(props) {

    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/get-data', {
            params: { username: props.name }
        })
            .then(response => {
                setData(response.data);
                const pairCount = Object.keys(response.data).length;
                setList(Array.from({ length: pairCount }, (_, index) => index));
            })
            .catch(error => {
                setError(error);
            });
    }, [props.name]);

    const todoSubmitHandler = () => {
        const todo = document.getElementById("todo").value;
        const deadline = document.getElementById("deadline").value;
        const name = document.getElementById("name").value;

        axios.post("http://localhost:8080/api/post-data", { todo, deadline, name})
            .then(res => {
                console.log(res);
                window.location.reload(); // Reload page to reflect new data
            })
            .catch(err => {
                console.error(err);
            });
    };

    const deleteRequestHandler = (id) => {
        axios.delete('http://localhost:8080/api/delete-data', {
            params: { id: id }
        })
            .then(response => {
                console.log('Success:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="list-container">
            <div className="input-container">
                <label>할일 </label>
                <input type="text" id="todo" autoComplete="off" />
                <p>&nbsp;&nbsp;&nbsp;</p>
                <label>기한 </label>
                <input type="text" placeholder="월/일" id="deadline" maxLength={5} autoComplete="off" />
                <p>&nbsp;&nbsp;&nbsp;</p>
                <input style={{ display: "none" }} value={props.name} id="name" readOnly/>
                <button onClick={todoSubmitHandler}>추가</button>
            </div>
            <div className="todo-container">
                {list.map((number) => (
                    <div key={number} className="todo-element">
                        <div className={"todo-left-box"}>
                            <p>할일: {data[number].todo}</p>
                            <p>기한: {data[number].deadline}</p>
                        </div>
                        <div className={"todo-right-box"}>
                            <button onClick={() => {deleteRequestHandler(data[number].id)}}>🗑</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
