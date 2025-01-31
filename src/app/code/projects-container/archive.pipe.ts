import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../project';

@Pipe({
    name: 'archivedProjects',
    standalone: false
})
export class ArchivedProjectFilterPipe implements PipeTransform {
  transform(input: Project[], showArchived?: boolean) {
    if (!input) {
      return [];
    }

    if (showArchived) {
      return input;
    }

    return input.filter(proj => !proj.archived);
  }
}
