import { arrayOf, shape, string } from 'prop-types'
import { Carousel } from 'grommet'
import SubjectThumbnail from './components/SubjectThumbnail'

function RecentSubjectsCarousel ({
  className,
  href,
  subjects = []
}) {
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
  /** CSS class. */
  className: string,
  /** Base href for subject links */
  href: string.isRequired,
  /** Recent subjects from the Talk API. */
  subjects: arrayOf(shape({
    id: string
  })).isRequired
}

export default RecentSubjectsCarousel
