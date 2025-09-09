import { observer } from 'mobx-react'
import { Button } from 'grommet'
import { useTranslation } from '@translations/i18n'
import { useStores } from '@hooks'
import { Blank } from 'grommet-icons'

const SwitchToFlipbook = props => {
  return (
    <Blank
      viewBox='0 0 640 512'
      color={{ light: 'black', dark: 'white' }}
      {...props}
    >
      <path d='M596.7-0.2H230.3c-22.6,0-41.5,16.9-41.5,37.7v276.6c0,20.8,18.9,37.7,41.5,37.7h366.4c23.3,0,42.3-16.9,42.3-37.7V37.5 C639,16.7,620.9-0.2,596.7-0.2z M286.7,295.3c0,3.5-3.2,6.3-7,6.3h-42.3c-3.9,0-7-2.8-7-6.3v-37.7c0-3.5,3.2-6.3,7-6.3h41.5c3.9,0,7,2.8,7,6.3L286.7,295.3z M286.7,194.7c0,3.5-3.2,6.3-7,6.3h-42.3c-3.9,0-7-2.8-7-6.3V157c0-3.5,3.2-6.3,7-6.3h41.5c3.9,0,7,2.8,7,6.3v37.7H286.7z M286.7,94.1c0,3.5-3.2,6.3-7,6.3h-42.3c-3.9,0-7-2.8-7-6.3V56.4c0-3.5,3.2-6.3,7-6.3h41.5c3.9,0,7,2.8,7,6.3L286.7,94.1z M498.1,289c0,6.9-6.3,12.6-14.1,12.6H343.1c-7.8,0-14.1-5.6-14.1-12.6v-75.4c0-6.9,6.3-12.6,14.1-12.6H484c7.8,0,14.1,5.6,14.1,12.6V289z M498.1,138.1c0,6.9-6.3,12.6-14.1,12.6H343.1c-7.8,0-14.1-5.6-14.1-12.6V62.7c0-6.9,6.3-12.6,14.1-12.6H484c7.8,0,14.1,5.6,14.1,12.6V138.1z M596.7,295.3c0,3.5-3.2,6.3-7,6.3h-41.5c-3.9,0-6.3-2.8-6.3-6.3v-37.7c0-3.5,3.2-6.3,7-6.3h41.5c3.9,0,7,2.8,7,6.3v37.7H596.7z M596.7,194.7c0,3.5-3.2,6.3-7,6.3h-41.5c-3.9,0-7-2.8-7-6.3V157c0-3.5,3.2-6.3,7-6.3h41.5c3.9,0,7,2.8,7,6.3V194.7z M596.7,94.1c0,3.5-3.2,6.3-7,6.3h-41.5c-3.9,0-7-2.8-7-6.3V56.4c0-3.5,3.2-6.3,6.3-6.3h41.5c3.9,0,7,2.8,7,6.3v37.7H596.7z' />
      <path d='M158.4,307.7V128H54.9C25.6,128,0,151.4,0,180.4v279.3C0,488.6,24.6,512,54.9,512h402.3c30.3,0,54.9-23.4,54.9-52.4v-75.2h-97.6l21.4,30.6c3.8,5.3,4.1,12.2,0.9,18c-3.2,5.7-9.4,9.2-16.1,9.2H90.4c-6.9,0-12.1-3.7-15.3-9.5c-3.1-5.9-2.5-13,1.6-18.2M107,197.8c20.2,0,36.6,15.6,36.6,34.9s-16.4,34.9-36.6,34.9c-19.2,0-36.6-15.6-36.6-34.9S87.8,197.8,107,197.8z' />
    </Blank>
  )
}

const SwitchToSeparateFrames = props => {
  return (
    <Blank
      viewBox='0 0 640 512'
      color={{ light: 'black', dark: 'white' }}
      {...props}
    >
      <path d='M352 432c0 8.836-7.164 16-16 16H176c-8.838 0-16-7.164-16-16L160 128H48C21.49 128 .0003 149.5 .0003 176v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48L512 384h-160L352 432zM104 439c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V439zM104 335c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9V335zM104 231c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9v-30C56 196 60.03 192 65 192h30c4.969 0 9 4.031 9 9V231zM408 409c0-4.969 4.031-9 9-9h30c4.969 0 9 4.031 9 9v30c0 4.969-4.031 9-9 9h-30c-4.969 0-9-4.031-9-9V409zM591.1 0H239.1C213.5 0 191.1 21.49 191.1 48v256c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-256C640 21.49 618.5 0 591.1 0zM303.1 64c17.68 0 32 14.33 32 32s-14.32 32-32 32C286.3 128 271.1 113.7 271.1 96S286.3 64 303.1 64zM574.1 279.6C571.3 284.8 565.9 288 560 288H271.1C265.1 288 260.5 284.6 257.7 279.3C255 273.9 255.5 267.4 259.1 262.6l70-96C332.1 162.4 336.9 160 341.1 160c5.11 0 9.914 2.441 12.93 6.574l22.35 30.66l62.74-94.11C442.1 98.67 447.1 96 453.3 96c5.348 0 10.34 2.672 13.31 7.125l106.7 160C576.6 268 576.9 274.3 574.1 279.6z' />
    </Blank>
  )
}

function storeMapper(classifierStore) {
  const { separateFramesView, setSeparateFramesView } =
    classifierStore.subjectViewer

  return {
    separateFramesView,
    setSeparateFramesView
  }
}

const ViewModeButton = ({ smallScreenStyle }) => {
  const { separateFramesView, setSeparateFramesView } = useStores(storeMapper)
  const { t } = useTranslation('components')
  const a11yTitle = separateFramesView
    ? t('SubjectViewer.SeparateFramesViewer.ViewModeButton.switchToFlipbook')
    : t(
        'SubjectViewer.SeparateFramesViewer.ViewModeButton.switchToSeparateFrames'
      )

  return (
    <Button
      a11yTitle={a11yTitle}
      plain
      icon={
        separateFramesView ? (
          <SwitchToFlipbook
            onClick={() => setSeparateFramesView(false)}
            size={smallScreenStyle ? '20px' : 'medium'}
          />
        ) : (
          <SwitchToSeparateFrames
            onClick={() => setSeparateFramesView(true)}
            size={smallScreenStyle ? '20px' : 'medium'}
          />
        )
      }
      style={{ width: 'fit-content' }}
    />
  )
}

export default observer(ViewModeButton)
