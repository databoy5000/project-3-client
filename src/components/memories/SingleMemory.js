import React from 'react'
import axios from 'axios'
import Error from '../common/Error'
import { useParams } from 'react-router-dom' 
import ReactMapGl, { Marker } from 'react-map-gl'


import { useRef, useState } from 'react'

function SingleMemory() {
  const [ memory, setSingleMemory ] = React.useState(null)
  const { id } = useParams()
  const [ isError, setIsError ] = React.useState(false)
  const isLoading = !memory && !isError

  

  //* For normal page content

  React.useEffect( () => {
    const getData = async () => {
      try {
        const result = await axios.get(`/api/memories/${id}`)
        setSingleMemory(result.data)
        setViewport({ ...viewport, latitude: (Number(result.data.latitude)), longitude: (Number(result.data.longitude)) })

      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[id])


  //* For map content-------------------
  const [ viewport, setViewport ] = useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '500px',
    height: '500px',
    zoom: 10,

  })



  
  return (
    <section>
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}
      { memory && (
        <>
          <h1>{memory.title}</h1>
          <h2>{memory.location}</h2>
          <p>{memory.description}</p>

          <img height ="540px" width="810px"  src={memory.imageUrl} alt={memory.name} />

          <div>
            <ReactMapGl {...viewport} mapboxApiAccessToken={'pk.eyJ1Ijoia2F0aGFja2V0aGFsIiwiYSI6ImNrcDJyeG15aDA4bm0ybm1rbnA4OGg0cDUifQ.13jXKE1MWMt27fdEfA1K9g'}
              onViewportChange={viewport => {
                setViewport(viewport)
              }}
            >


              <Marker latitude={Number(memory.latitude)} longitude={Number(memory.longitude)}>
                <div>
                  <img height="40px" width="40px" src="http://assets.stickpng.com/thumbs/5888925dbc2fc2ef3a1860ad.png" />
                </div>
              </Marker>
                

            </ReactMapGl>
          </div>
        </>
      )}


    </section>
  )
}

export default SingleMemory