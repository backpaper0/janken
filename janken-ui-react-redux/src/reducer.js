const SET_PHASE = 'SET_PHASE';
const SET_PLAYER = 'SET_PLAYER';
const SET_ENEMY = 'SET_ENEMY';
const SET_ISSUE = 'SET_ISSUE';
const SET_ERROR = 'SET_ERROR';

const initialState = {
  phase: null,
  player: 'GU',
  enemy: 'GU',
  issue: 'DRAW',
  error: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PHASE:
        return { ...state, phase: payload };
    case SET_PLAYER:
        return { ...state, player: payload };
    case SET_ENEMY:
        return { ...state, enemy: payload };
    case SET_ISSUE:
        return { ...state, issue: payload };
    case SET_ERROR:
        return { ...state, error: payload };
    default:
        return state;
  }
};

export const setPhase = payload => ({ type: SET_PHASE, payload });
export const setPlayer = payload => ({ type: SET_PLAYER, payload });
export const setEnemy = payload => ({ type: SET_ENEMY, payload });
export const setIssue = payload => ({ type: SET_ISSUE, payload });
export const setError = payload => ({ type: SET_ERROR, payload });

