import React, { Component } from 'react'

class SearchBox extends Component {
  timerId = null

  state = {
    value: this.props.currentRefinement,
  }

  onChangeDebounced = (event) => {
    const { refine, delay } = this.props
    const value = event.currentTarget.value

    clearTimeout(this.timerId)
    this.timerId = setTimeout(() => refine(value), delay)

    this.setState(() => ({
      value,
    }))
  }

  render() {
    const { value } = this.state

    return (
      <input
        className='block w-full rounded-md border-0 my-3 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        value={value}
        onChange={this.onChangeDebounced}
        placeholder="Search for whatever, like"
      />
    )
  }
}

export { SearchBox }