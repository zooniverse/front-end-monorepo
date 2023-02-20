
import axios from 'axios'
import { PropTypes } from 'mobx-react';

const REDUCER_KEY = 'machine-learnt';

function SubjectReductions({ workflowId, subjectId, cb }) {
  let data = [
    {
      data: {
        points: [
          [ 200, 100 ],
          [ 175, 75 ],
          [ 150, 75 ],
          [ 125, 100 ],
          [ 125, 125 ],
          [ 150, 150 ],
          [ 175, 150 ],
          [ 200, 125 ],
          [ 200, 100 ]
        ]
      }
    }
  ]
  
  cb(data)
  /*
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
	console.log('SubjectReductions()', response.data.data.workflow.subject_reductions)
    cb(response.data.data.workflow.subject_reductions)
  }).catch(function (error) {
    console.log('SubjectReductions() error', error);
    cb(null)
  });
  */
}

SubjectReductions.propTypes = {
  workflowId: PropTypes.string,
  subjectId: PropTypes.string,
  cb: PropTypes.func,
}

export default SubjectReductions  