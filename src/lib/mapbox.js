import { WebMercatorViewport } from 'react-map-gl'

export const publicToken = process.env.REACT_APP_MAPBOX_TOKEN

export function subSetViewport(memoryObject) {

  const centerCoordinates = memoryObject.location.coordinates
  const boundaryBox = memoryObject.location.boundaryBox
  const placeType = memoryObject.location.placeType

  // * checking first if boundaryBox was stored, for mor accuracy in viewport display
  if (boundaryBox && boundaryBox.length === 4) {

    const bboxFormat = [[boundaryBox[0],boundaryBox[1]],[boundaryBox[2],boundaryBox[3]]]

    const { latitude, longitude, zoom } = new WebMercatorViewport({ width: 500, height: 500 })
      .fitBounds(bboxFormat, {
        padding: -50,
        offset: [0, -100],
      })
    
    return [[longitude,latitude],zoom]

    // * else just manually define depending on the place type
  } else {

    let zoom = 10

    if (placeType === 'country') zoom = 6
    if (placeType === 'region') zoom = 7
    if (placeType === 'postcode') zoom = 8
    if (placeType === 'district') zoom = 9
    if (placeType === 'place') zoom = 10
    if (placeType === 'locality') zoom = 11
    if (placeType === 'neighbourhood') zoom = 12
    if (placeType === 'address') zoom = 13
    if (placeType === 'poi') zoom = 14

    return [centerCoordinates,zoom]

  }
}