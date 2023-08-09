import { Box, Image } from 'grommet'

// NOTE: For static compiled 404 this gets run at compile time instead of on every request
// This means every deploy will introduce the randomness of the 404
let randomImage = Math.round(Math.random() * 8) + 1 // 1-9

export default function Error404({ project404Fragment = '', staticAssetsPrefix = '' }) {
  return (
    <Box
      width="100%"
      height="100%"
      style={{
        textAlign: 'center',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#1E1E1E',
        zIndex: '1',
      }}
    >
      <Box
        width="100%"
        height="100%"
        background={{
          image: `url("${staticAssetsPrefix}/projects/assets/background${randomImage}.png")`,
          size: 'cover',
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          opacity: '.5',
          zIndex: '2',
        }}
      />
      <Box height="44px"
        style={{
          zIndex: '3'
        }}
      >
        <Image
          id="404-logo"
          fit="contain"
          a11yTitle="404"
          alt="404"
          src={`${staticAssetsPrefix}/projects/assets/logoWhite404.png`}
        />
      </Box>
      {project404Fragment}
    </Box>
  )
}
