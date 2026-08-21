import PreDisplay from '../../../PreDisplay'

function JSONViewer({ alt, jsonData }) {
  const formattedJSON = JSON.stringify(jsonData, null, 2)

  return <PreDisplay a11yTitle={alt} content={formattedJSON} />
}

export default JSONViewer
