import { TutorialMediumFactory } from '@test/factories'

export const media = [
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/55bbe58d-30a5-44b0-bfe6-4834605c61ca.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/0c1d473f-cd41-4c1d-a9aa-03366b83f658.mp4'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/121e47ed-b4ab-47e9-925c-344d38ebeca1.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/a036bead-1213-4bc2-a705-24ccf7ff9ab0.png'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/ca32341e-cc48-4b03-94b2-da9e36af8448.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/3bf2824d-7a4e-4e74-843d-b2a2de3904af.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/33f78ed9-1eb0-46fc-8704-9ccf421d8f29.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/63a21842-004d-49b0-91b8-269879356ef8.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/f2b8b50a-de9b-495e-98e4-c58680ff80d5.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/58a2576d-dcd7-481f-8e80-ea6ed9673f83.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/644d794e-c40c-4e46-8424-f10443a99ee6.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/8d1e5d3d-edd4-4819-abba-04215d708649.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/7fcacaf9-79d8-457f-ae12-b209ea595f85.jpeg'
  }),
  TutorialMediumFactory.build({
    src: 'https://panoptes-uploads.zooniverse.org/project_attached_image/13453198-1f5d-4fe9-ab86-1e2715f7ae33.jpeg'
  })
]

export const steps = [
  {
    content: `## **Let's Learn About BTS** ##\n\n[BTS](https://en.wikipedia.org/wiki/BTS), also known as the Bangtan Boys or Bulletproof Boy Scouts, is a South Korean boy band that debuted in June 2013. The group consists of seven members: RM, Jin, Suga, J-Hope, Jimin, V, and Jungkook.\n\nOriginally a hip hop group, they expanded their musical style to incorporate a wide range of genres, while their lyrics have focused on subjects including mental health, coming of age, loss, the journey towards self-love, individualism and the consequences of fame and recognition.`,
    medium: media[0].id
  },
  {
    content: `## **ARMY** ##\n\nThe group has a large, highly organized, online community of fans known as ARMY, which translates the group's lyrics and social media posts into other languages and matches charitable contributions of BTS's members. As of June 2026, BTS is the only artist to have amassed 80 million subscribers/followers across each of YouTube, Instagram, Spotify, and TikTok.\n\nThe BTS and ARMY logos are inversions of each other.\n\n![BTS logo](https://panoptes-uploads.zooniverse.org/project_attached_image/1b6f5bb5-059e-4074-801e-c3a5258cdfc6.jpeg =50x) ![ARMY logo](https://panoptes-uploads.zooniverse.org/project_attached_image/e35ccf8c-c7fb-4405-b18d-04dade7ca9d2.png =50x)\n\nLed collective One In An ARMY, raised over $1 million to match the $1 million donation made by the K-pop group BTS and its label Big Hit Entertainment to the Black Lives Matter movement in 2020.`,
    medium: media[1].id
  },
  {
    content: `## **Military Service** ##\n\nBTS members completed their mandatory South Korean military service between June 2024 and June 2025, fulfilling their legal obligations after the group paused activities in 2022. All seven members served, with Jin being the first to enlist in December 2022 and discharge in June 2024, while Suga was the final member to complete his service in June 2025.`,
    medium: media[2].id
  },
  {
    content: `## **Arirang** ##\n\n*Arirang* is BTS's fifth studio album—released on March 20, 2026—marking the seven-member group's full reunion after military service.\n\nThe Arirang World Tour is their massive all-stadium tour running from April 2026 through March 2027.\n\nLink to the [2.0 Music Video](https://www.youtube.com/watch?v=_gyultVTesk). You have to click through because the channel is configured not to embed videos.`,
    medium: media[3].id
  }
]

export const strings = {
  display_name: 'A slide tutorial about BTS',
  'steps.0.content': steps[0].content,
  'steps.1.content': steps[1].content,
  'steps.2.content': steps[2].content,
  'steps.3.content': steps[3].content
}

export function stepWithMedium(index) {
  const medium = media[index]
  const step = steps[index]
  return { medium, step }
}

