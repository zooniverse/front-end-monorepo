/**
 * Calculate whether the bounding client rectangles of two elements overlap.
 * @param {Element} markElement 
 * @param {Element} canvas 
 * @returns {boolean} true if the two elements overlap.
 */
export function isInBounds(markElement, canvas) {
    const object = markElement.getBoundingClientRect()
    const bounds = canvas.getBoundingClientRect()
    const notBeyondLeft = object.left + object.width > bounds.left
    const notBeyondRight = object.left < bounds.left + bounds.width
    const notBeyondTop = object.top + object.height > bounds.top
    const notBeyondBottom = object.top < bounds.top + bounds.height
    return notBeyondLeft && notBeyondRight && notBeyondTop && notBeyondBottom
}
