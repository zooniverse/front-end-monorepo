export function isInBounds(markElement, canvas) {
    const object = markElement.getBoundingClientRect()
    const bounds = canvas.getBoundingClientRect()
    const notBeyondLeft = object.left + object.width > bounds.left
    const notBeyondRight = object.left < bounds.left + bounds.width
    const notBeyondTop = object.top + object.height > bounds.top
    const notBeyondBottom = object.top < bounds.top + bounds.height
    return notBeyondLeft && notBeyondRight && notBeyondTop && notBeyondBottom
}
