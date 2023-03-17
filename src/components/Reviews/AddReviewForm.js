import { useState } from 'react'
import { SelectCategoryForm } from './SelectCategoryForm'

export const AddReviewForm = ({ setNewReview }) => {
  const [formFields, setFormFields] = useState({
    title: '',
    body: '',
    designer: '',
    image: ''
  })
  const [feedback, setFeedback] = useState({
    title: { msg: 'Required', class: 'missing formMsg' },
    body: { msg: 'Required', class: 'missing formMsg' },
    designer: { msg: 'Required', class: 'missing formMsg' },
    image: { msg: 'A default image will be selected for you', class: 'missing formMsg' },
    category: { msg: 'You must select a category', class: 'missing formMsg' }
  })

  const [category, setCategory] = useState(null)
  const submitHandler = e => {
    e.preventDefault()
    let readyToSubmit = true
    const feedbackCopy = { ...feedback }
    for (const formField in feedbackCopy) {
      const formFieldCopy = { ...feedbackCopy[formField] }
      if (
        formFieldCopy.class === 'error formMsg' ||
        formFieldCopy.class === 'missing formMsg' 
      ) {
        if (formField === 'image')  formFieldCopy.class = 'success formMsg'
        else formFieldCopy.class = 'error formMsg'
        feedbackCopy[formField] = formFieldCopy
        setFeedback(feedbackCopy)
        readyToSubmit = false
      }
    }
    if (readyToSubmit) {
      setNewReview({ ...formFields, category })
      setFormFields({
        title: '',
        body: '',
        designer: '',
        image: ''
      })
      setCategory(null)
      setFeedback({
        title: { msg: 'Required', class: 'missing formMsg' },
        body: { msg: 'Required', class: 'missing formMsg' },
        designer: { msg: 'Required', class: 'missing formMsg' },
        image: { msg: '', class: 'missing formMsg' },
        category: { msg: 'You must select a category', class: 'missing formMsg' }
      })
    }
  }

  const imageURLRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/

  return (
    <form onSubmit={submitHandler} className='addReviewForm'>
      <section>
        <label htmlFor='reviewTitle'>Title:</label>
        <input
          onChange={e => {
            setFormFields({ ...formFields, title: e.target.value })
          }}
          value={formFields.title}
          id='reviewTitle'
          onBlur={e => {
            if (e.target.value.length === 0) {
              setFeedback({
                ...feedback,
                title: { msg: 'Required', class: 'error formMsg' }
              })
            } else {
              setFeedback({
                ...feedback,
                title: { msg: '', class: 'success formMsg' }
              })
            }
          }}
        />
        <p className={feedback.title.class}>
          {feedback.title.msg}
        </p>
      </section>
      <section>
        <label htmlFor='reviewBody'>Review:</label>
        <textarea
        id='reviewBody'
          value={formFields.body}
          onChange={e => {
            setFormFields({ ...formFields, body: e.target.value })
          }}
          onBlur={e => {
            if (e.target.value.length === 0) {
              setFeedback({
                ...feedback,
                body: { msg: 'Required', class: 'error formMsg' }
              })
            } else {
              setFeedback({
                ...feedback,
                body: { msg: '', class: 'success formMsg' }
              })
            }
          }}
        />
        <p className={feedback.body.class}>
          {feedback.body.msg}
        </p>
      </section>
      <section>
        <label htmlFor='reviewDesigner'>Designer:</label>
        <input
          value={formFields.designer}
          id='reviewDesigner'
          onChange={e => {
            setFormFields({ ...formFields, designer: e.target.value })
          }}
          onBlur={e => {
            if (e.target.value.length === 0) {
              setFeedback({
                ...feedback,
                designer: { msg: 'Required', class: 'error formMsg' }
              })
            } else {
              setFeedback({
                ...feedback,
                designer: { msg: '', class: 'success formMsg' }
              })
            }
          }}
        />
        <p className={feedback.designer.class}>
          {feedback.designer.msg}
        </p>
      </section>
      <section>
        <label htmlFor='categorySelect'>Category:</label>
        <SelectCategoryForm
          setFeedback={setFeedback}
          feedback={feedback}
          setCurrentCategory={setCategory}
          id='categorySelect'
        />
        <p className={feedback.category.class}>
          {feedback.category.msg}
        </p>
      </section>
      <section>
        <label htmlFor='reviewImage'>Image URL:</label>
        <input
          value={formFields.image}
          id='reviewImage'
          onChange={e => {
            setFormFields({ ...formFields, image: e.target.value })
          }}
          onBlur={e => {
            if (e.target.value.length === 0) {
              setFeedback({
                ...feedback,
                image: {
                  msg: 'A default image will be selected for you',
                  class: 'success formMsg'
                }
              })
            } else if (!imageURLRegex.test(e.target.value)) {
              setFeedback({
                ...feedback,
                image: { msg: 'Invalid image url', class: 'error formMsg' }
              })
            } else {
              setFeedback({
                ...feedback,
                image: { msg: '', class: 'success formMsg' }
              })
            }
          }}
        />
        <p className={feedback.image.class}>
          {feedback.image.msg}
        </p>
      </section>
      <section>
        <button className='addReviewButton'>Submit</button>
      </section>
    </form>
  )
}
