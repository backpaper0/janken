import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from './App';
import * as actionCreators from './reducer';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...actionCreators
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
