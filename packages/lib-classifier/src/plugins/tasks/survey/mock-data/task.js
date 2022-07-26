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
    'TL': {
      'label': 'Tail',
      'values': {
        'BSH': {
          'image': 'bushy-icon.svg',
          'label': 'bushy'
        },
        'LNG': {
          'image': 'long-icon.svg',
          'label': 'long'
        },
        'SHRT': {
          'image': 'short-icon.svg',
          'label': 'short'
        },
        'SMTH': {
          'image': 'smooth-icon.svg',
          'label': 'smooth'
        },
        'TFTD': {
          'image': 'tafted-icon.svg',
          'label': 'tufted'
        }
      },
      'valuesOrder': ['SMTH', 'BSH', 'TFTD', 'LNG', 'SHRT']
    },
    'BLD': {
      'label': 'Build',
      'values': {
        'LNK': {
          'image': 'lanky-icon.svg',
          'label': 'lanky'
        },
        'LRG': {
          'image': 'large-icon.svg',
          'label': 'large'
        },
        'SMLL': {
          'image': 'small-icon.svg',
          'label': 'small'
        },
        'STCK': {
          'image': 'stocky-icon.svg',
          'label': 'stocky'
        },
        'LWSLNG': {
          'image': 'lowslung-icon.svg',
          'label': 'low-slung'
        }
      },
      'valuesOrder': ['STCK', 'LNK', 'LRG', 'SMLL', 'LWSLNG']
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
    'HRNS': {
      'label': 'Horns',
      'values': {
        'CRVD': {
          'image': 'curved-icon.svg',
          'label': 'curved'
        },
        'SHPD': {
          'image': 'u-shaped-icon.svg',
          'label': 'u-shaped'
        },
        'SPRL': {
          'image': 'spiral-horns-icon.svg',
          'label': 'spiral'
        },
        'STRGHT': {
          'image': 'straight-icon.svg',
          'label': 'straight'
        }
      },
      'valuesOrder': ['STRGHT', 'CRVD', 'SPRL', 'SHPD']
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
  'characteristicsOrder': ['LK', 'PTTRN', 'CLR', 'HRNS', 'TL', 'BLD'],
  'choices': {
    'FR': {
      'label': 'Fire',
      'images': ['fire-1.jpg'],
      'confusions': {},
      'description': "It's a fire. Pretty sure you know what this looks like.",
      'noQuestions': true,
      'characteristics': {
        'LK': [],
        'TL': [],
        'BLD': [],
        'CLR': [],
        'HRNS': [],
        'PTTRN': []
      },
      'confusionsOrder': []
    },
    'HN': {
      'label': 'Hyena',
      'images': ['hyena-1.jpg', 'hyena-2.jpg', 'hyena-3.jpg'],
      'confusions': {},
      'description': 'Big ugly puppies with no discipline that eat all my camera traps.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG'],
        'TL': ['BSH'],
        'BLD': ['STCK', 'LNK'],
        'CLR': ['TNLLW', 'BRWN', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['SPTS']
      },
      'confusionsOrder': []
    },
    'HR': {
      'label': 'Hare',
      'images': ['hare-1.jpg', 'hare-2.jpg', 'hare-3.jpg'],
      'confusions': {},
      'description': 'Large rabbitlike animal with very long ears. There are two hare species in Gorongosa. The savanna hare has gray fur with a lighter brown underbelly, while the scrub hare is darker gray and has a white underbelly.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['THR'],
        'TL': ['BSH', 'SHRT'],
        'BLD': ['SMLL', 'LWSLNG'],
        'CLR': ['TNLLW', 'BRWN', 'WHT', 'GR'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'KD': {
      'label': 'Kudu',
      'images': ['kudu-1.jpg', 'kudu-2.jpg', 'kudu-3.jpg'],
      'confusions': {
        'LND': 'An eland is more stocky and ox-like than a kudu with long, straight horns that twist. It has a dewlap below the neck.',
        'HRTBST': 'Kudus are stripey and way prettier than hartebeest.'
      },
      'description': 'Large, lanky antelope with long legs, a short mane along the neck and shoulders, a brownish-gray to tan coat with vertical white stripes along the torso, a white chevron between the eyes, and large round ears. Males have a beard along the throat and massive spiral horns. Females are have no horns',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS', 'NTLPDR'],
        'TL': ['BSH', 'SHRT'],
        'BLD': ['STCK', 'LNK', 'LRG'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT', 'GR'],
        'HRNS': ['CRVD', 'SPRL'],
        'PTTRN': ['SLD', 'STRPS']
      },
      'confusionsOrder': ['LND', 'HRTBST']
    },
    'BBN': {
      'label': 'Baboon',
      'images': ['baboon-1.jpg', 'baboon-2.jpg', 'baboon-3.jpg'],
      'confusions': {},
      'description': 'AKA the creatures that break into your house and destroy everything.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG', 'PRMT', 'THR'],
        'TL': ['SMTH', 'LNG'],
        'BLD': ['LNK', 'SMLL'],
        'CLR': ['TNLLW', 'BRWN', 'GR'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'CRN': {
      'label': 'Crane',
      'images': ['crane-1.jpg', 'crane-2.jpg', 'crane-3.jpg'],
      'confusions': {},
      'description': 'Long-legged, long-necked bird with a straight beak. There are two crane species in Gorongosa: the grey crowned crane and the wattled crane. The gray-crowned crane has gray, white, and yellow feathers with a distinctive yellow fan of feathers on its head. The wattled crane has gray, black, and white feathers with red skin around its yellow beak.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['BRD'],
        'TL': ['SMTH', 'LNG'],
        'BLD': ['LNK'],
        'CLR': ['TNLLW', 'WHT', 'GR', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'CVT': {
      'label': 'Civet',
      'images': ['civet-1.jpg', 'civet-2.jpg', 'civet-3.jpg'],
      'confusions': {
        'GNT': 'Okay these two actually are confusing, but genets are cuter and more weasel/cat like.'
      },
      'description': 'Long, stocky mammal with short legs and a pointy face. Fur is light brown-gray with a dark mask, white at the tip of the muzzle, dark legs, spots, and bands along the neck.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG', 'WSL'],
        'TL': ['SMTH', 'BSH', 'LNG', 'SHRT'],
        'BLD': ['SMLL', 'LWSLNG'],
        'CLR': ['TNLLW', 'BRWN', 'WHT', 'GR', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['STRPS', 'BNDS', 'SPTS']
      },
      'confusionsOrder': ['GNT']
    },
    'DKR': {
      'label': 'Duiker',
      'images': ['duiker-1.jpg', 'duiker-2.jpg', 'duiker-3.jpg'],
      'confusions': {},
      'description': 'Duikers are small, deerlike antelope with a thin, short tail and colors ranging from blue-gray to red depending on the species. Males have short, straight horns. There are three species of duiker in Gorongosa: red, common, and blue duiker.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['NTLPDR'],
        'TL': ['BSH', 'SHRT'],
        'BLD': ['LNK', 'SMLL'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'GR'],
        'HRNS': ['STRGHT'],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'GNT': {
      'label': 'Genet',
      'images': ['genet-1.jpg', 'genet-2.jpg', 'genet-3.jpg'],
      'confusions': {
        'CVT': 'A civet is stockier than a genet with a much shorter tail and a dark mask on the face.'
      },
      'description': 'Small, slender animal with tan-gray fur, large, ringed spots, a long, thick, black-ringed tail, and a white underbelly. It has a black stripe down the spine and a pointy muzzle.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG', 'WSL'],
        'TL': ['SMTH', 'BSH', 'LNG'],
        'BLD': ['SMLL', 'LWSLNG'],
        'CLR': ['BRWN', 'GR', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['STRPS', 'BNDS', 'SPTS']
      },
      'confusionsOrder': ['CVT']
    },
    'HMN': {
      'label': 'Human',
      'images': [],
      'confusions': {},
      'description': 'Probably a researcher. Or not. Who knows!',
      'noQuestions': false,
      'characteristics': {
        'LK': [],
        'TL': [],
        'BLD': [],
        'CLR': [],
        'HRNS': [],
        'PTTRN': []
      },
      'confusionsOrder': []
    },
    'LND': {
      'label': 'Eland',
      'images': ['eland-1.jpg', 'eland-2.jpg', 'eland-3.jpg'],
      'confusions': {
        'KD': 'A kudu is taller and less ox-like than an eland, it has massive spiral horns and lacks a dewlap on the throat.',
        'HRTBST': 'A hartebeest is a taller and more slender than an eland with reddish fur, narrow face, and short, spiral horns.'
      },
      'description': 'Massive antelope with an oxlike body and short legs. Both sexes have straight, spiraled horns, a short mane, and a smooth light tan to gray coat with thin white stripes on the sides. Males have a large dewlap under the throat.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS', 'NTLPDR'],
        'TL': ['TFTD', 'LNG'],
        'BLD': ['STCK', 'LRG'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT', 'GR'],
        'HRNS': ['STRGHT', 'SPRL'],
        'PTTRN': ['SLD', 'STRPS']
      },
      'confusionsOrder': ['HRTBST', 'KD']
    },
    'MPL': {
      'label': 'Impala',
      'images': ['impala-1.jpg', 'impala-2.jpg', 'impala-3.jpg'],
      'confusions': {
        'BSHBCK': 'A bushbuck has vertical white stripes and spots on the flanks as well as a rounded back.'
      },
      'description': 'Medium-sized antelope with reddish-brown fur, white stripes around the eyes, and black stripes on the forehead and tail. Coat forms horizontal bands of red fur along the back, tan fur along the sides, and white fur on the underbelly. Males have large horns.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['NTLPDR'],
        'TL': ['BSH', 'SHRT'],
        'BLD': ['LNK', 'LRG'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT', 'BLCK'],
        'HRNS': ['STRGHT', 'CRVD', 'SPRL'],
        'PTTRN': ['SLD', 'BNDS']
      },
      'confusionsOrder': ['BSHBCK']
    },
    'BFFL': {
      'label': 'Buffalo',
      'images': ['buffalo-1.jpg', 'buffalo-2.jpg', 'buffalo-3.jpg'],
      'confusions': {},
      'description': 'Large, cattlelike animal with short legs and a long, tufted tail, dark brown to black fur, large, droopy ears, and a broad muzzle. Both sexes have U-shaped horns, but males� horns form a fused shield on the top of their heads.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS'],
        'TL': ['TFTD', 'LNG'],
        'BLD': ['STCK', 'LRG'],
        'CLR': ['RD', 'BRWN', 'GR', 'BLCK'],
        'HRNS': ['CRVD', 'SHPD'],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'CRCL': {
      'label': 'Caracal',
      'images': ['caracal-1.jpg', 'caracal-2.jpg', 'caracal-3.jpg'],
      'confusions': {
        'CVT': 'Caracals look like cats with makeup. Civets have spots. They look nothing alike.'
      },
      'description': 'Gorgeous cats that look like they are wearing makeup.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG'],
        'TL': ['SMTH', 'LNG'],
        'BLD': ['LNK', 'LRG'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': ['CVT']
    },
    'JCKL': {
      'label': 'Jackal',
      'images': ['jackal-1.jpg', 'jackal-2.jpg', 'jackal-3.jpg'],
      'confusions': {},
      'description': 'Medium-sized, gray-brown, doglike animal with a pointy face and ears. It has tan legs and underbelly with a black and white striped side, a gray back, and a long, bushy black tail with a white tip.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG'],
        'TL': ['BSH', 'LNG'],
        'BLD': ['LNK', 'SMLL'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT', 'GR', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['SLD', 'BNDS']
      },
      'confusionsOrder': []
    },
    'BSHPG': {
      'label': 'Bushpig',
      'images': ['bushpig-1.jpg', 'bushpig-2.jpg', 'bushpig-3.jpg'],
      'confusions': {},
      'description': 'Squat, flat-nosed, and piglike with long ears and reddish-brown fur with silver running down the spine. Both sexes have short, inconspicuous tusks.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['THR'],
        'TL': ['TFTD'],
        'BLD': ['STCK', 'SMLL', 'LWSLNG'],
        'CLR': ['RD', 'BRWN'],
        'HRNS': [],
        'PTTRN': ['SLD']
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
        'TL': ['TFTD'],
        'BLD': ['STCK', 'LRG'],
        'CLR': ['GR'],
        'HRNS': [],
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
        'TL': ['SMTH', 'LNG'],
        'BLD': ['STCK', 'SMLL'],
        'CLR': ['RD', 'BRWN', 'GR'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': ['FR']
    },
    'BRDTHR': {
      'label': 'Bird (other)',
      'images': ['birdother-1.jpg', 'birdother-2.jpg', 'birdother-3.jpg'],
      'confusions': {},
      'description': 'There are a lot of these.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['BRD'],
        'TL': ['SMTH', 'LNG', 'SHRT'],
        'BLD': ['SMLL'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT', 'GR', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['SLD', 'STRPS', 'BNDS', 'SPTS']
      },
      'confusionsOrder': []
    },
    'BSHBCK': {
      'label': 'Bushbuck',
      'images': ['bushbuck-1.jpg', 'bushbuck-2.jpg', 'bushbuck-3.jpg'],
      'confusions': {},
      'description': 'Look like they belong someplace much colder than the Serengeti.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['NTLPDR'],
        'TL': ['BSH', 'SHRT'],
        'BLD': ['LNK', 'LRG'],
        'CLR': ['TNLLW', 'RD', 'BRWN', 'WHT'],
        'HRNS': ['STRGHT', 'CRVD'],
        'PTTRN': ['STRPS', 'SPTS']
      },
      'confusionsOrder': []
    },
    'HNBDGR': {
      'label': 'Honey Badger',
      'images': ['honeybadger-1.jpg', 'honeybadger-2.jpg', 'honeybadger-3.jpg'],
      'confusions': {},
      'description': 'Randall has something to say about these guys.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CTDG', 'WSL'],
        'TL': ['BSH'],
        'BLD': ['STCK', 'SMLL', 'LWSLNG'],
        'CLR': ['WHT', 'GR', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['SLD', 'BNDS']
      },
      'confusionsOrder': []
    },
    'HRTBST': {
      'label': 'Hartebeest',
      'images': ['hartebeest-1.jpg', 'hartebeest-2.jpg', 'hartebeest-3.jpg'],
      'confusions': {
        'KD': 'Kudus are stripey and way prettier than hartebeest.',
        'LND': 'An eland is more stocky and ox-like than a hartebeest with long, straight horns that twist. It has a dewlap below the neck.'
      },
      'description': 'Large, reddish-yellow antelope with an elongated, horselike face, large, pointy ears, humped shoulders, sloped back, and a light underbelly and hind parts with a short, tufted tail. Both sexes have curved, ridged horns.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS', 'NTLPDR'],
        'TL': ['TFTD', 'LNG'],
        'BLD': ['STCK', 'LNK', 'LRG'],
        'CLR': ['TNLLW', 'RD', 'BRWN'],
        'HRNS': ['CRVD', 'SPRL'],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': ['LND', 'KD']
    },
    'HPPPTMS': {
      'label': 'Hippopotamus',
      'images': ['hippo-1.jpg', 'hippo-2.jpg', 'hippo-3.jpg'],
      'confusions': {},
      'description': 'Massive and low to the ground with short legs, small ears, gray to pink skin, a wide muzzle, and a short tail with a bristly tassel.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['CWHRS', 'THR'],
        'TL': ['SMTH', 'SHRT'],
        'BLD': ['STCK', 'LRG', 'LWSLNG'],
        'CLR': ['RD', 'BRWN', 'GR'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    },
    'NTHNGHR': {
      'label': 'Nothing here',
      'images': [],
      'confusions': {
        'FR': "You probably shouldn't be getting these confused."
      },
      'description': "Don't tell the plant biologists we called vegetation \"nothing here\"�",
      'noQuestions': true,
      'characteristics': {
        'LK': [],
        'TL': [],
        'BLD': [],
        'CLR': [],
        'HRNS': [],
        'PTTRN': []
      },
      'confusionsOrder': ['FR']
    },
    'GRNDHRNBLL': {
      'label': 'Ground Hornbill',
      'images': ['groundhornbill-1.jpg', 'groundhornbill-2.jpg', 'groundhornbill-3.jpg'],
      'confusions': {},
      'description': 'Large, stocky black bird with a red face, long, black beak, and red flaps of skin on its throat.',
      'noQuestions': false,
      'characteristics': {
        'LK': ['BRD'],
        'TL': ['SMTH'],
        'BLD': ['STCK', 'SMLL'],
        'CLR': ['RD', 'WHT', 'BLCK'],
        'HRNS': [],
        'PTTRN': ['SLD']
      },
      'confusionsOrder': []
    }
  },
  'choicesOrder': ['RDVRK', 'BBN', 'BRDTHR', 'BFFL', 'BSHBCK', 'BSHPG', 'CRCL', 'CVT', 'CRN', 'DKR', 'LND', 'LPHNT', 'GNT', 'GRNDHRNBLL', 'HR', 'HRTBST', 'HPPPTMS', 'HNBDGR', 'HN', 'MPL', 'JCKL', 'KD', 'HMN', 'FR', 'NTHNGHR'],
  'exclusions': [],
  'help': '',
  'images': {
    'red.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c10b19cb-ffb9-4fea-8d3d-e6f0fa03b6a7.svg',
    'gray.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/9e5ccb8d-5d5d-4b8a-a5e8-73a325bbaba0.svg',
    'black.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/8d5219dd-6ee2-412a-b169-e1bbd571d8e9.svg',
    'brown.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/43b2823e-424c-4201-a992-123f49fb1c12.svg',
    'white.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/e57ca757-2bc7-4226-8201-910c747af61d.svg',
    'fire-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1e3bb2db-9306-42f8-875b-72d0ba189c75.jpeg',
    'hare-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/55afa30b-b1d6-438e-9e7c-09ede7577d2d.jpeg',
    'hare-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c17b290b-739d-4039-b55f-c6ead504e1d6.jpeg',
    'hare-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/105d0401-ee6b-4835-96c1-a1d8fa2b4503.jpeg',
    'kudu-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d7f2f5b3-f67a-4f58-a230-67b788b9366e.jpeg',
    'kudu-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/039e4bcc-49ea-41a3-8e9b-c1aaec915b31.jpeg',
    'kudu-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/0cb53d01-c77c-422e-ab46-f65c63efe24f.jpeg',
    'civet-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/765081ff-6ff8-430c-97b2-cedebe6162c0.jpeg',
    'civet-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/56e32a21-ea74-4813-a600-fe79ff89f915.jpeg',
    'civet-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/460d49bd-4f71-41b8-8123-c07c92e89c8a.jpeg',
    'crane-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/66dce86e-4d56-4cbb-9651-7aab2f4daa1b.jpeg',
    'crane-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1a6be538-d47d-4292-8d38-15136ea37c58.jpeg',
    'crane-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/4b679c09-73ea-463b-b545-2d7677bbc28a.jpeg',
    'eland-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1ce430cd-c675-42db-9368-cbf4be759504.jpeg',
    'eland-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/a2b4d38f-5a87-401f-9c7a-676442eadd7a.jpeg',
    'eland-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/825bec23-ab55-47ff-b46a-353e655155da.jpeg',
    'empty-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c034d237-006e-4cfc-8746-c3aa5601f229.jpeg',
    'genet-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/43596c73-6297-4291-9ecd-8bbbf6b32722.jpeg',
    'genet-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/40ff56bf-7f48-4a32-9c33-3a2070607bbd.jpeg',
    'genet-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/348600ee-af78-4b3c-aeec-12befd4a2f38.jpeg',
    'hippo-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/649c4114-785b-4f7f-88eb-0bfbad6d34e2.jpeg',
    'hippo-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/473c720c-7f23-4f10-a1d9-c0e55009fa93.jpeg',
    'hippo-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/f3861d35-0c86-4810-a648-579ec53059e1.jpeg',
    'human-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/93ef6d6e-40db-46a7-9bc2-2ec123ebef0b.jpeg',
    'human-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/4a28216c-97e1-483d-a62a-83e9d93bab0b.jpeg',
    'human-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/dea1c721-b036-4970-99a1-34edeea0feee.jpeg',
    'hyena-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/fe13bbd8-cce5-4783-903f-a36d188512da.jpeg',
    'hyena-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5d5b0583-b66f-466e-8298-ea22ecffacc6.jpeg',
    'hyena-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d3c42bdc-b8fa-4a39-9297-7edb641461e0.jpeg',
    'baboon-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/219e7334-d65a-4e75-85bb-64025ac5be4d.jpeg',
    'baboon-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/1470a4af-491c-4783-b4b8-54c44e62d9b4.jpeg',
    'baboon-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/a16882ee-2a0b-48b4-b191-67757039a02c.jpeg',
    'duiker-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/265000e0-85a4-40af-8428-4cbf797b0dbf.jpeg',
    'duiker-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/9a2f6887-5a19-492b-a1ad-d7493c615c90.jpeg',
    'duiker-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d6b8b20b-4000-4e39-9bd6-215270f70d9a.jpeg',
    'impala-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/6f2c9b9c-c7c6-4689-a091-1719f83345a8.jpeg',
    'impala-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/a6586136-e2b3-4cb4-8616-a340d5c3e6e8.jpeg',
    'impala-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/32ebe237-d021-40dc-8863-12eece355db2.jpeg',
    'jackal-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/b353f093-46a4-4b53-98d8-8613686e97b7.jpeg',
    'jackal-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/cd274a4f-cc6e-4388-8422-53ac09b41ac5.jpeg',
    'jackal-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/e21d8b41-76f4-4e07-a2a1-992769942ee9.jpeg',
    'bird-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/348f3b84-209e-4eb9-978e-c3057074231f.svg',
    'buffalo-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c2355d66-399f-4240-861d-63ab3813bc7b.jpeg',
    'buffalo-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/cf863c6c-f5e0-481b-969c-d95a62045597.jpeg',
    'buffalo-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/321f4486-2be4-4a4a-bdbc-b8700ba610b6.jpeg',
    'bushpig-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/95913fa4-c64c-4533-960b-3d6577d49638.jpeg',
    'bushpig-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/cf002e29-432e-45e6-acb4-cce4e4656453.jpeg',
    'bushpig-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/f57405d3-a287-4814-b729-1682d0825aa3.jpeg',
    'caracal-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/41bddb25-bb8d-4734-88fe-643d88688489.jpeg',
    'caracal-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/3e1c5ce6-981f-4034-8ac7-c48bf62978a4.jpeg',
    'caracal-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/2a6fe747-052b-4419-bf96-d5ded7f62c85.jpeg',
    'long-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/eb48c16f-a294-453a-bb19-bcd118461c8f.svg',
    'aardvark-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c4d29784-5c89-4dbe-b9a8-0d72e804ccad.jpeg',
    'aardvark-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/3ab9ec33-5263-42b9-b207-fa8d17ac09da.jpeg',
    'aardvark-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5ed0f3dc-6124-4df3-ba84-627e9d0d6f37.jpeg',
    'bushbuck-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/bfaafed3-de09-43fd-8c79-1718f68ff09c.jpeg',
    'bushbuck-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/839c83f8-1b36-4094-b2ee-07080fdf9a89.jpeg',
    'bushbuck-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c87a64ff-9f63-4bec-8326-58cd8e6aee17.jpeg',
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
    'birdother-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/41fbb09c-f272-4789-adde-7d26e30ac03a.jpeg',
    'birdother-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/8c1b0855-485e-45d1-b6f2-dba29a2fc8dc.jpeg',
    'birdother-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/b3d52d21-f5e4-49ca-badb-079e04f3b8a4.jpeg',
    'curved-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/b1fb6375-db15-4872-a23a-0dc308f82069.svg',
    'smooth-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c7a95b09-4efd-4a1d-bdb8-55b8d91a7fef.svg',
    'stocky-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/406da3e4-7967-46f9-b102-24f59f4568fa.svg',
    'tafted-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/f141c412-2b1f-4d27-a1e2-721b43819f66.svg',
    'weasel-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/092b8b45-5922-4c02-bf45-d382d7d2b60c.svg',
    'banding-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/39fef2fc-51d9-41a8-bc12-a94a7fc742b7.svg',
    'cat-dog-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/475c469d-448f-4207-8a58-2cb42a3faa60.svg',
    'hartebeest-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/479c270e-a229-4e81-802d-d0d97c72d551.jpeg',
    'hartebeest-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/f9752438-644b-435a-b3e9-800f100c0d28.jpeg',
    'hartebeest-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/21fa3861-6e15-41c9-83cc-58c6e84a849b.jpeg',
    'nothing-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/6db0526c-75c3-40d8-bb1b-7de0ebe180d2.svg',
    'primate-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/28981576-4cec-45eb-954b-624abb291224.svg',
    'stripes-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/8f277695-65d8-45da-b61c-38d56399acc3.svg',
    'honeybadger-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/a05eefb4-7f25-4907-8b0d-5854497951e9.jpeg',
    'honeybadger-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c742da60-f8a7-4a47-895f-a4b3d2647176.jpeg',
    'honeybadger-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/c9f8fe0c-210b-43f6-8986-1f974388b74e.jpeg',
    'lowslung-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/2aca6109-581d-47e3-8784-51d07ad83020.svg',
    'straight-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/ffd119c2-601c-4fea-b8a0-904889a89691.svg',
    'u-shaped-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/0fd117bf-8da9-41c7-8c70-00cad20f2590.svg',
    'ante-deer-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5540b7e2-82da-402a-a3bc-6272ccaf1ee9.svg',
    'cow-horse-icon.svg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d7c604e7-0cc9-4f79-ac94-d707d8bb3f10.svg',
    'groundhornbill-1.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/5987097d-b0fa-427a-ad6c-97510fecab39.jpeg',
    'groundhornbill-2.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/657f1cc9-9ab3-4746-a36b-846e07631cc9.jpeg',
    'groundhornbill-3.jpg': 'https://panoptes-uploads.zooniverse.org/staging/workflow_attached_image/d0ee4d22-edc5-4984-a631-797bcd502b7c.jpeg',
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
    'HR': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'KD': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT', 'DSNHRNS'],
    'BBN': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'CRN': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'CVT': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'DKR': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'GNT': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'HMN': ['RTHRNNGPRSNT'],
    'LND': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT', 'DSNHRNS'],
    'MPL': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT', 'DSNHRNS'],
    'BFFL': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'CRCL': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'JCKL': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'BSHPG': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'LPHNT': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'RDVRK': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'BRDTHR': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'BSHBCK': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'HNBDGR': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT', 'DNTCR'],
    'HRTBST': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT', 'DSNHRNS'],
    'HPPPTMS': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT'],
    'GRNDHRNBLL': ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT']
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
export default task
