import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql}  from 'react-apollo';

class LyricList extends Component {
	onLike(id, likes) {
		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					__typename: 'LyricType',
					id,
					likes: likes + 1
				}
			}
		});
	}

	renderLyrics() {
		return this.props.lyrics.map(({ id, content, likes }) => {
			return (
				<li className="collection-item" key={id}>
					{content} ({likes})
					<i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
				</li>
			)
		})
	}

	render () {
		return (
			<ul className="collection">
				{this.renderLyrics()}
			</ul>
		)
	}
}

const mutation = gql`
	mutation LikeLyric($id: ID) {
		likeLyric(id: $id) {
			id
			likes
		}
	}
`;

export default graphql(mutation)(LyricList);