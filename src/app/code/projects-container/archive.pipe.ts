import { PipeTransform, Pipe } from '@angular/core';
import { Project } from '../project';

@Pipe({
  name: 'archivedProjects'
})
export class ArchivedProjectFilterPipe implements PipeTransform {
  transform(input: Project[], args?: any) {
    if (!input) {
      return [];
    }

    if (args) {
      return input;
    }

    return input.filter(proj => !proj.archived);
  }
}
