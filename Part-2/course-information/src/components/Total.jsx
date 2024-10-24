const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <p>There are {totalExercises} total exercises</p>
    )
}

export default Total