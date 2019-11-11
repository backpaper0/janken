import React, { useState } from 'react';

const hands = {
  GU: '✊',
  CHOKI: '✌️',
  PA: '🖐'
};

const issues = {
  WIN: '😄勝ち',
  DRAW: '🤔あいこ',
  LOSE: '😣負け'
};

const errorIcon = '😱';

const INIT = Symbol('INIT');
const STARTED = Symbol('STARTED');
const FINISHED = Symbol('FINISHED');

export default class App extends React.Component {

  componentDidMount() {
    const { setPhase } = this.props;
    setPhase(INIT);
  }

  async janken(hand) {
    const { setPhase, setPlayer, setEnemy, setIssue, setError } = this.props;
    setPhase(STARTED);
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ player: hand });
    const res = await fetch('/api/janken', { method: 'POST', headers, body });
    if (res.ok) {
      const { player, enemy, issue } = await res.json();
      setPhase(FINISHED);
      setPlayer(player);
      setEnemy(enemy);
      setIssue(issue);
    } else {
      setPhase(FINISHED);
      setError(true);
    }
  }

  reset() {
    const { setPhase, setError } = this.props;
    setPhase(INIT);
    setError(false);
  }

  render() {
    const { phase, player, enemy, issue, error } = this.props;
    const janken = this.janken.bind(this);
    const reset = this.reset.bind(this);
    return (
      <div className='root'>
        <p>じゃんけん……</p>
        <p>
          <HandButton phase={phase} janken={janken} hand={'GU'}/>
          <HandButton phase={phase} janken={janken} hand={'CHOKI'}/>
          <HandButton phase={phase} janken={janken} hand={'PA'}/>
          <button className='reset-button' disabled={phase !== FINISHED} onClick={() => reset()}>もう一回</button>
        </p>
        <p className={phase === INIT ? 'hidden' : ''}>ぽん！</p>
        <div className={phase !== FINISHED || error ? 'hidden' : ''}>
          <p className='hand'>
            あなたは
            <span>{hands[player]}</span>
          </p>
          <p className='hand'>
            相手は
            <span>{hands[enemy]}</span>
          </p>
          <p className='issue'>
            {issues[issue]}
          </p>
        </div>
        <div className={phase !== FINISHED || error === false ? 'hidden' : ''}>
          <p className='error'>
            通信エラー
            {errorIcon}
          </p>
        </div>
      </div>
    );
  }
}

class HandButton extends React.Component {
  render() {
    const { phase, janken, hand } = this.props;
    return (
      <button className='hand-button' disabled={phase !== INIT} onClick={() => janken(hand)}>
        {hands[hand]}
      </button>
    );
  }
}

