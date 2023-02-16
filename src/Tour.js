import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Tour = () => {
  const apiUrl = 'https://course-api.com/react-tours-project';
  const [data, setData] = useState();
  const [matchId, setMatchId] = useState(false);
  const getApiData = async () => {
    const response = await axios.get(apiUrl);
    setData(response.data)
  }
  useEffect(() => {
    getApiData();
  }, [])

  if (!data) return 'Loading...'

  const handleNotInterest = (id) => {
    const response = data.filter((value) => value.id !== id);
    setData(response)
  }

  const handleShowHide = (id) => {
    if (matchId === id) {
      return setMatchId(null)
    }
    setMatchId(id)
  }

  const handleRefreshPage = () => {
    getApiData();
  }

  return (
    <>
      {
        <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Tour</h3>
      }
      {
        data.length > 0 &&
        <div style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          {
            data.map(({ id, image, info, name, price }, index) =>
              <div className="card" style={{ width: '22rem' }} key={index}>
                <img src={image} className="card-img-top" alt={id} style={{ height: '15rem' }} />
                <div className="card-body">
                  <h5 className="card-title">{name.slice(0, 30)}</h5>
                  <p className="card-text ">{matchId === id ? info : `${info.slice(0, 180)}... `}
                    <button style={{
                      border: '1px solid black',
                      background: 'none',
                      borderRadius: '4px',
                      padding: '0.3rem'
                    }}
                      onClick={() => handleShowHide(id)}>{matchId === id ? 'Hide' : 'Load More'}</button>
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className='pb-0 mb-0 mt-0 btn btn-primary' onClick={() => handleNotInterest(id)}>Not Interest</p>
                    <p className='pb-0 mb-0'>Price: ${price}</p>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      }
      {
        data.length === 0 &&
        <div className='text-center'>
          <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Please refresh the page.</h2>
          <button type="button" class="btn btn-outline-success" onClick={handleRefreshPage}>Refresh page</button>
        </div>
      }
    </>
  )
}


// const Tour = ({ id, image, info, name, price }) => {
//   const [ellips, setEllipsis] = useState(true);
//   console.log(price)
//   return (
//     <>
//       <div className="card" style={{ width: '18rem' }}>
//         <img src={image} className="card-img-top" alt={id} style={{ height: '15rem' }} />
//         <div className="card-body">
//           <h5 className="card-title">{name}</h5>
//           <p className="card-text ">{ellips ? info : `${info.slice(0, 180)}...`}
//             <button onClick={() => setEllipsis(!ellips)}>{ellips  ? 'Hide' : 'Load More'}</button>
//            </p>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             {/* <p className='pb-0 mb-0 mt-0 btn btn-primary' onClick={() => handleNotInterest(id)}>Not Interest</p> */}
//             <p className='pb-0 mb-0'>Price: ${price}</p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

export default Tour