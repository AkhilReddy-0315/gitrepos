// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props

  const {avatarUrl, forksCount, issuesCount, name, starsCount} = repoItem

  return (
    <li className="repo-li">
      <img className="avatar-img" src={avatarUrl} alt={name} />
      <h1>{name}</h1>
      <div className="con">
        <img
          className="stars-img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount}</p>
      </div>
      <div className="con">
        <img
          className="forks-img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount}</p>
      </div>
      <div className="con">
        <img
          className="open-issues-img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
