import { useEffect, useState } from "react";

export default function Waiting() {
  const [points, setPoints] = useState('.');

  useEffect(() => {
    const intervale = setInterval(() => {
      setPoints(old => {
        return '.'.repeat(old.length % 3 + 1);
      })
    }, 450)
    return () => clearInterval(intervale)
  }, [])

  return (
    <div style={{
      color: 'white',
      fontSize: '1.2rem',
      display: "flex",
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <p style={{marginBottom: 7, opacity: 0.6, fontWeight: '200'}}>Server is loading{points}</p>
      <p>Thank you for waiting</p>
    </div>
  )
}
