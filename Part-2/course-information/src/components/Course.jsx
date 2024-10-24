import Header from './Header'
import Parts from './Parts'
import Total from './Total'

const Course = ({ courses }) => {
    const course = courses.map(course => {
        return (
            <div key={course.id}>
                <Header text={course.name} />
                <Parts parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )
    })

    return (
        <>
            {course}
        </>
    )
}

export default Course