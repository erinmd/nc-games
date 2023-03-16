import { useState } from 'react'
import { SelectCategory } from '../Nav/SelectCategory'

export const AddReviewForm = ({setNewReview}) => {
  const [formFields, setFormFields] = useState({
    title: '',
    body: '',
    designer: '',
    image: ''
  })
  const [category, setCategory] = useState(null)

  const submitHandler = e => {
    e.preventDefault()
    setNewReview({...formFields, category})
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
        />
      </section>
      <section>
        <label htmlFor='reviewBody'>Review:</label>
        <textarea
          value={formFields.body}
          onChange={e => {
            setFormFields({ ...formFields, body: e.target.value })
          }}
        />
      </section>
      <section>
        <label htmlFor='reviewDesigner'>Designer:</label>
        <input
          value={formFields.designer}
          id='reviewDesigner'
          onChange={e => {
            setFormFields({ ...formFields, designer: e.target.value })
          }}
        />
      </section>
      <section>
        <label htmlFor='categorySelect'>Category:</label>
        <SelectCategory setCurrentCategory={setCategory} id='categorySelect' />
      </section>
      <section>
        <label htmlFor='reviewImage'>Image URL:</label>
        <input
          value={formFields.image}
          id='reviewImage'
          onChange={e => {
            setFormFields({ ...formFields, image: e.target.value })
          }}
        />
      </section>
      <section>
        <button className='addReviewButton'>Submit</button>
      </section>
    </form>
  )
}
