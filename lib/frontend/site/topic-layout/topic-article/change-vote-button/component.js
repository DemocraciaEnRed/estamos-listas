import React from 'react'
import t from 't-component'

function ChangeVote ({ handleClick }) {
  return (
    <div className=' change-vote text-center'>
      <a onClick={handleClick}>
        {t('proposal-options.change-vote')}
      </a>
    </div>
  )
}

export default ChangeVote
