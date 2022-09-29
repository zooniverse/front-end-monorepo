const task = {
  'taskKey': 'T0',
  'required': false,
  'type': 'survey',
  'characteristics': {
    'LK': {
      'label': 'Like',
      'values': {
        'BRD': {
          'image': 'bird-icon.svg',
          'label': 'bird'
        },
        'THR': {
          'image': 'nothing-icon.svg',
          'label': 'other'
        },
        'WSL': {
          'image': 'weasel-icon.svg',
          'label': 'weasel'
        },
        'CTDG': {
          'image': 'cat-dog-icon.svg',
          'label': 'cat/dog'
        },
        'PRMT': {
          'image': 'primate-icon.svg',
          'label': 'primate'
        },
        'CWHRS': {
          'image': 'cow-horse-icon.svg',
          'label': 'cow/horse'
        },
        'NTLPDR': {
          'image': 'ante-deer-icon.svg',
          'label': 'antelope/deer'
        }
      },
      'valuesOrder': ['CTDG', 'CWHRS', 'NTLPDR', 'PRMT', 'WSL', 'BRD', 'THR']
    },
    'CLR': {
      'label': 'color',
      'values': {
        'GR': {
          'image': 'gray.svg',
          'label': 'gray'
        },
        'RD': {
          'image': 'red.svg',
          'label': 'red'
        },
        'WHT': {
          'image': 'white.svg',
          'label': 'white'
        },
        'BLCK': {
          'image': 'black.svg',
          'label': 'black'
        },
        'BRWN': {
          'image': 'brown.svg',
          'label': 'brown'
        },
        'TNLLW': {
          'image': 'tan-yellow.svg',
          'label': 'tan/yellow'
        }
      },
      'valuesOrder': ['TNLLW', 'RD', 'BRWN', 'WHT', 'GR', 'BLCK']
    },
    'PTTRN': {
      'label': 'Pattern',
      'values': {
        'SLD': {
          'image': 'solid-icon.svg',
          'label': 'solid'
        },
        'BNDS': {
          'image': 'banding-icon.svg',
          'label': 'bands'
        },
        'SPTS': {
          'image': 'spots-icon.svg',
          'label': 'spots'
        },
        'STRPS': {
          'image': 'stripes-icon.svg',
          'label': 'stripes'
        }
      },
      'valuesOrder': ['SLD', 'STRPS', 'BNDS', 'SPTS']
    }
  },
  'characteristicsOrder': ['LK', 'PTTRN', 'CLR'],
  'choices': {
    'FR': {
      'label': 'Fire',
      'images': ['fire-1.jpg'],
      'confusions': {},
      'description': "It's a fire. Pretty sure you know what this looks like.",
      'noQuestions': true,
      'characteristics': {
        'LK': [],
        'CLR': [],
        'PTTRN': []
      },
      'confusionsOrder': []
    },
    'KD': {
      'label': 'Kudu',
      'images': ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg'],
      'confusions': {
        'LPHNT': 'Kudus are stripey and way prettier than elephants.',
        'RDVRK': 'Kudus are not Aardvarks.',
      },
      'description': 'Large, lanky antelope with long legs, a short mane along the neck and shoulders, a brownish-gray to tan coat with vertical white stripes along the torso, a white chevron between the eyes, and large round ears. Males have a beard along the throat and massive spiral horns. Females are have no horns',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS', 'NTLPDR'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT', 'GR'],
        'PTTRN': ['SLD', 'STRPS']
      },
      'confusionsOrder': ['LPHNT', 'RDVRK']
    },
    'HMN': {
      'label': 'Human',
      'images': [],
      'confusions': {},
      'description': 'Probably a researcher. Or not. Who knows!',
      'noQuestions': false,
      'characteristics': {
        'LK': [],
        'CLR': [],
        'PTTRN': []
      },
      'confusionsOrder': []
    },
    'LPHNT': {
      'label': 'Elephant',
      'images': ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg'],
      'confusions': {},
      'description': 'Huge, leathery, gray-skinned mammal with large, floppy ears and thick, strong legs. It has a short, tufted tail and a long, thick trunk. Some elephants of both sexes have large, white tusks, but some individuals never develop tusks or develop only one tusk.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS', 'THR'],
        'CLR': ['GR'],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'RDVRK': {
      'label': 'Aardvark',
      'images': ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg'],
      'confusions': {
        'FR': "You probably shouldn't be getting these confused."
      },
      'description': 'Not as awesome as a pangolin, but surprisingly big.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['WSL', 'THR'],
        'CLR': ['RD', 'BRWN', 'GR'],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': ['FR']
    },
    'NTHNGHR': {
      'label': 'Nothing here',
      'images': [],
      'confusions': {
        'FR': "You probably shouldn't be getting these confused."
      },
      'description': "Don't tell the plant biologists we called vegetation \"nothing here\"!",
      'noQuestions': true,
      'characteristics': {
        'LK': [],
        'CLR': [],
        'PTTRN': []
      },
      'confusionsOrder': ['FR']
    },
  },
  'choicesOrder': ['RDVRK','LPHNT', 'KD', 'HMN', 'FR', 'NTHNGHR'],
  'exclusions': [],
  'help': '',
  'images': {
    'red.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c10b19cb-ffb9-4fea-8d3d-e6f0fa03b6a7.svg',
    'gray.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/9e5ccb8d-5d5d-4b8a-a5e8-73a325bbaba0.svg',
    'black.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/8d5219dd-6ee2-412a-b169-e1bbd571d8e9.svg',
    'brown.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/43b2823e-424c-4201-a992-123f49fb1c12.svg',
    'white.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/e57ca757-2bc7-4226-8201-910c747af61d.svg',
    'fire-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1e3bb2db-9306-42f8-875b-72d0ba189c75.jpeg',
    'kudu-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d7f2f5b3-f67a-4f58-a230-67b788b9366e.jpeg',
    'kudu-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/039e4bcc-49ea-41a3-8e9b-c1aaec915b31.jpeg',
    'kudu-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/0cb53d01-c77c-422e-ab46-f65c63efe24f.jpeg',
    'empty-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c034d237-006e-4cfc-8746-c3aa5601f229.jpeg',
    'human-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/93ef6d6e-40db-46a7-9bc2-2ec123ebef0b.jpeg',
    'human-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/4a28216c-97e1-483d-a62a-83e9d93bab0b.jpeg',
    'human-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/dea1c721-b036-4970-99a1-34edeea0feee.jpeg',
    'bird-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/348f3b84-209e-4eb9-978e-c3057074231f.svg',
    'long-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/eb48c16f-a294-453a-bb19-bcd118461c8f.svg',
    'aardvark-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c4d29784-5c89-4dbe-b9a8-0d72e804ccad.jpeg',
    'aardvark-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/3ab9ec33-5263-42b9-b207-fa8d17ac09da.jpeg',
    'aardvark-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5ed0f3dc-6124-4df3-ba84-627e9d0d6f37.jpeg',
    'bushy-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/316beca3-4db0-44dd-82fe-26b14613a54d.svg',
    'elephant-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1b587273-cb20-4173-b87b-5db03f5183e0.jpeg',
    'elephant-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/be4673f4-71ec-4044-848c-75032d1fd290.jpeg',
    'elephant-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/29c1d467-d2e7-4859-aa74-e4f6d64027b2.jpeg',
    'lanky-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/7448a78a-1142-4e6c-810b-fd0df7ddba77.svg',
    'large-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/826d7ac4-97a9-4f56-a630-36b987f547cf.svg',
    'short-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/58f308de-ed19-4899-8c52-971e7b06bfc6.svg',
    'small-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/7d3f9037-ecbe-45c7-b199-be1ca3c64b29.svg',
    'solid-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/11a53e85-ce34-4c00-bfcd-1b6b87aa4254.svg',
    'spots-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/2df69dda-595a-45b8-b77d-101f26182eee.svg',
    'tan-yellow.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/775618ae-65c5-42f4-9e6f-07761e3d69e4.svg',
    'curved-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/b1fb6375-db15-4872-a23a-0dc308f82069.svg',
    'smooth-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c7a95b09-4efd-4a1d-bdb8-55b8d91a7fef.svg',
    'stocky-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/406da3e4-7967-46f9-b102-24f59f4568fa.svg',
    'tafted-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/f141c412-2b1f-4d27-a1e2-721b43819f66.svg',
    'weasel-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/092b8b45-5922-4c02-bf45-d382d7d2b60c.svg',
    'banding-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/39fef2fc-51d9-41a8-bc12-a94a7fc742b7.svg',
    'cat-dog-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg',
    'nothing-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/6db0526c-75c3-40d8-bb1b-7de0ebe180d2.svg',
    'primate-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/28981576-4cec-45eb-954b-624abb291224.svg',
    'stripes-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/8f277695-65d8-45da-b61c-38d56399acc3.svg',
    'lowslung-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/2aca6109-581d-47e3-8784-51d07ad83020.svg',
    'straight-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/ffd119c2-601c-4fea-b8a0-904889a89691.svg',
    'u-shaped-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/0fd117bf-8da9-41c7-8c70-00cad20f2590.svg',
    'ante-deer-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5540b7e2-82da-402a-a3bc-6272ccaf1ee9.svg',
    'cow-horse-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d7c604e7-0cc9-4f79-ac94-d707d8bb3f10.svg',
    'spiral-horns-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/bfd28637-2711-4bc6-b667-688f9d6c07a8.svg'
  },
  'inclusions': [],
  'questions': {
    'HWMN': {
      'label': 'How many?',
      'answers': {
        '1': {
          'label': '1'
        },
        '2': {
          'label': ' 2'
        },
        '3': {
          'label': ' 3'
        },
        '4': {
          'label': ' 4'
        },
        '5': {
          'label': ' 5'
        },
        '6': {
          'label': ' 6'
        },
        '7': {
          'label': ' 7'
        },
        '8': {
          'label': ' 8'
        },
        '9': {
          'label': ' 9'
        },
        '10': {
          'label': ' 10'
        },
        '51': {
          'label': ' 51+'
        },
        '1150': {
          'label': ' 11-50'
        }
      },
      'multiple': false,
      'required': true,
      'answersOrder': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '1150', '51']
    },
    'DNTCR': {
      'label': "Don't care?",
      'answers': {
        'N': {
          'label': ' No'
        },
        'S': {
          'label': 'Yes'
        }
      },
      'multiple': false,
      'required': true,
      'answersOrder': ['S', 'N']
    },
    'DSNHRNS': {
      'label': 'Do you see any horns?',
      'answers': {
        'N': {
          'label': ' No'
        },
        'S': {
          'label': 'Yes'
        }
      },
      'multiple': false,
      'required': false,
      'answersOrder': ['S', 'N']
    },
    'WHTBHVRSDS': {
      'label': 'What behaviors do you see?',
      'answers': {
        'TNG': {
          'label': ' Eating'
        },
        'MVNG': {
          'label': ' Moving'
        },
        'RSTNG': {
          'label': 'Resting'
        },
        'STNDNG': {
          'label': ' Standing'
        },
        'NTRCTNG': {
          'label': ' Interacting'
        }
      },
      'multiple': true,
      'required': true,
      'answersOrder': ['RSTNG', 'STNDNG', 'MVNG', 'TNG', 'NTRCTNG']
    },
    'RTHRNNGPRSNT': {
      'label': 'Are there any young present?',
      'answers': {
        'N': {
          'label': ' No'
        },
        'S': {
          'label': 'Yes'
        }
      },
      'multiple': false,
      'required': false,
      'answersOrder': ['S', 'N']
    }
  },
  'questionsMap': {
    'KD': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT', 'DSNHRNS'],
    'HMN': ['RTHRNNGPRSNT'],
    'RDVRK': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
  },
  'questionsOrder': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT']
}

