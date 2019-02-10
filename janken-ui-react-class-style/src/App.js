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

const INIT = Symbol('INIT');
const STARTED = Symbol('STARTED');
const FINISHED = Symbol('FINISHED');

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      phase: INIT,
      player: 'GU',
      enemy: 'GU',
      issue: 'DRAW'
    };
  }

  async janken(hand) {
    this.setState({ phase: STARTED });
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ player: hand });
    const res = await fetch('/api/janken', { method: 'POST', headers, body });
    const { player, enemy, issue } = await res.json();
    this.setState({ phase: FINISHED, player, enemy, issue });
  }

  reset() {
    this.setState({ phase: INIT });
  }

  render() {
    const { phase, player, enemy, issue } = this.state;
    const janken = this.janken.bind(this);
    const reset = this.reset.bind(this);
    return (
      <div className='root'>
        <p>じゃんけん……</p>
        <p className={false}>
          <HandButton phase={phase} janken={janken} hand={'GU'}/>
          <HandButton phase={phase} janken={janken} hand={'CHOKI'}/>
          <HandButton phase={phase} janken={janken} hand={'PA'}/>
          <button className='reset-button' disabled={phase !== FINISHED} onClick={() => reset()}>もう一回</button>
        </p>
        <p className={phase === INIT && 'hidden'}>ぽん！</p>
        <div className={phase !== FINISHED && 'hidden'}>
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

