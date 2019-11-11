import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from 'src/app/app.type';

const issues: { [key: string]: string; } = {
  WIN: '😄勝ち',
  DRAW: '🤔あいこ',
  LOSE: '😣負け'
};

@Pipe({
  name: 'issue'
})
export class IssuePipe implements PipeTransform {

  transform(value: Issue, args?: any): any {
    return issues[value];
  }

}
