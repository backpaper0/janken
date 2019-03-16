import { Pipe, PipeTransform } from '@angular/core';
import { Hand } from 'src/app/app.type';

const hands: { [key: string]: string; } = {
  GU: '✊',
  CHOKI: '✌️',
  PA: '🖐'
};

@Pipe({
  name: 'hand'
})
export class HandPipe implements PipeTransform {

  transform(value: Hand, args?: any): any {
    return hands[value];
  }
}
