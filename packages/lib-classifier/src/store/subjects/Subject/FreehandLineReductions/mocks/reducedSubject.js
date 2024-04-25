export default {
  data: [
    {
      'stepKey': 'S0',				    // which step in the workflow, usually S0
      'taskIndex': 0,             // which task in the workflow, usually 0
      'taskKey': 'T0',					  // correlates with taskIndex, usually T0
      'taskType': 'drawing',			// focused on correct-a-cell
      'toolIndex': 0,					    // which tool in the task, usually 0
      'toolType': 'freehandLine',	// focused on correct-a-cell
      'frame': 0,					        // usually 0 unless in multi-frame view
      'markId': 'clhhuqm9',			  // alphanumeric string that ensures the machine-generated mark is rendered
      'pathX': [200, 175, 150], 	// array of x values
      'pathY': [100, 75, 75],		  // array of y values
    }
  ]
}
