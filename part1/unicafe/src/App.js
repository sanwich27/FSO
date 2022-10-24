import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodIncrease = () => {
    console.log("Increase a feedback: good; Total: ", good + 1)
    setGood(good + 1);
  }
  const neutralIncrease = () => {
    console.log("Increase a feedback: neutral; Total: ", neutral + 1)
    setNeutral(neutral + 1);
  }
  const badIncrease = () => {
    console.log("Increase a feedback: bad; Total: ", bad + 1)
    setBad(bad + 1);
  }


  return (
    <div>
      <Title title="Feedbacks"/>
      <Button text="good" handleClick={() => goodIncrease()} />
      <Button text="neutral" handleClick={() => neutralIncrease()}/>
      <Button text="bad" handleClick={() => badIncrease()}/>
      <Title title="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Title = ({title}) => <h2>{title}</h2> 
const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good - bad) / (good + neutral + bad);
  const positive = (good / (good + neutral + bad) * 100).toString()+" %";

  if (good === 0  && neutral === 0 && bad === 0) return <p>No feedbacks are given</p>
  else return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good}/>
        <StatisticsLine text="neutral" value={neutral}/>
        <StatisticsLine text="bad" value={bad}/>
        <StatisticsLine text="all" value={all}/>
        <StatisticsLine text="average" value={average}/>
        <StatisticsLine text="positive" value={positive}/>
      </tbody>
    </table>
  );
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  )
}


export default App