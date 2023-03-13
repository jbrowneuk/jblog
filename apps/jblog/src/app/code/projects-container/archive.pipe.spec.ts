import { Project } from '../project';
import { ArchivedProjectFilterPipe } from './archive.pipe';

const mockProjects = [
  { archived: false } as Project,
  { archived: true } as Project
];

describe('Archived projects filter pipe', () => {
  it('should not show archived projects if argument is false', () => {
    const pipe = new ArchivedProjectFilterPipe();

    const result = pipe.transform(mockProjects, false);

    expect(result.length).not.toBe(mockProjects.length);
    result.forEach(p => expect(p.archived).toBe(false));
  });

  it('should show archived projects if argument is true', () => {
    const pipe = new ArchivedProjectFilterPipe();

    const result = pipe.transform(mockProjects, true);

    expect(result.length).toBe(mockProjects.length);
  });
});
