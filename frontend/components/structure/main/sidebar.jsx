import React from 'react';
import { connect } from 'react-redux';
import { fetchRecentUserIds } from "../../../actions/session_actions";
import RecentUser from './recent_user';

class SideBar extends React.Component {

  componentDidMount() {
    this.props.fetchRecentUserIds();
  }

  render() {
    const { ids } = this.props;
    if (!ids ) return null;

    const users = ids.map(id => (
      <RecentUser key={`recent-user-${id}`} id={id} />
    ));
    
    return (
      <aside className='feed'>
        <h3>Recent Users</h3>
        <section>
          {users}
        </section>
        <h3>Most Commented</h3>
        <section>
          {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda vitae deserunt quas provident. Necessitatibus, earum, fuga, rerum nihil debitis perferendis non quos deleniti atque pariatur vel beatae. Labore, totam! Numquam.</p> */}
        </section>
      </aside>
    )
  }
}

const mstp = state => ({
  ids: state.entities.users.recentIds
})

const mdtp = dispatch => ({
  fetchRecentUserIds: () => dispatch(fetchRecentUserIds())
})

export default connect(
  mstp,
  mdtp
)(SideBar);