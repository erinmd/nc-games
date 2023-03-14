export const SortBy = ({setCurrentSort}) => {
    const sortBys = ['Title', 'Designer', 'Owner', 'Date', 'Votes', 'Comments']
    const sortOptions = sortBys.map(sortBy => {
        return (
            <option key={sortBy} value={sortBy}>
                {sortBy}
            </option>
        )
    })
    return <select className='selectCategory' onChange={e=>setCurrentSort(e.target.value)}>
        <option value='Sort by'>Sort by</option>
        {sortOptions}
    </select>
}