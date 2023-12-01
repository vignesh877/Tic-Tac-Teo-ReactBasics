import { useState  } from 'react'

const Players = ({initialName , symbol ,isActive , onPlayerChange}) => {
  const [editName , setEditName] = useState(initialName)  // name edit
  const[editing , setEditing] =  useState(false)    // to enable edit option

  const handleEdit = () =>{
    setEditing(editing => !editing)  // true   immediatly modify the state
    
    if(editing) {
      onPlayerChange(symbol , editName)
    }
  }

  let buttonName = "Edit"
  let playerName = <span className="player-name">{editName}</span>

  if(editing) {
    playerName =(
         <input type='text' value={editName} onChange={e => setEditName(e.target.value)} required/>  
    )
    buttonName = "save"   //  to toggle save option 
  }
   
  return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit}>{buttonName}</button>
    </li>
  )
}

export default Players