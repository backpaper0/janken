import { Component } from '@angular/core';
import { JankenService } from 'src/app/service/janken.service';
import { Hand } from 'src/app/app.type';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  errorIcon = '😱';

  constructor(private jankenService: JankenService) {
  }

  get playerHand() {
    return this.jankenService.player;
  }

  get enemyHand() {
    return this.jankenService.enemy;
  }

  get issue() {
    return this.jankenService.issue;
  }

  get isDisabledHandButton() {
    return !this.jankenService.isInitPhase();
  }

  get isDisabledResetButton() {
    return !this.jankenService.isFinishedPhase();
  }

  get isVisiblePon() {
    return !this.jankenService.isInitPhase();
  }

  get hasResult() {
    return this.jankenService.isFinishedPhase() && !this.jankenService.hasError();
  }

  get hasError() {
    return this.jankenService.isFinishedPhase() && this.jankenService.hasError();
  }

  onClickHandButton(hand: Hand) {
    this.jankenService.janken(hand);
  }

  onClickResetButton() {
    this.jankenService.reset();
  }
}
