import Header from '@/presentation/components/Header.vue';

import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()


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
  
  test('should not show back button if user is unlogged', async () => {
    const wrapper = mount(Header, {
      propsData: {
        isLoggedUser: false,
      },
    });

    const hasBackButton = wrapper.find('.header__back-button').exists();

    expect(hasBackButton).toBe(false);
  });
  
  test('should show login button if user is unlogged', async () => {
    const wrapper = mount(Header, {
      propsData: {
        isLoggedUser: false,
      },
    });

    const hasLoginButton = wrapper.find('.header__login-button').exists();

    expect(hasLoginButton).toBe(true);
  });
  
  test('should show logo if user is logged and current route is homepage', async () => {
    const wrapper = mount(Header, {
      localVue,
      router,
      propsData: {
        isLoggedUser: true,
        isHomePage: true,
      },
    });

    const hasLogo = wrapper.find('.header__logo').exists();

    expect(hasLogo).toBe(true);
  });
  
  test('should not show logo if user is unlogged', async () => {
    const wrapper = mount(Header, {
      localVue,
      router,
      propsData: {
        isLoggedUser: false,
        isHomePage: true,
      },
    });

    const hasLogo = wrapper.find('.header__logo').exists();

    expect(hasLogo).toBe(false);
  });
  
  test('should not show logo if current route is not homepage', async () => {
    const wrapper = mount(Header, {
      localVue,
      router,
      propsData: {
        isLoggedUser: true,
        isHomePage: false,
      },
    });

    const hasLogo = wrapper.find('.header__logo').exists();

    expect(hasLogo).toBe(false);
  });
});