const strings = {}

Object.entries(task.characteristics).forEach(([characteristicID, characteristic]) => {
  const prefix = `characteristics.${characteristicID}`
  strings[`${prefix}.label`] = characteristic.label
  Object.entries(characteristic.values).forEach(([valueID, value]) => {
    strings[`${prefix}.values.${valueID}.label`] = value.label
  })
})

Object.entries(task.choices).forEach(([choiceID, choice]) => {
  const prefix = `choices.${choiceID}`
  strings[`${prefix}.label`] = choice.label
  strings[`${prefix}.description`] = choice.description
  Object.entries(choice.confusions).forEach(([confusionID, value]) => {
    strings[`${prefix}.confusions.${confusionID}`] = value
  })
})

Object.entries(task.questions).forEach(([questionID, question]) => {
  const prefix = `questions.${questionID}`
  strings[`${prefix}.label`] = question.label
  Object.entries(question.answers).forEach(([answerID, answer]) => {
    strings[`${prefix}.answers.${answerID}.label`] = answer.label
  })
})

task.strings = strings

export const taskWithMoreThanTwentyChoices = {
  taskKey: 'T0',
  required: false,
  type: 'survey',
  choices: {
    FR1: {
      label: 'Firea',
      images: ['fire-1.jpg']
    },
    KD1: {
      label: 'Kudua',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN1: {
      label: 'Humana',
      images: []
    },
    LPHNT1: {
      label: 'Elephanta',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK1: {
      label: 'Aardvarka',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR1: {
      label: 'Nothing herea',
      images: []
    },
    FR2: {
      label: 'Fireb',
      images: ['fire-1.jpg']
    },
    KD2: {
      label: 'Kudub',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN2: {
      label: 'Humanb',
      images: []
    },
    LPHNT2: {
      label: 'Elephantb',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK2: {
      label: 'Aardvarkb',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR2: {
      label: 'Nothing hereb',
      images: []
    },
    FR3: {
      label: 'Firec',
      images: ['fire-1.jpg']
    },
    KD3: {
      label: 'Kuduc',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN3: {
      label: 'Humanc',
      images: []
    },
    LPHNT3: {
      label: 'Elephantc',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK3: {
      label: 'Aardvarkc',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR3: {
      label: 'Nothing herec',
      images: []
    },
    FR4: {
      label: 'Fired',
      images: ['fire-1.jpg']
    },
    KD4: {
      label: 'Kudud',
      images: ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg']
    },
    HMN4: {
      label: 'Humand',
      images: []
    },
    LPHNT4: {
      label: 'Elephantd',
      images: ['elephant-1.jpg', 'elephant-2.jpg', 'elephant-3.jpg']
    },
    RDVRK4: {
      label: 'Aardvarkd',
      images: ['aardvark-1.jpg', 'aardvark-2.jpg', 'aardvark-3.jpg']
    },
    NTHNGHR4: {
      label: 'Nothing hered',
      images: []
    }
  },
  choicesOrder: ['FR1', 'KD1', 'HMN1', 'LPHNT1', 'RDVRK1', 'NTHNGHR1', 'FR2', 'KD2', 'HMN2', 'LPHNT2', 'RDVRK2', 'NTHNGHR2', 'FR3', 'KD3', 'HMN3', 'LPHNT3', 'RDVRK3', 'NTHNGHR3', 'FR4', 'KD4', 'HMN4', 'LPHNT4', 'RDVRK4', 'NTHNGHR4'],
  images: {
    'fire-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1e3bb2db-9306-42f8-875b-72d0ba189c75.jpeg',
    'kudu-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d7f2f5b3-f67a-4f58-a230-67b788b9366e.jpeg',
    'kudu-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/039e4bcc-49ea-41a3-8e9b-c1aaec915b31.jpeg',
    'kudu-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/0cb53d01-c77c-422e-ab46-f65c63efe24f.jpeg',
    'empty-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c034d237-006e-4cfc-8746-c3aa5601f229.jpeg',
    'human-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/93ef6d6e-40db-46a7-9bc2-2ec123ebef0b.jpeg',
    'human-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/4a28216c-97e1-483d-a62a-83e9d93bab0b.jpeg',
    'human-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/dea1c721-b036-4970-99a1-34edeea0feee.jpeg',
    'aardvark-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c4d29784-5c89-4dbe-b9a8-0d72e804ccad.jpeg',
    'aardvark-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/3ab9ec33-5263-42b9-b207-fa8d17ac09da.jpeg',
    'aardvark-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5ed0f3dc-6124-4df3-ba84-627e9d0d6f37.jpeg',
    'elephant-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1b587273-cb20-4173-b87b-5db03f5183e0.jpeg',
    'elephant-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/be4673f4-71ec-4044-848c-75032d1fd290.jpeg',
    'elephant-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/29c1d467-d2e7-4859-aa74-e4f6d64027b2.jpeg'
  }
}
const taskWithMoreThanTwentyChoicesStrings = {}
Object.entries(taskWithMoreThanTwentyChoices.choices).forEach(([choiceID, choice]) => {
  const prefix = `choices.${choiceID}`
  taskWithMoreThanTwentyChoicesStrings[`${prefix}.label`] = choice.label
})
taskWithMoreThanTwentyChoices.strings = taskWithMoreThanTwentyChoicesStrings

export default task
