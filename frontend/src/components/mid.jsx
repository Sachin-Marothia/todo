import { FaEdit } from "react-icons/fa";
import React from "react";
import axios from 'axios'
import  { useState , useEffect} from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { v4 as uuidv4} from 'uuid'

const Mid = () => {

  const [todo, settodo] = useState("")
  const [todoss,  settodoss] = useState([])
  const [showfinished, setshowfinished] = useState(false)
  const [refreshData, setRefreshData] = useState(false);
  const BASE_URL = "https://todo-fullstack-rfey.onrender.com";

  // state for database
  const [mongotodo, setmongotodo] = useState([])
  const [todoid, settodoid] = useState("")
   

  //fetch data from database

  useEffect(() => {
    axios.get(`${BASE_URL}/get/todos`)
    .then(res=>setmongotodo(res.data))
    .catch(err => console.error(err));
    
  },[refreshData])

  //    add data to databse from input field 
  const handledata =async()=>{
        let response = await axios.post(`${BASE_URL}/api/todos`, { name: todo });
        {console.log('data added',response)}
          settodo("")
        setRefreshData((prev)=>!prev)
  } 
  const handlechange=(e)=>{
    settodo(e.target.value)
  }
  
  // delete data from database 
  const handledelete =async(e,id)=>{
         
    let response = await axios.delete(`${BASE_URL}/api/todos/${id}`)
     setRefreshData((prev)=>!prev)
 }


  
  
 
  
 // handle use to edit a todo
   const handleedit =(e,id)=>{
     let T = mongotodo.filter(item=>item._id===id)
     
     setmongotodo(T[0].name)

     let newtodoos = todoss.filter(item=>{
      return item.id!== id
    })
      settodoss(newtodoos)
      // savetolocalstorage()
   }
  //  handlee use for deleteing a todo
  
   // handle used to save a todo
   const handleadd =()=>{
       settodoss([...todoss , {id:uuidv4() ,todo , isCompleted:false}])
       settodo("")
      //  savetolocalstorage()
        
   }
  
   const handlecheckbox=(e)=>{
     let Id = e.target.name
     const index=  todoss.findIndex(item=> {
                                     return item.id===Id;
                                                     })
     let newTodos = [...todoss];
   
     newTodos[index].isCompleted = !newTodos[index].isCompleted;
     settodoss(newTodos)
     savetolocalstorage()
   }    
   const togglefinished = (e) => {
     setshowfinished(!showfinished)
   }
   

  return (
    <div className="  container w-full md:w-1/2 rounded-xl md:m-5 md:mx-auto bg-violet-100 p-5 md:min-h-[85vh] min-h-[84vh]">
    
    
        <h2 className="text-lg flex justify-center">Add Todos</h2>
      <div className="addTodo m-5 flex">
        <div className=" flex items-center w-full ">
        <input value={todo} onChange={handlechange}  type="text" className="intputtodo w-full h-9 items-center pl-3 rounded-xl " />
        </div>
        {/* button for saving todo in list */}
        <button onClick={handledata} disabled={todo.length<1} className="bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 m-4 text-sm font-bold disabled:bg-slate-500
         rounded-md">Save</button>
      </div>
       <div className="px-5 flex gap-4">
       <input onChange={togglefinished} type="checkbox" checked={showfinished} className="gap-3"/>
         <div className="gap-4">Show Finished</div>
        </div>
       <div className="h-[1.5px] m-3 bg-black opacity-15"></div>
      <h2 className="flex justify-center text-lg ">Your Todos </h2>
      <div className="todos">
        {mongotodo.length==0 && <div className="m-5">No Todos to display</div>}

        {/* .map is used for rendering a list as here todoss is a list */}
        {mongotodo.map(item=>{
         return (showfinished || !item.isCompleted) && <div key={item.id} className="todo px-5 flex justify-between w-1/1">
          {/* checkbox */} 
          <div className="flex gap-5">
          <input className="py-7" name={item.id} onChange={handlecheckbox} type="checkbox"  checked={item.isCompleted} id="" />
           {/* line that  display our todos */}
          <div className={  item.isCompleted?"line-through":""}>{item.name} </div>
          </div>

          {/* buttons of edit and delete */}
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleedit(e,item._id)}} className="bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 m-1 text-sm font-bold rounded-md"><FaEdit />
            </button>
            <button onClick={(e)=>{handledelete(e,item._id)}} className="bg-violet-800 hover:bg-violet-950 text-white p-2 py-1 m-1 text-sm font-bold rounded-md"><AiTwotoneDelete />
            </button>
          </div>
        </div>
        })}
      </div> 
    </div>
  );
};

export default Mid;
