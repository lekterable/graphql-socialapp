import React from 'react'

import './footer.scss'

export default ({ content }) => {
	return (
		<div className="footer">
			<span className="footer__content">{content}</span>
		</div>
	)
}
