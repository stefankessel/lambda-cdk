exports.main = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda'),
  }
}
