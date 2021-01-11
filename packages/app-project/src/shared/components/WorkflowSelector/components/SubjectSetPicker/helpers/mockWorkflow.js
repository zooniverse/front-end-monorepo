// mock a workflow returned by fetchWorkflowsHelper.js

const subjectSets = [
  {
    "id":"85771",
    "display_name":"Ultraman Series",
    "set_member_subjects_count":6,
    "metadata":{},
    "created_at":"2020-07-09T20:46:19.450Z",
    "updated_at":"2020-07-09T20:49:20.519Z",
    "href":"/subject_sets/85771",
    "links": {
      "project":"12754",
      "workflows":["16106","16099","16025","15764","15652","15651"]
    },
    "subjects":[
      {
        "id":"47696316",
        "metadata":{"Filename":"ultraman-x.png"},
        "locations":[
          {"image/png":"https://panoptes-uploads.zooniverse.org/production/subject_location/78964ce7-72db-4607-b493-63626738cf4e.png"}
        ],
        "zooniverse_id":null,
        "external_id":null,
        "created_at":"2020-07-09T20:47:07.128Z",
        "updated_at":"2020-07-09T20:47:07.128Z",
        "href":"/subjects/47696316",
        "links":{"project":"12754","collections":[],"subject_sets":["85771"],"set_member_subjects":["80512512"]}}
    ]
  },{
    "id":"85772",
    "display_name":"Transformers Series",
    "set_member_subjects_count":4,
    "metadata":{},
    "created_at":"2020-07-09T20:52:23.204Z",
    "updated_at":"2020-07-09T20:55:34.488Z",
    "href":"/subject_sets/85772",
    "links": {
      "project":"12754",
      "workflows":["16106","16099","16025","15764","15651","15652"],
    },
    "subjects":[
      {
        "id":"47696724",
        "metadata":{"Filename":"transformers-starscream.jpg"},
        "locations":[
          {"image/jpeg":"https://panoptes-uploads.zooniverse.org/production/subject_location/420f4744-8290-46db-b452-e8823acaaed6.jpeg"}
        ],
        "zooniverse_id":null,
        "external_id":null,
        "created_at":"2020-07-09T20:52:47.347Z",
        "updated_at":"2020-07-09T20:52:47.347Z",
        "href":"/subjects/47696724",
        "links":{"project":"12754","collections":[],"subject_sets":["85772"],"set_member_subjects":["80512523"]}
      }
    ]
  },{
    "id":"85773",
    "display_name":"Overwatch Series",
    "set_member_subjects_count":9,
    "metadata":{},
    "created_at":"2020-07-09T22:04:28.884Z",
    "updated_at":"2020-07-09T22:16:02.497Z",
    "href":"/subject_sets/85773",
    "links": {
      "project":"12754",
      "workflows":["16106","16099","16025","15764","15651","15652"]
    },
    "subjects":[
      {
        "id":"47698131",
        "metadata":{"Filename":"overwatch-wrecking-ball.jpg"},
        "locations":[
          {"image/jpeg":"https://panoptes-uploads.zooniverse.org/production/subject_location/9f9e4225-12f0-4b1b-8c8e-1acb6ed84067.jpeg"}
        ],
        "zooniverse_id":null,
        "external_id":null,
        "created_at":"2020-07-09T22:16:01.601Z",
        "updated_at":"2020-07-09T22:16:01.601Z",
        "href":"/subjects/47698131",
        "links":{"project":"12754","collections":[],"subject_sets":["85773"],"set_member_subjects":["80516400"]}
      }
    ]
  }
]

const WORKFLOW = {
  displayName: 'Question Workflow (grouped)',
  id: '15652',
  subjectSets
}

export default WORKFLOW
