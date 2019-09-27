import counterpart from 'counterpart'
import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Carousel } from 'grommet'
import SubjectThumbnail from './components/SubjectThumbnail'

// TODO: Use the subject viewers from the classifier
function RecentSubjectsCarousel (props) {
  const { className, href, subjects } = props
  const height = 500
  const width = 700
  return (
    <Carousel
      className={className}
      controls='arrows'
      fill
    >
      {subjects.map(subject => (
        <SubjectThumbnail
          key={subject.id}
          height={height}
          href={href}
          subject={subject}
          width={width}
        />
      ))}
    </Carousel>
  )
}

RecentSubjectsCarousel.propTypes = {
  className: string,
  href: string.isRequired,
  subjects: arrayOf(shape({
    id: string
  })).isRequired
}

RecentSubjectsCarousel.defaultProps = {
  className: undefined
}

export default RecentSubjectsCarousel
