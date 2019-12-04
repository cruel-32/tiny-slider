import { configure, addParameters } from '@storybook/react';

addParameters({
  backgrounds: [
    { name: 'white', value: '#fff', default: true },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' },
  ],
});

// should be before configure()

configure(require.context('../src/stories', true, /\.stories\.js$/), module);