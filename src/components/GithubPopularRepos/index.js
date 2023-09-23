import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilter from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class Github extends Component {
  state = {
    isLoading: true,
    renderStatus: true,
    activeId: languageFiltersData[0].id,
    repoList: [],
  }

  componentDidMount() {
    this.getRepositoryItem()
  }

  getRepositoryItem = async () => {
    const {activeId} = this.state
    this.setState({isLoading: true})
    const options = {method: 'GET'}
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeId}`,
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      console.log(formattedData)
      this.setState({repoList: formattedData, isLoading: false})
    } else {
      this.setState({renderStatus: false, isLoading: false})
    }
  }

  getLangId = id => {
    this.setState({activeId: id}, this.getRepositoryItem)
  }

  renderRepositoryItem = () => {
    const {repoList} = this.state

    return (
      <ul className="repo-ul">
        {repoList.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderLanguageItem = () => {
    const {activeId} = this.state
    return (
      <ul className="git-ul">
        {languageFiltersData.map(eachItem => (
          <LanguageFilter
            getLangId={this.getLangId}
            key={eachItem.id}
            languageItem={eachItem}
            isActive={eachItem.id === activeId}
          />
        ))}
      </ul>
    )
  }

  renderBadStatus = () => (
    <div className="failCon">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderCorrectUi = () => {
    const {renderStatus} = this.state

    return (
      <>{renderStatus ? this.renderRepositoryItem() : this.renderBadStatus()}</>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg">
        <h1 className="title">Popular</h1>
        {this.renderLanguageItem()}
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.renderCorrectUi()
        )}
      </div>
    )
  }
}

export default Github
