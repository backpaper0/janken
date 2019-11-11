import { HandPipe } from './hand.pipe';

describe('HandPipe', () => {
  it('create an instance', () => {
    const pipe = new HandPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform gu choki pa', () => {
    const pipe = new HandPipe();
    expect(pipe.transform('GU')).toBe('✊');
    expect(pipe.transform('CHOKI')).toBe('✌️');
    expect(pipe.transform('PA')).toBe('🖐');
  });

  it('transform other', () => {
    const pipe = new HandPipe();
    expect(pipe.transform(<any>'OTHER')).toBeUndefined();
  });

  it('transform null', () => {
    const pipe = new HandPipe();
    expect(pipe.transform(null)).toBeUndefined();
  });

  it('transform undefined', () => {
    const pipe = new HandPipe();
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
