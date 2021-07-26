import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import ReactMapGl, { Marker } from 'react-map-gl'
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import Error from '../common/Error'
import { memoriesPath, deleteMemory, editPath, createComment, deleteComment } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import { publicToken } from '../../config'
import { subSetViewport } from '../../lib/mapbox'
import { getSingleMemory } from '../../lib/api'
import { useForm } from '../../hooks/useForm'

function SingleMemory() {

  const { memoryId } = useParams()
  const history = useHistory()

  const [memory, setMemory] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [hasComments, setHasComments] = React.useState(false)

  const isLoading = !memory && !isError

  const { formData, setFormData, handleChange, formError, setFormError } = useForm({
    text: '',
  })

  const defaultViewportWidth = ((window.innerWidth * 65 ) / 100)

  //* For map content-------------------
  const [viewport, setViewport] = React.useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: defaultViewportWidth,
    height: '500px',
    zoom: 14,
  })

  //* For page content render
  React.useEffect(() => {

    const getData = async () => {

      try {

        const res = await getSingleMemory(memoryId)
        setMemory(res.data)

        // * setting zoom value depending on stored values
        const [[centerLongitude, centerLatitude], zoomValue] = subSetViewport(res.data)

        setViewport({
          ...viewport,
          longitude: centerLongitude,
          latitude: centerLatitude,
          zoom: zoomValue,
        })

      } catch (err) {
        setIsError(true)
      }
    }

    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasComments])

  function handleResize() {
    const newWidth = ((window.innerWidth * 65 ) / 100)
    setViewport({ ...viewport, width: newWidth }) 
  }

  React.useEffect( () => {
    window.addEventListener('resize', handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleSubmit = async (e) => {

    e.preventDefault()

    // * to prevent empty comments submissions
    if (formData.text) {
      try {

        await createComment(formData, memoryId)

        // * reset comment input
        e.target.value = ''

        // * force useEffect render on comment submission
        setHasComments(!hasComments)

        // * reset comment forms to blank
        setFormData({ text: '' })
        setFormError({ text: '' })

      } catch (err) {
        setFormError({ text: err.response.data.errMessage })
      }

    } else {
      return
    }
  }


  //* Delete a comment 
  const handleDelete = async (e) => {

    e.preventDefault()

    try {

      await deleteComment(memoryId, e.target.id)

      setHasComments(!hasComments)
      setFormError({ text: '' })

    } catch (err) {
      setFormError({ text: err.response.data.errMessage })
    }
  }


  //* Delete a memory
  const submitDelete = () => {
    confirmAlert({
      title: 'Are you sure you would like to delete this memory? ',
      message: 'Click yes to confirm the delete request.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {

            await deleteMemory(memory._id)
            history.push(memoriesPath)
            
          },
        },
        {
          label: 'No',
          onClick: () =>  { 
            return 
          },
        }
      ],
    })
  }

  //* Edit a memory
  const handleMemoryEdit = async() => {
    history.push(`${memoriesPath}/${memory._id}${editPath}`)
  }

  return (
    <section>
      
      { isError && <Error />}
      { isLoading && <p> ... loading</p>}

      { memory && (
        <>
          <div className="container single-memory">
            <div className="single-memo-card card has-text-white is-centered">

              <div className="title-header title has-text-white is-3">
                <p className="title-p">{memory.title}</p>
                <p className="date-p has-text-white">
                  {`${moment(memory.date).format('MMMM Do, YYYY')} - by ${memory.user.username}`}
                </p>
              </div>

              <div className="columns">
                <div className="column" >

                  <div className="has-text-centered title is-5">
                    <p><span className="location">Location</span>: {memory.location.userInput}</p>
                  </div>

                  <div className="column">

                    <figure className="memory-image-container">
                      <img
                        className="memory-image"
                        height="540px"
                        width="810px"
                        src={memory.image}
                        alt={memory.title}
                      />
                    </figure>

                  </div>
                  
                  <div className="memory-description is-6 has-text-black has-text-justified">
                    {memory.description}
                  </div>

                  <div className="column is-center">
                    <div className="memory-mapbox">
                      <ReactMapGl
                        {...viewport}
                        mapboxApiAccessToken={publicToken}
                        onViewportChange={viewport => {
                          setViewport(viewport)
                        }}
                      >

                        <Marker
                          latitude={memory.location.coordinates[1]}
                          longitude={memory.location.coordinates[0]}
                        >
                          <div>
                            <img
                              height="40px"
                              width="40px"
                              src="https://i.imgur.com/6IzPeVa.png"
                            />
                          </div>
                        </Marker>

                      </ReactMapGl>

                      <br></br>
                      {isOwner(memory.user.userId) &&
                      <button 
                        className="button is-warning"
                        onClick={handleMemoryEdit}
                      >Edit Memory</button>
                      }
                      {isOwner(memory.user.userId) && 
                        <button className="button is-danger" onClick={submitDelete}>Delete Memory</button>
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="container comment-form">
              <div className="columns">

                <form
                  className="column is-half is-offset-one-quarter box"
                  onSubmit={handleSubmit}
                  onKeyUp={(
                    (e) => {
                      if (e.key === 'Enter') handleSubmit
                    }
                  )}
                >

                  <div className="field" htmlFor="text">
                    <label className="label">Comments</label>
                    <div className="control">

                      <textarea
                        className={`memory-textarea input ${formError.text ? 'is-danger' : ''} `}
                        placeholder="Type your comments here.."
                        name="text"
                        value={formData.text || ''}
                        onChange={handleChange}
                      />

                    </div>
                    {formError.text
                      &&
                      <p className="help is-danger">
                        Oops, something went wrong. Check that you are logged in.
                      </p>
                    }
                  </div>

                  <div className="field">
                    <button
                      type="submit"
                      className="button is-info is-fullwidth"
                    >
                      Submit comment
                    </button>
                  </div>

                </form>
              </div>

              <div className="section">
                <div className="comments column">
                  {memory.comments && memory.comments.map(comment => {

                    return (
                      <div key={comment._id} className="single-comment box column is-three-fifths">

                        <h6><span className='comment-span'>Posted by</span>: {comment.user.username}</h6>
                        <p className="comment-text">{comment.text}</p>

                        {isOwner(comment.user.userId) &&
                          <button
                            id={comment._id}
                            onClick={handleDelete}
                            className="button is-info is-small is-outline"
                          >
                            Delete comment
                          </button>
                        }

                      </div>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
        </>)}
    </section>
  )
}

export default SingleMemory