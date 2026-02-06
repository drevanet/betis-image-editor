
import React ,{ useState, useRef, useEffect }from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const {state} = useLocation();
  const {user} = state || {};
   const [count, setCount] = useState(0);
  
   const nav = useNavigate();

useEffect(() => {
  const storedCount = localStorage.getItem("pageVisits");
  const initialCount = storedCount ? Number(storedCount) : 0;
  setCount(initialCount + 1);
  localStorage.setItem("pageVisits", initialCount + 1);
 
 
 
  }, []);

  if (count>=9) {
    nav('/sub')
  }
 return (

   <div></div>
 )
  
}
