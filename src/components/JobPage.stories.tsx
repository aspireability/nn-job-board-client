import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import JobPage from './JobPage';
import { example } from '../mock_data/data';

export default {
  title: 'Aspire/Components/JobPage',
  component: JobPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof JobPage>;

const Template: ComponentStory<typeof JobPage> = (args) => <JobPage {...args} />;

export const JobPageA = Template.bind({});
JobPageA.args = {
    job: example,
};