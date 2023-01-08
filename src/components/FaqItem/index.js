import './index.css'

const FaqItem = props => {
  const {data} = props
  const {question, answer} = data
  return (
    <li className="faq-item">
      <p className="faq-question">{question}</p>
      <p className="faq-answer">{answer}</p>
    </li>
  )
}

export default FaqItem
