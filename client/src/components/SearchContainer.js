import  FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useEffect } from 'react'
import Alert from './Alert'
const SearchContainer = () => {
  const {
    isLoading,
    search,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    getProjects,
    showAlert,
  } = useAppContext()
  useEffect(() => {
    getProjects()
    // eslint-disable-next-line
  }, [ search, sort])
  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* search title */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer