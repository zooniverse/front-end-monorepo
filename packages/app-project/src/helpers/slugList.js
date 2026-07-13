/*
  See https://github.com/zooniverse/static/blob/master/nginx-special-redirects.conf
*/

const PFE_SLUGS = [
  // Projects with a project.redirect property
  'zooniverse/moon-zoo',
  'zooniverse/solar-stormwatch',
  'zooniverse/planet-hunters',
  'zooniverse/old-weather',
  'zooniverse/whale-fm',
  'zooniverse/seti-live',
  'zooniverse/seafloor-explorer',
  'zooniverse/cyclone-center',
  'zooniverse/bat-detective',
  'zooniverse/cell-slider',
  'zooniverse/planet-four-ouroboros',
  'zooniverse/worm-watch-lab',
  'zooniverse/plankton-portal-ouroboros',
  'zooniverse/radio-galaxy-zoo',
  'zooniverse/operation-war-diary',
  'zooniverse/disk-detective-1-dot-0',
  'zooniverse/sunspotter',
  'zooniverse/condor-watch',
  'zooniverse/asteroid-zoo',
  'zooniverse/floating-forests-v1',
  'zooniverse/higgs-hunters',
  'zooniverse/science-gossip',
  'zooniverse/orchid-observers',
  'zooniverse/chimp-and-see-ouroboros',
  'zooniverse/measuring-the-anzacs-original',
  'drrogg/annotate',
  'nypl/emigrant-city',
  'bostonpubliclibrary/anti-slavery-manuscripts',
  'judaicadh/scribes-of-the-cairo-geniza',
  // Assorted Special Cases
  'acre-ar/meteororum-ad-extremum-terrae', // Subject image sizes difficult in FEM's classifier layout
  'alicemead/sudan-road-access-logistics-cluster',
  'aprajita/space-warps-des-vision-transformer', // Subject image sizes difficult in FEM's classifier layout
  'artem-dot-reshetnikov/saint-george-on-a-bike',
  'astorino/sovraimpressioni', // Issue with its combo task
  'astro-lab-ncmns/spiral-graph', // Freehand segment line and freehand shape deprecated from FEM
  'cmnbotany/notes-from-nature-capture-the-collections',
  'dwhiter/aurora-zoo', // Subject image sizes difficult in FEM's classifier layout
  'gaia-zooniverse/gaia-vari', // SVG subjects aren't supported in FEM
  'hripsi-19/atmoselec-atmospheric-electricity-for-climate', // Issue with its combo task
  'hugo-ferreira/where-is-spoony', // Uses experimental "slider" subtask
  'jenbays/beaver-dams', // CSSI project
  'lcjohnso/lcj-pfe-project', // LCJ PFE Reference Test Project
  'low-sky/bubblezoo-v1', // Oval drawing tool is a worse experience in FEM
  'mappingprejudice/mapping-prejudice',
  'md68135/notes-from-nature-big-bee-bonanza',
  'md68135/notes-from-nature-calbug', // Dependent dropdowns aren't supported in FEM
  'md68135/notes-from-nature-capturing-californias-flowers', // Dependent dropdowns aren't supported in FEM
  'md68135/notes-from-nature-digitizing-biological-collections-in-canada',
  'md68135/notes-from-nature-flora-of-texas-and-oklahoma', // Dependent dropdowns aren't supported in FEM
  'md68135/notes-from-nature-herbarium', // Dependent dropdowns aren't supported in FEM
  'md68135/notes-from-nature-southeastern-us-biodiversity',
  'md68135/notes-from-nature-terrestrial-parasite-tracker', // Dependent dropdowns aren't supported in FEM
  'md68135/notes-from-nature-wedigflplants',
  'md68135/notes-from-nature-natural-history-at-rom-revealed',
  'meteonetwork/redata',
  'mikewalmsley/galaxy-zoo-mobile',
  'mollysimon/galaxy-zoo-crowdsourcing-activity', // Classrooms
  'msbrhonclif/science-scribbler-key2cat', // Subject image sizes difficult in FEM's classifier layout
  'msbrhonclif/science-scribbler-placenta-profiles', // Subject image sizes difficult in FEM's classifier layout
  'mschwamb/planet-four', // Uses experimental "fan tool"
  'nora-dot-eisner/planet-hunters-tess-mobile',
  'panettafordham/shadows-on-stone-identifying-sing-sings-incarcerated',
  'penguintom79/penguin-watch', // Uses experimental "shortcut"
  'penguintom79/seabirdwatch', // Uses experimental "shortcut"
  'projectenigma/enigmatic-near-earth-visitors', // Video in a flipbook isn't supported in FEM
  'rsengar/einstein-at-home-pulsar-seekers', // Feedback per step isn't supported in FEM
  'sassydumbledore/chimp-and-see', // Video in a flipbook isn't supported in FEM
  'sandorkruk/istrox', // Uses mini-course
  'tawakitom/penguins-from-above', // Subject image sizes difficult in FEM's classifier layout
  'tingard/galaxy-builder', // custom slider interface on finished project
  'watchablewildlife/nebraska-wildlife-watch',
  'wildcam/wildcam-darien',
  'wwt/stream-team-emerging-insect-explorer',
  'xbonnin/solar-radio-burst-tracker', // Freehand segment line and freehand shape deprecated from FEM
  'zooniverse/floating-forests',
  'zooniverse/intro2astro-hubbles-law', // Classrooms
  'zooniverse/measuring-the-anzacs', // Classrooms
  'zooniverse/zooniverse-in-schools', // Classrooms
]

export default PFE_SLUGS
