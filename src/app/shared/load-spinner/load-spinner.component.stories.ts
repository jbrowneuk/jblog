import { storiesOf } from '@storybook/angular';
import { NgModule } from '@angular/core';

import { LoadSpinnerComponent } from './load-spinner.component';

const moduleMetadata: NgModule = {
  declarations: [LoadSpinnerComponent]
};

storiesOf('Loading Spinner', module).add('Default', () => ({
  template: `
  <!-- Copied directly from index.html and wrapped -->
  <svg xmlns="http://www.w3.org/2000/svg" class="spritesheet">
    <symbol id="sitesheet-logo" viewBox="0 0 48 48">
      <path
        style="fill: currentColor;"
        d="m 24,0.349 c 4.60054,0 9.20113,0.3462 10.63892,1.0386 2.87559,1.3848
        12.55622,13.5243 13.26643,16.6359 0.71021,3.1117 -2.74489,18.2489
        -4.73485,20.7442 C 41.18053,41.2632 27.19165,48 24,48 20.80834,48
        6.81946,41.2632 4.82949,38.7677 2.83952,36.2724 -0.61556,21.1352
        0.09465,18.0235 0.80486,14.9119 10.48548,2.7724 13.36107,1.3876
        14.79886,0.6952 19.39946,0.349 24,0.349 Z m 16.89311,7.4878
        c -4.10858,1.3337 -7.43875,5.1383 -7.43875,8.8879 v 19.0318 c 0,3.6735
        -4.66377,2.6802 -7.34232,0 -2.21424,-2.2156 -5.13962,-3.0139
        -8.59798,-3.188 -1.61487,-0.081 -3.56593,0.8 -3.47793,3.2846
        0.0832,2.3501 2.44558,4.4443 3.28469,4.4443 1.88795,0 0.56269,-3.3814
        2.02861,-3.3814 4.10978,0 7.32786,3.1256 11.39976,3.3814 3.96006,0.2488
        7.43895,-3.8913 7.43895,-8.3085 V 12.6672 Z M 19.1564,8.0301
        c -3.11792,0 -10.55536,0.9873 -10.62701,5.2169 3.33369,-2.2917
        13.16868,0.2013 20.86732,-0.4831 v 6.9422 c -0.97262,0.5873
        -2.26056,-0.1411 -3.47792,0.9796 -0.69775,0.6424 -1.74341,3.4554
        -1.06262,4.444 0.30552,0.4436 2.89055,-2.1284 4.54054,-0.697 v 11.0342
        c 0,1.4356 1.83559,1.3437 1.83559,0 v -22.703 h 0.0966 c 0.71987,-2.4506
        5.87518,-3.039 6.37612,-4.5406 -2.06745,-0.2381 -3.46844,0.966
        -6.95585,0.966 -3.0401,0 -7.06843,-1.1592 -11.59279,-1.1592 z"
      />
    </symbol>
  </svg>
  <jblog-load-spinner></jblog-load-spinner>`,
  moduleMetadata
}));
