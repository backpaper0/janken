import { IssuePipe } from './issue.pipe';

describe('IssuePipe', () => {
  it('create an instance', () => {
    const pipe = new IssuePipe();
    expect(pipe).toBeTruthy();
  });

  it('transform win draw lose', () => {
    const pipe = new IssuePipe();
    expect(pipe.transform('WIN')).toBe('😄勝ち');
    expect(pipe.transform('DRAW')).toBe('🤔あいこ');
    expect(pipe.transform('LOSE')).toBe('😣負け');
  });

  it('transform other', () => {
    const pipe = new IssuePipe();
    expect(pipe.transform(<any>'OTHER')).toBeUndefined();
  });

  it('transform null', () => {
    const pipe = new IssuePipe();
    expect(pipe.transform(null)).toBeUndefined();
  });

  it('transform undefined', () => {
    const pipe = new IssuePipe();
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
