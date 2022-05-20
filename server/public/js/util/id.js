
export function generate_id(length=10) {
    return (Math.random().toString(36)+'00000000000000000').slice(2, length+2)
}
