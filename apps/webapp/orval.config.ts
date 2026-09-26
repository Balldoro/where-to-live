import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: '../backend/openapi.json',
    output: {
      target: 'src/lib/api.gen.ts',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        fetch: { forceSuccessResponse: true, includeHttpResponseReturnType: false },
      },
    },
  },
});
