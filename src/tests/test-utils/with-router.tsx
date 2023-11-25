import { Url } from 'next/dist/shared/lib/router/router';
import { NextRouter } from 'next/router';
import { vi } from 'vitest';
const updatePath = (url: Url) => {
  mockRouter.query = {};
  if (typeof url === 'string') {
    mockRouter.pathname = url;
  } else {
    mockRouter.pathname = url.pathname || mockRouter.pathname;
    if (typeof url.query === 'object' && url !== null && url.query !== null) {
      Object.entries(url.query).forEach(([key, value]) => {
        mockRouter.query[key.toString()] = value?.toString();
      });
    }
  }
};

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  forward: vi.fn(),
  push: vi.fn((url: Url) => {
    updatePath(url);
    return Promise.resolve(true);
  }),
  replace: vi.fn((url: Url) => {
    updatePath(url);
    return Promise.resolve(true);
  }),
  reload: vi.fn(() => Promise.resolve(true)),
  back: vi.fn(),
  prefetch: vi.fn().mockResolvedValue(true),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  isReady: true,
};