export const extraSteps = [
  {
    content: `## **Kim Namjoon (RM)** ##\n\nKim Namjoon, known professionally as RM, is a South Korean rapper, songwriter, and record producer born in 1994. He is the leader and main rapper.\n\nHe is widely recognized for his intellectual depth, boasting an IQ of 148 and ranking in the top 1% of students on South Korea’s national university entrance exams. He is also fluent in English, which he taught himself by watching the sitcom Friends.\n\nHe collaborated with the museum SFMOMA to show off his art collection in a curation called [Between You and Me ](https://www.sfmoma.org/exhibition/rm-x-sfmoma).\n\nNamjoon is represented on social platforms with the 🐨 koala.`,
    medium: media[4].id
  },
  {
    content: `## **Kim Seokjin (Jin)** ##\n\nKim Seokjin, professionally known as Jin, is a South Korean singer, songwriter, and the visual vocalist.  Born in 1992, he was scouted by Big Hit Entertainment in 2011 while studying acting at Konkuk University. \n\nJin debuted with BTS in June 2013 and is celebrated for his distinctive "silver voice," solo tracks like "Epiphany" and "The Astronaut," and his nickname "Worldwide Handsome." He completed his mandatory military service in June 2024 and remains an active artist and producer under Big Hit Music.`,
    medium: media[5].id
  },
  {
    content: `## **Min Yoongi (Suga)** ##\n\nMin Yoongi, known professionally as Suga (with BTS) and Agust D (solo), is a South Korean rapper, songwriter, and record producer born in 1993. He serves as the lead rapper and a primary producer for the global boy band BTS, having officially debuted with them on June 13, 2013. \n\nBefore his idol career, Yoongi was active in the underground hip-hop scene and initially joined Big Hit Entertainment to work as a producer, balancing training with part-time delivery jobs to support himself. He is recognized for his introspective lyrics, deep rap tone, and prolific output, holding over 160 KOMCA credits for songs produced for BTS and other artists. \n\nHis solo work under the name Agust D includes critically acclaimed projects such as the Agust D, D-2, and D-DAY albums, which explore themes of mental health, identity, and personal struggle. He completed his mandatory military service as a social service agent in June 2025 and returned to music activities shortly after.`,
    medium: media[6].id
  },
  {
    content: `## **Jung Hoseok (J-Hope)** ##\n\nJung Hoseok, known professionally as j-hope, is a South Korean rapper, dancer, songwriter, and record producer, best known as the main dancer. Born in 1994, in Gwangju, South Korea, he joined Big Hit Entertainment as a trainee in 2010 and debuted with the group in June 2013.\n\nj-hope is celebrated for his energetic stage presence, having earned the nickname "Sunshine of BTS" for his positive personality. He made his solo debut with the mixtape Hope World in 2018 and released his first studio album, Jack In The Box, in July 2022. Notably, he became the first BTS member to chart on the Billboard Hot 100 as a soloist and the first Korean solo artist to headline the Lollapalooza festival in 2022. \n\nAfter completing mandatory military service, which he began in April 2023 and concluded in October 2024, j-hope has continued his successful solo career, including performances at major international events like Lollapalooza Berlin in 2025. He is also a recognized fashion icon, serving as an ambassador for Louis Vuitton.`,
    medium: media[7].id
  },
  {
    content: `## **Park Jimin (Jimin)** ##\n\nPark Jimin, professionally known as Jimin, is a South Korean singer, songwriter, and dancer, best known as the Main Dancer and a Lead Vocalist. Born in Busan in 1995, he trained in contemporary dance at Busan High School of Arts and was the last member to join BTS, debuting with the group on June 13, 2013.\n\nRenowned for his expressive stage presence and technical precision, Jimin has achieved significant solo success, including becoming the first K-pop soloist to debut at #1 on the Billboard Hot 100 with his 2023 track "Like Crazy." He released his debut solo album, FACE, in 2023 and followed up with MUSE in 2024, while also serving as a global brand ambassador for luxury houses like Dior and Tiffany & Co.`,
    medium: media[8].id
  },
  {
    content: `## **Kim Taehyung (V)** ##\n\nKim Taehyung, known professionally as V, is a South Korean singer, songwriter, and actor who debuted in 2013 as a member of the global boy band BTS. Born in 1995, and raised in Daegu and Geochang by farming parents, he is the eldest of three siblings and initially joined Big Hit Entertainment after encouraging a friend to audition.\n\nRenowned for his deep baritone voice and unique artistic sensibility, V served as the group's vocalist and visual before expanding his career with solo projects like the album Layover. He completed his mandatory military service in 2026 and is currently recognized as one of the most influential figures in K-pop, with an estimated net worth of $40 million.`,
    medium: media[9].id
  },
  {
    content: `## **Jeon Jungkook (Jung Kook)** ##\n\nJeon Jungkook, professionally known as Jungkook, was born in 1997 in Busan, South Korea, is a global superstar best known as the youngest member (maknae), and is the main vocalist of the band. Nicknamed the "Golden Maknae" for his versatility, he excels in singing, dancing, rapping, and various arts, having debuted with BTS in 2013 at age 15.\n\nBeyond his group activities, Jungkook has achieved massive solo success, notably with hits like "Seven" and his album GOLDEN, becoming one of the fastest K-pop soloists to reach 1 billion streams on Spotify. He is also recognized for his humanitarian efforts, including his performance at the 2022 FIFA World Cup, and maintains a private personal life while being admired for his disciplined work ethic and humble demeanor.`,
    medium: media[10].id
  },
  {
    content: `## **Accolades** ##\n\nThey have consecutively won the Billboard Music Award for Top Social Artist since 2017; are the only K-pop group to win Top Duo/Group, at the 2019 Billboard Music Awards; and are the most-awarded group in BBMA history as of 2022, with 12 wins overall. BTS are also the only K-pop group to win Favorite Duo or Group – Pop/Rock and Favorite Social Artist at the American Music Awards, and became the first Asian act in the show's history to win Artist of the Year in 2021. They are the first Korean pop act to receive a Grammy Award nomination, and the first Korean artist to be nominated for a Brit Award. With 30 awards overall, including a record four consecutive wins for Artist of the Year (Asia), BTS are the most-awarded foreign artist in the history of the Japan Gold Disc Awards. They have also received a total of 50 trophies at the MAMA Awards.`,
    medium: media[11].id
  },
  {
    content: `## **Boycotting the Grammy's** ##\n\nBTS has officially decided not to submit their music for consideration at the 2027 Grammy Awards, resulting in zero nominations for the group despite their recent comeback album Arirang falling within the eligibility period.\n\nThe decision, announced in July 2026, was widely interpreted as a protest against the Recording Academy's introduction of a new Best Asian Pop Music Performance category.`,
    medium: media[12].id
  },
  {
    content: `## **Members List** ##\n\n- Jin (진) – vocalist\n\n- Suga (슈가) – rapper\n\n- J-Hope (제이홉) – rapper\n\n- RM (알앰) – leader, rapper\n\n- Jimin (지민) – vocalist\n\n- V (뷔) – vocalist\n\n- Jung Kook (정국) – vocalist`,
    medium: media[13].id
  }
]

export const manySteps = steps.concat(extraSteps)

export const manyStepsStrings = {
  display_name: 'A slide tutorial about BTS',
  'steps.0.content': steps[0].content,
  'steps.1.content': steps[1].content,
  'steps.2.content': steps[2].content,
  'steps.3.content': steps[3].content,
  'steps.4.content': manySteps[4].content,
  'steps.5.content': manySteps[5].content,
  'steps.6.content': manySteps[6].content,
  'steps.7.content': manySteps[7].content,
  'steps.8.content': manySteps[8].content,
  'steps.9.content': manySteps[9].content,
  'steps.10.content': manySteps[10].content,
  'steps.11.content': manySteps[11].content,
  'steps.12.content': manySteps[12].content,
  'steps.13.content': manySteps[13].content
}

export function stepWithManyMedium(index) {
  const medium = media[index]
  const step = manySteps[index]
  return { medium, step }
}
