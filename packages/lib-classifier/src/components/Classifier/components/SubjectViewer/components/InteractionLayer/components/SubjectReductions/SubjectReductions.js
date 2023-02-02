
import axios from 'axios'
import { PropTypes } from 'mobx-react';

const REDUCER_KEY = 'machine-learnt';

function SubjectReductions({ workflowId, subjectId, cb }) {
  const query = `{
    workflow(id: ${workflowId}) {
      subject_reductions(subjectId: ${subjectId}, reducerKey:"${REDUCER_KEY}")
      {
        data
      }
    }
  }`

  axios.post('https://caesar-staging.zooniverse.org/graphql', {
    query: query.replace(/\s+/g, ' ')
  }).then(response => {
    cb(response.data.data.workflow.subject_reductions)
  }).catch(function (error) {
	console.log('SubjectReductions() error', error);
	cb(null)
  });
}
  
SubjectReductions.propTypes = {
  workflowId: PropTypes.string,
  subjectId: PropTypes.string,
  cb: PropTypes.func,
}
  
export default SubjectReductions  