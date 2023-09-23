// Write your code here

import './index.css'

const LanguageFilter = props => {
  const {languageItem, getLangId, isActive} = props

  const {language, id} = languageItem

  const classStyle = isActive ? 'highLight' : ''

  const sendLangId = () => {
    getLangId(id)
  }

  return (
    <li className="lang-li">
      <button
        onClick={sendLangId}
        className={`lang-btn ${classStyle}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilter
