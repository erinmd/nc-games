import { useState } from 'react'
import { SelectCategory } from '../Nav/SelectCategory'

export const AddReviewForm = ({ setNewReview }) => {
  const [formFields, setFormFields] = useState({
    title: '',
    body: '',
    designer: '',
    image: ''
  })
  const [feedback, setFeedback] = useState({
    title: { msg: '', class: 'form-none' },
    body: { msg: '', class: 'form-none' },
    designer: { msg: '', class: 'form-none' },
    image: { msg: '', class: 'form-none' },
    category: { msg: '', class: 'form-none' }
  })
  const [category, setCategory] = useState(null)

  const submitHandler = e => {
    e.preventDefault()
    setNewReview({ ...formFields, category })
  }

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
                title: { msg: 'Required', class: 'error' }
              })
            } else {
                setFeedback({
                    ...feedback,
                    title: { msg: '', class: 'form-none' }
                })
            }
          }}
        />
        <label htmlFor='reviewTitle' className={feedback.title.class}>
          {feedback.title.msg}
        </label>
      </section>
      <section>
        <label htmlFor='reviewBody'>Review:</label>
        <textarea
          value={formFields.body}
          onChange={e => {
            setFormFields({ ...formFields, body: e.target.value })
          }}
          onBlur={e => {
            if (e.target.value.length === 0) {
              setFeedback({
                ...feedback,
                body: { msg: 'Required', class: 'error' }
              })
            } else {
                setFeedback({
                    ...feedback,
                    body: { msg: '', class: 'form-none' }
                })
            }
          }}
        />
        <label htmlFor='reviewBody' className={feedback.body.class}>
          {feedback.body.msg}
        </label>
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
                designer: { msg: 'Required', class: 'error' }
              })
            } else {
                setFeedback({
                    ...feedback,
                    designer: { msg: '', class: 'form-none' }
                })
            }
          }}
        />
        <label htmlFor='reviewDesigner' className={feedback.designer.class}>
          {feedback.designer.msg}
        </label>
      </section>
      <section>
        <label htmlFor='categorySelect'>Category:</label>
        <SelectCategory setCurrentCategory={setCategory} id='categorySelect' onBlur={e => {
            if (e.target.value=== 'Select Category') {
              setFeedback({
                ...feedback,
                category: { msg: 'Required', class: 'error' }
              })
            } else {
                setFeedback({
                    ...feedback,
                    category: { msg: 'anything', class: 'form-none' }
                })
            }
          }}/>
        <label htmlFor='reviewTitle' className={feedback.category.class}>
          {feedback.category.msg}
        </label>
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
                image: { msg: 'A default image will be selected for you', class: 'success' }
              })
            } else {
                setFeedback({
                    ...feedback,
                    image: { msg: '', class: 'form-none' }
                })
            }
          }}
        />
        <label htmlFor='reviewImage' className={feedback.image.class}>
          {feedback.image.msg}
        </label>
      </section>
      <section>
        <button className='addReviewButton'>Submit</button>
      </section>
    </form>
  )
}
