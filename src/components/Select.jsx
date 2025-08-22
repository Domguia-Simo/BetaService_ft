import React  from "react";

const Select = ({data ,name ,onChange ,firstOption=true}) => {


    return(
        <React.Fragment>
            <div>
                <select  onChange={e=>onChange(e)} name={'type'} defaultValue={name} style={{padding:5 ,border:'solid 1px rgb(200,200,200)' ,borderRadius:5 ,outlineColor:'purple'}} >
                    <option value="" style={{display:firstOption?'':"none"}}>{name}</option>
                    {data.map((item  ,index) => (
                        <option key={index} style={{padding:'2px' }}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </React.Fragment>
    )
}

export default Select