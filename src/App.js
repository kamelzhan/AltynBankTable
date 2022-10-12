import { useState, useEffect } from 'react';
import './App.css';
import { table } from './records';

function App() {
  const [records, setRecords] = useState(table);
  let count = 0
  const dataPerPage = 3
  const totalPages = Math.ceil(table.length/dataPerPage)
  const[currentPage, setCurrentPage] = useState(0);
  const prevPage = () => {
      if (currentPage>=1){
          setCurrentPage(currentPage-1)
      }
  }
  const nextPage = () => {
      if (currentPage < totalPages-1){
          setCurrentPage(currentPage+1)
      }
  }
  const firstIndex = currentPage*totalPages
  const lastIndex = firstIndex + dataPerPage

  
  const [object, setObject] = useState({
    iin: '',
    date: '',
    name: ''
  })
  useEffect(() => {
    if(object.iin && object.name && object.date){
      setRecords([
        ...table.filter((item) => item.Date.includes(object.date) && item.IIN.includes(object.iin) && item.Name.toLowerCase().includes(object.name))
      ]);
    }
    else if(object.iin && object.name){
      setRecords([
        ...table.filter((item) => item.IIN.includes(object.iin) && item.Name.toLowerCase().includes(object.name))
      ]);
    }
    else if(object.name && object.date){
      setRecords([
        ...table.filter((item) => item.Date.includes(object.date) && item.Name.toLowerCase().includes(object.name))
      ]);
    }
    else if(object.iin && object.date) {
      setRecords([
        ...table.filter((item) => item.Date.includes(object.date) && item.IIN.includes(object.iin))
      ]);
    }
    else if(object.iin) {
      setRecords([
        ...table.filter((item) => item.IIN.includes(object.iin))
      ]);
    }
    else if(object.date) {
      setRecords([
        ...table.filter((item) => item.Date.includes(object.date))
      ]);
    }
    else if(object.name) {
      setRecords([
        ...table.filter((item) => item.Name.toLowerCase().includes(object.name))
      ]);
    }
    else {
      setRecords(table);
    }
  }, [object, lastIndex, firstIndex]);

    


  return (
    <div className="App">
      <div className='header'>
        <img className='searchImg' src = "/images/search1.png" alt="search" />
        <input className = "search" type = "text" placeholder = "Поиск" />
      </div>
      <div className='filter'>
        <input className='Iin' onChange = {(e)=>setObject({...object, iin: e.target.value})} type = 'text' placeholder='ИИН'/> <br/>
        <input className='Date' onChange = {(e)=>setObject({...object, date: e.target.value})} type = 'text' placeholder='Дата'/> <br/>
        <input className='Name' onChange = {(e)=>setObject({...object, name: e.target.value.toLowerCase()})} type = 'text' placeholder='Наименование процесса'/> <br/>
      </div>

      <div className='table'>
            <table>
                <tbody>
                    <tr>
                        <th>ИД</th>
                        <th>Дата</th>
                        <th>ИИН</th>
                        <th>Канал</th>
                        <th>IP</th>
                        <th>Наименование процесса</th>
                        <th>Статус</th>
                        <th>ID процесса</th>
                        <th>ID BPM процесса</th>
                    </tr>
                    {records.slice(firstIndex, lastIndex).map(record =>{
                        return <tr key={record.ID}>
                        <td>{record.ID}</td>
                        <td>{record.Date}</td>
                        <td>{record.IIN}</td>
                        <td>{record.Chanel}</td>
                        <td>{record.IP}</td>
                        <td>{record.Name}</td>
                        <td>{record.Status}</td>
                        <td>{record.IDProccess}</td>
                        <td>{record.IDBPMProccess}</td>
                        </tr>
                    })}
                </tbody>
            </table>

            <button onClick={prevPage}>previous</button>
            {table.slice(0,3).map(item => {
                count += 1
                return <button key={item.ID} onClick={() => {setCurrentPage(item.item)}}>{count}</button>
            })}
            <span>current page: {currentPage+1}/{totalPages}</span>
            <button onClick={nextPage}>next</button>
            
        </div>
      

    </div>
  );
}

export default App;
