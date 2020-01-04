import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

interface PropertyWrapper {
  name: string;
  value: string;
}

const propertyFilter = '--color-';

function extractVariablesFromSheet(
  stylesheet: CSSStyleSheet
): PropertyWrapper[] {
  const extractedProperties: PropertyWrapper[] = [];

  for (let ruleIndex = 0; ruleIndex < stylesheet.cssRules.length; ruleIndex++) {
    const cssRule = stylesheet.cssRules[ruleIndex] as CSSStyleRule;
    if (cssRule.selectorText !== ':root') {
      continue;
    }

    let css = cssRule.cssText.split('{');
    css = css[1].replace('}', '').split(';');

    for (const rule of css) {
      const [name, value] = rule.split(':');
      if (!name || !value || name.indexOf(propertyFilter) === -1) {
        continue;
      }

      extractedProperties.push({ name: name.trim(), value: value.trim() });
    }
  }

  return extractedProperties;
}

@Component({
  selector: 'jblog-design-colour',
  templateUrl: './colours.stories.html',
  styleUrls: ['./colours.stories.css']
})
class ColourComponent implements OnInit {
  public cssProperties: Map<string, PropertyWrapper[]>;
  public searchTerm: string;

  public get colorTypes(): string[] {
    return Array.from(this.cssProperties.keys());
  }

  ngOnInit() {
    const allProperties = this.extractCustomColours();
    allProperties.sort((a, b) => a.name.localeCompare(b.name));

    const generic = allProperties.filter(
      p =>
        !p.name.includes('foreground') &&
        !p.name.includes('background') &&
        !p.name.includes('border')
    );
    const foregrounds = allProperties.filter(p =>
      p.name.includes('foreground')
    );
    const backgrounds = allProperties.filter(p =>
      p.name.includes('background')
    );
    const borders = allProperties.filter(p => p.name.includes('border'));

    const sortedProps = new Map<string, PropertyWrapper[]>();
    sortedProps.set('Generic', generic);
    sortedProps.set('Foregrounds (text)', foregrounds);
    sortedProps.set('Backgrounds', backgrounds);
    sortedProps.set('Borders', borders);

    this.cssProperties = sortedProps;
  }

  public getPropertiesForType(type: string): PropertyWrapper[] {
    const allProps = this.cssProperties.get(type);
    if (this.searchTerm && this.searchTerm.length > 0) {
      return allProps.filter(p => p.name.includes(this.searchTerm));
    }

    return allProps;
  }

  private extractCustomColours(): PropertyWrapper[] {
    let allProperties: PropertyWrapper[] = [];

    for (let index = 0; index < document.styleSheets.length; index++) {
      try {
        const styleSheet = document.styleSheets.item(index) as CSSStyleSheet;
        if (!styleSheet.cssRules) {
          continue;
        }

        const sheetProperties = extractVariablesFromSheet(styleSheet);
        allProperties = allProperties.concat(sheetProperties);
      } catch {
        // Ignore sheet
        continue;
      }
    }

    return allProperties;
  }
}

storiesOf('Guidelines|Design', module).add('Colour', () => ({
  component: ColourComponent,
  moduleMetadata: {
    imports: [FormsModule]
  }
}));
