export class AboutPageObject {
  get experienceContainer() {
    return cy.byDataTest('experience');
  }

  get workExperienceContainer() {
    return cy.byDataTest('work-experience');
  }

  get educationContainer() {
    return cy.byDataTest('education');
  }

  get contactsContainer() {
    return cy.byDataTest('contacts');
  }

  get skillsContainer() {
    return cy.byDataTest('skills');
  }

  get manifestoContainer() {
    return cy.byDataTest('manifesto');
  }
}
