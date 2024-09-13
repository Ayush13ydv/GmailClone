
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Body from './Body'
import Inbox from './Inbox'
import Mail from './Mail'
import SendMail from './components/SendMail'
import Login from './components/Login'
import { useSelector } from 'react-redux'


function App() {
const {user} = useSelector(store=>store.appSlice);
// const user = false;
 const router = createBrowserRouter(  [{
    path:"/",
    element:<Body/>,
    children:[
      {
        path:"/",
        element:<Inbox/>
      },
      {
        path:"/mail/:id",
        element:<Mail/>
      }
    ]
  }
 ])

  return (
    
    <div className='bg-[#F6F8FC] h-screen w-screen overflow-hidden'>
      {
        !user ?(
          <Login/>
        ):(
          <>
          <Navbar/>
          <RouterProvider router={router}></RouterProvider>
          <div className='absolute w-[30%] bottom-0 right-20 z-10'>
           <SendMail/>
           </div>
           </>
        )
      }
   
    </div>
  )
}

export default App

