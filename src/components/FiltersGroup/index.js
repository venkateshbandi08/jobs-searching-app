import {Component} from 'react'
import './index.css'

class FiltersGroup extends Component {
  onChangeSalary = event => {
    const {filterSalaryRange} = this.props
    filterSalaryRange(event.target.value)
  }

  onChangeType = event => {
    const {filterEmploymentType} = this.props
    filterEmploymentType(event.target.value)
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="filters-container">
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="employment-type-list-container">
          {employmentTypesList.map(type => (
            <li className="each-type" key={type.employmentTypeId}>
              <input
                id={type.label}
                onChange={this.onChangeType}
                type="checkbox"
                className="input-checkbox"
                value={type.employmentTypeId}
              />
              <label htmlFor={type.label} className="filter-label-element">
                {type.label}
              </label>
            </li>
          ))}
        </ul>
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(range => (
            <li className="each-range" key={range.salaryRangeId}>
              <label htmlFor={range.label} className="filter-label-element">
                {range.label}
              </label>
              <input
                onChange={this.onChangeSalary}
                name="range"
                type="radio"
                className="input-radio"
                id={range.label}
                value={range.salaryRangeId}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default FiltersGroup
