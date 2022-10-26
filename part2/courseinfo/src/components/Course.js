const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <strong>Total of {sum} exercises</strong>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}

const Course = ({course}) => {
  const countSum = () => course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={countSum()} />
    </div>
  );
}

export default Course 