import { Alert } from "./"

export default {
  component: Alert,
  title: 'Alert',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: 'Testing this alert!',
    isActive: true,
  }
}