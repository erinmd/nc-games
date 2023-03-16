import { SelectCategory } from "../Nav/SelectCategory"

export const AddReview = () => {
  return (
    <section className='addReview'>
      <h2>Add Review</h2>
      <form className='addReviewForm'>
        <section>
        <label for='reviewTitle'>Title:</label>
        <input id='reviewTitle'/>
        </section>
        <section>
        <label for='reviewBody'>Review:</label>
        <textarea />
        </section>
        <section>
        <label for='reviewDesigner'>Designer:</label>
        <input id='reviewDesigner' />
        </section>
        <section>
        <label for='categorySelect'>Category:</label>
        <SelectCategory id='categorySelect'/>
        </section>
        <section>
        <label for='reviewImage'>Image URL:</label>
        <input id='reviewImage' />
        </section>
      </form>
    </section>
  )
}
