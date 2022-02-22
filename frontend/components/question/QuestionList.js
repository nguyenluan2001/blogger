import React from 'react'
import QuestionItem from './QuestionItem'

function QuestionList({questions}) {
  return (
   <>
    {
        questions &&
        questions.map((question) => (
            <QuestionItem question={question}></QuestionItem>
        ))
    }
   </>
  )
}

export default QuestionList