'use client'
// TODO: 👆 is this correct? Or should this be in the UnsubscribeForm subcomponent? 🤔
// https://nextjs.org/docs/app/api-reference/directives/use-client

import { Box } from 'grommet'

import UnsubscribeFrom from './components/UnsubscribeForm/UnsubscribeForm'
import OtherLayout from '@components/PageLayout/OtherLayout'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import {
  MobileHeading,
  StyledHeading
} from '@components/SharedStyledComponents/SharedStyledComponents'

function Unsubscribe () {

  return (
    <OtherLayout>
      <Box pad={{ horizontal: 'medium', top: 'large', bottom: 'large' }} align='center'>
        <MaxWidthContent color={{ light: 'black', dark: 'white' }}>
          <UnsubscribeFrom />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ornare diam id sapien dignissim ultricies. Donec orci orci, sodales eu enim vel, aliquet elementum neque. Aliquam dignissim, neque mollis pharetra pharetra, ex eros fermentum libero, at laoreet dolor metus sed nisl. Phasellus et enim quis mauris ornare mollis sit amet eu neque. Donec quis sollicitudin ante. In id faucibus enim, sit amet efficitur purus. Quisque sapien massa, elementum ac bibendum ac, fringilla ut neque. Phasellus pellentesque mi ut fermentum commodo. Morbi dolor leo, euismod eu hendrerit vel, aliquam non nulla. Pellentesque sit amet metus egestas, sodales risus quis, imperdiet magna. Morbi commodo nulla ac consequat dapibus. Donec tempor eleifend elit viverra fermentum.</p>
          <p>Aenean nec enim erat. Sed malesuada, eros vitae congue pharetra, tellus nisi consequat leo, at convallis mauris mi sed neque. Cras elementum tincidunt convallis. Sed quis enim sapien. Suspendisse ante lorem, commodo ullamcorper gravida ut, tincidunt sit amet magna. Proin tristique ultricies velit ac tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas lacus metus, vulputate ac ante eget, pretium ullamcorper neque. Aenean eleifend a diam quis molestie. Curabitur quis dictum ante.</p>
          <p>Nullam hendrerit consequat massa in lacinia. Vestibulum tincidunt risus id pharetra pretium. Curabitur felis nulla, dictum ut sagittis cursus, sodales varius velit. Nam vel lectus quis sapien porttitor imperdiet in non erat. Nunc ac orci ultricies, pretium elit et, laoreet velit. Aenean erat nunc, vulputate eu varius a, scelerisque a nulla. Fusce vel augue magna. Praesent at nibh condimentum, pretium arcu sed, fringilla lorem. Phasellus lacinia feugiat facilisis. Pellentesque ut velit erat. Fusce pellentesque, mi ac auctor condimentum, mi ante sagittis magna, quis efficitur mi nisi at est. Duis commodo leo velit, vel pharetra ante aliquam at. Vivamus ex quam, viverra vitae sollicitudin eu, rhoncus ac nunc.</p>
          <p>Maecenas sed nisi est. Vivamus quis felis id ex porttitor condimentum a non felis. Integer purus nibh, auctor non dui in, finibus lobortis metus. Duis ut ipsum tortor. Vestibulum nec finibus arcu, nec venenatis purus. Sed congue erat non est aliquam elementum. Duis fermentum nunc turpis, fringilla mollis felis cursus at.</p>
          <p>Phasellus rhoncus lectus sit amet dignissim euismod. Integer eget purus a lorem lobortis tempor. Quisque magna eros, condimentum quis mauris non, dignissim tincidunt arcu. Proin felis orci, fermentum ut auctor nec, fermentum non leo. Quisque commodo congue ipsum, vitae tristique felis blandit et. Vestibulum vitae euismod nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis iaculis libero ac mi ullamcorper suscipit. Suspendisse vulputate ipsum eu mauris rhoncus commodo a in mi. Curabitur luctus nibh vitae mi tincidunt, scelerisque lacinia nulla bibendum. Donec sapien sem, imperdiet sit amet tristique a, scelerisque ac nulla. Duis vel quam non quam vestibulum tristique.</p>
        </MaxWidthContent>
      </Box>
    </OtherLayout>
  )
}

export default Unsubscribe
