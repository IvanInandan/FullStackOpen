const Parts = ({ parts }) => {
    return (
        parts.map(section => (
            <p key={section.id}>
                {section.name}: {section.exercises}
            </p>
        ))
    )
}

export default Parts