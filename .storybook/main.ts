import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
  ],
  docs: {
    autodocs: true,
  },
  viteFinal: async (config, { configType }) => {
    return mergeConfig(config, {
      css: {
        modules: {
          //localsConvention: 'camelCaseOnly', // optional, use your preference//dashes/camelCaseOnly
          //styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
        },
        preprocessorOptions: {
          scss: {
            // optionally include global SCSS variables, mixins, etc.
            // example:
            // additionalData: `@use "@/styles/tokens/_tokens.scss" as *;`
          },
        },
      },
    });
  },
};

export default config;
