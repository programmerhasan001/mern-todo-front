import { Base_Url } from '@/utils/constant';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FaRegEdit, FaTrash } from "react-icons/fa"

export default function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${Base_Url}/get`)
      .then(res => {
        setTasks(res.data)
      })
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${Base_Url}/save`, { task: input })
      .then(res => {
        console.log(res.data)
        setInput("");
        setUpdateUI(!updateUI)
        setUpdateId(null);
      })
  }

  const updateTask = (id, text) => {
    setInput(text);
    setUpdateId(id);
  }

  const updateTaskById = () => {
    axios.put(`${Base_Url}/update/${updateId}`, { task: input })
      .then((res) => {
        console.log(res)
        setUpdateUI(!updateUI);
        setUpdateId(null);
        setInput("");
      })
  }

  const removeTask = (id) => {
    axios.delete(`${Base_Url}/delete/${id}`)
      .then((res) => {
        setUpdateUI(!updateUI);
      })
  }
  return (
    <div>
      <h2 className='text-center mt-5 text-uppercase border'>To-do App</h2>
      <div className='text-center mt-4'>
        <input style={{ outline: '0' }} className='me-2 border py-1' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={updateId ? updateTaskById : addTask} style={{ cursor: 'pointer' }} className='border py-1 px-3 text-uppercase fw-semibold'>
          {updateId ? "Update" : "Add"}
        </button>
      </div>
      <div>
        {
          tasks.length === 0 && (
            <div className='text-center mt-5'>
              <span className='fw-bold'>............</span>
              <Spinner className='' animation="border" variant="primary" />
              <span className='fw-bold'>............</span>
            </div>
          )
        }
        <table className="table table-secondary w-25 mx-auto mt-5">
          <thead>
            <tr>
              <th scope="col" className='text-uppercase'>Task Lists</th>
              <th scope="col" className='text-uppercase'>Update</th>
              <th scope="col" className='text-uppercase'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              tasks.length > 0 && tasks.map(tsk => {
                return (
                  <tr key={tsk._id}>
                    <td scope="row" className='font-semibold'>{tsk.task}</td>
                    <td className='w-25 text-center text-primary'>
                      <FaRegEdit onClick={() => updateTask(tsk._id, tsk.task)} className='fs-4' style={{ cursor: "pointer" }} />
                    </td>
                    <td className='w-25'>
                      <FaTrash onClick={() => removeTask(tsk._id)} className='fs-4 text-danger' style={{ cursor: "pointer" }} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
