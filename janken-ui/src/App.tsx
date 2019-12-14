import React, { useState } from 'react';

interface Hands {
	[key: string]: string;
}

interface Issues {
	[key: string]: string;
}

const hands: Hands = {
  GU: '✊',
  CHOKI: '✌️',
  PA: '🖐'
};

const issues: Issues = {
  WIN: '😄勝ち',
  DRAW: '🤔あいこ',
  LOSE: '😣負け'
};

const errorIcon: string = '😱';

const INIT: Symbol = Symbol('INIT');
const STARTED: Symbol = Symbol('STARTED');
const FINISHED: Symbol = Symbol('FINISHED');

export default () => {

  const [phase, setPhase] = useState<Symbol>(INIT);
  const [player, setPlayer] = useState<string>('GU');
  const [enemy, setEnemy] = useState<string>('GU');
  const [issue, setIssue] = useState<string>('DRAW');
  const [error, setError] = useState<boolean>(false);

  const janken: (hand: string) => Promise<void> = async hand => {
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
  };

  const reset: () => void = () => {
    setPhase(INIT);
    setError(false);
  };

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
};

interface HandButtonArgs {
	phase: Symbol;
	janken: (hand: string) => Promise<void>;
	hand: string;
}

const HandButton = ({ phase, janken, hand }: HandButtonArgs) => (
  <button className='hand-button' disabled={phase !== INIT} onClick={() => janken(hand)}>
    {hands[hand]}
  </button>
);

