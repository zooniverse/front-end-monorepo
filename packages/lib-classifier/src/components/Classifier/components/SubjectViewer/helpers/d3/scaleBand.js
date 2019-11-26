import { scaleBand } from 'd3'

export default ({
  range,
  rangeRound,
  domain,
  padding,
  paddingInner,
  paddingOuter,
  align
}) => {
  const scale = scaleBand()
  scale.type = 'band'

  if (range) scale.range(range)
  if (rangeRound) scale.rangeRound(rangeRound)
  if (domain) scale.domain(domain)
  if (padding) scale.padding(padding)
  if (paddingInner) scale.paddingInner(paddingInner)
  if (paddingOuter) scale.paddingOuter(paddingOuter)
  if (align) scale.align(align)

  return scale
}