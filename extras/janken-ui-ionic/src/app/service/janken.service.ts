import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phase } from 'src/app/enum/phase.enum';
import { Hand, Issue } from 'src/app/app.type';

interface JankenRes {
  player: Hand;
  enemy: Hand;
  issue: Issue;
}

@Injectable({
  providedIn: 'root'
})
export class JankenService {

  private phase = Phase.INIT;
  private error = false;

  player: Hand = 'GU';
  enemy: Hand = 'GU';
  issue: Issue = 'DRAW';

  constructor(private http: HttpClient) { }

  async janken(hand: string) {
    this.phase = Phase.STARTED;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ player: hand });
    try {
      const res = await this.http.post<JankenRes>(
        '/api/janken', body, { headers: headers}).toPromise();
      const { player, enemy, issue } = res;
      this.phase = Phase.FINISHED;
      this.player = player;
      this.enemy = enemy;
      this.issue = issue;
    } catch (e) {
      this.phase = Phase.FINISHED;
      this.error = true;
    }
  }

  reset = () => {
    this.phase = Phase.INIT;
    this.error = false;
  }

  isInitPhase() {
    return this.phase === Phase.INIT;
  }

  isStartedPhase() {
    return this.phase === Phase.STARTED;
  }

  isFinishedPhase() {
    return this.phase === Phase.FINISHED;
  }

  hasError() {
    return this.error;
  }
}
