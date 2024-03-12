import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'learningModeIcon'
})
export class LearningModeIconPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 1:
        return '🖥️';
      case 2:
        return '🧑‍🏫';
      default:
        return '';
    }
  }

}
