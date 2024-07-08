export const mag = (vec) => {
    return Math.sqrt((vec.x)*vec.x + vec.y*vec.y)
}
export const dist = (v1, v2) => {
    return Math.sqrt((v1.x - v2.x)*(v1.x - v2.x) + (v1.y - v2.y)*(v1.y - v2.y))
}