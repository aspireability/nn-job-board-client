import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import HomePage from './HomePage';
import { jobs } from '../mock_data/data';

export default {
  title: 'Aspire/Components/HomePage',
  component: HomePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = (args) => <HomePage {...args} />;

const onJobClick = (jobId: string) => console.log('job card clicked', jobId);

export const HomePageA = Template.bind({});
HomePageA.args = {
  jobs,
  onJobClick
};