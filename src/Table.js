import { useState } from 'react'
import './App.css'
import {table} from './records'

function Table({records}){
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
    console.log(currentPage)
    return(
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
        
    )
}
export default Table;