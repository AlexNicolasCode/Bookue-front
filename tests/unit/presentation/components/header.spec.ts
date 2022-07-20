import Header from '@/presentation/components/Header.vue';

import { mount } from '@vue/test-utils';

describe('Header', () => {
  test('should show back button if user is logged', async () => {
    const wrapper = mount(Header, {
      propsData: {
        isLoggedUser: true,
      },
    });

    const hasBackButton = wrapper.find('.header__back-button').exists();

    expect(hasBackButton).toBe(true);
  });
});
