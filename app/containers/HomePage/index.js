/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DropTarget } from 'react-dnd';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import DraggableBlock from '../../components/DraggableBlock';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername, dropDraggable } from './actions';
import { DRAGGABLE } from './constants';
import { makeSelectDnd, makeSelectUsername } from './selectors';
import { dragReducer, homeReducer } from './reducer';
import saga, { dndSaga } from './saga';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { connectDropTarget, items, loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article ref={connectDropTarget}>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="A React.js Boilerplate application homepage"
          />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <DraggableBlock
              id="1"
              color="red"
              top={items[1].top}
              left={items[1].left}
            />
            <DraggableBlock
              id="2"
              color="green"
              top={items[2].top}
              left={items[2].left}
            />
            <DraggableBlock
              id="3"
              color="blue"
              top={items[3].top}
              left={items[3].left}
            />
          </Section>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <ReposList {...reposListProps} />
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onDropDraggable: (id, top, left) =>
      dispatch(dropDraggable({ id, top, left })),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  items: makeSelectDnd(),
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const draggableTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    const position = monitor.getSourceClientOffset();

    if (position) {
      const { x: left, y: top } = position;
      props.onDropDraggable(item.id, top, left);
    }
  },
};

function collect(con, monitor) {
  return {
    connectDropTarget: con.dropTarget(),
    isOver: monitor.isOver(),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withHomeReducer = injectReducer({ key: 'home', reducer: homeReducer });
const withDndReducer = injectReducer({ key: 'dnd', reducer: dragReducer });
const withSaga = injectSaga({ key: 'home', saga });
const withDndSaga = injectSaga({ key: 'dnd', saga: dndSaga });
const withDropTarget = DropTarget(DRAGGABLE, draggableTarget, collect);

export default compose(
  withHomeReducer,
  withDndReducer,
  withSaga,
  withDndSaga,
  withConnect,
  withDropTarget,
)(HomePage);
