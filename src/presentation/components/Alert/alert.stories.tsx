import { Alert } from "./"

export default {
  component: Alert,
  title: 'Alert',
  tags: ['autodocs'],
};

export const Error = {
  args: {
    children: 'Testing this alert!',
    isActive: true,
    type: 'error',
  }
}

export const Succeds = {
  args: {
    children: 'Testing this alert!',
    isActive: true,
    type: 'succeds',
  }
}