import PreDisplay from '../../../PreDisplay'

function JSONViewer({ jsonData }) {
  const formattedJSON = JSON.stringify(jsonData, null, 2)

  return <PreDisplay content={formattedJSON} />
}

export default JSONViewer
