import NextErrorComponent from 'next/error'

const CustomErrorComponent = (props) => (
  <NextErrorComponent statusCode={props.statusCode} />
)

CustomErrorComponent.getInitialProps = async (contextData) => {
  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
