import React from "react";
import '../../styles/dataTableStyles.css'


const DataTable = ({columns ,data ,view=true, remove=true, update=true, deleteFxn, viewFxn, updateFxn }) => {
    return(
        <React.Fragment>
            <div className="table-container" >
                <table className="table" >
                    <tr>
                        <thead className="table-header">
                            {columns.map((column, index) => <TableHead  key={index} title={column} />)}
                            <th className="table-head" style={{color:'grey', textAlign:'center'}}>Actions</th>
                        </thead>
                    </tr>
                    <tr>
                        <tbody className="table-body">
                            {data.map((item,index )=>{
                                return(
                                    <tr key={index} className="table-row">
                                    {Object.entries(item).map((e, idx) => {
                                        if(idx == 0 ) return
                                        if((idx+1) > columns.length+1) return
                                        return(
                                                <TableData key={idx} entry={e[1]} bold={idx == 1 ? true :false}/>
                                            )
                                        })}
                                        <td style={{display:'flex' ,gap:5}}>
                                            <button style={{ display:view?'':'none', border:'solid 1px blue' , padding:'5px 10px',color:'blue'}} onClick={viewFxn}>👁</button>
                                            <button style={{display:update?'':'none', border:'solid 1px purple' , padding:'5px 10px',color:'purple'}} onClick={updateFxn} >🖊</button>
                                            <button style={{ display:remove?'':'none',border:'solid 1px crimson' , padding:'5px 10px',color:'crimson'}} onClick={()=>deleteFxn(item._id)} >🗑 </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                            </tr>
                        </tbody>
                    </tr>
                    
                </table>
            </div>
        </React.Fragment>
    )
}

export default DataTable

const TableHead = ({title}) => {
    return(
        <th className="table-head">{title}</th>
    )
}

const TableData = ({entry ,bold}) => {
    return(
        <td className="table-data" style={{fontWeight:bold?600:'normal'}}>{entry}</td>
    )
}