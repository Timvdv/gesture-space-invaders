import * as handTrack from 'handtrackjs'

let model

const initModel = async () => {
  model = await handTrack.load()
}

initModel()

// eslint-disable-next-line complexity
self.addEventListener('message', (event) => {
  if (!model) {
    console.log('Got data but the model is not loaded yet')
  }

  if (
    event.data?.imageData &&
    event.data?.imageData !== '[object ImageData]' &&
    model
  ) {
    model.detect(event.data?.imageData).then((predictions) => {
      console.log('predictions --> ', predictions)

      predictions.array.forEach((element) => {
        if (element.label === 'open' || element.label === 'point') {
          // X komt van de webcam width (1024 in dit geval)
          const hand = {
            x: Math.ceil(predictions.bbox[0]),
          }

          self.postMessage(JSON.stringify(hand))
        }
      })
    })
  }
})
