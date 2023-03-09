import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import JobCard from './JobCard';
import { example } from '../mock_data/data';

export default {
  title: 'Aspire/Components/JobCard',
  component: JobCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof JobCard>;

const Template: ComponentStory<typeof JobCard> = (args) => <JobCard {...args} />;

export const JobCardA = Template.bind({});
JobCardA.args = {
    job: example,
};