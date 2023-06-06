const tf = require('@tensorflow/tfjs-node')

const predict = async (image, path) => {
  const UintImage = Uint8Array.from(image)
  const decodedImage = tf.node.decodeImage(UintImage)
  const expandedImage = tf.expandDims(decodedImage)
  const model = await tf.loadLayersModel(path)
  const result = model.predict(expandedImage)
  return result
}

module.exports = predict