import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { visionTool } from '@sanity/vision';
import { defineConfig, type WorkspaceOptions } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { resolve } from './presentation/resolve';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';

// One Studio, one workspace per dataset. Each workspace's Presentation tool
// loads the preview deployment that reads the same dataset; without one set
// it falls back to a local `npm run dev`.
function workspace(
  dataset: string,
  title: string,
  previewOrigin: string | undefined,
): WorkspaceOptions {
  return {
    name: dataset,
    title,
    basePath: `/${dataset}`,
    projectId: 'jrhcct5b',
    dataset,
    plugins: [
      structureTool({ structure }),
      presentationTool({
        resolve,
        previewUrl: {
          origin: previewOrigin ?? 'http://localhost:4321',
          previewMode: { enable: '/api/preview/enable' },
        },
      }),
      codeInput(),
      table(),
      visionTool(),
    ],
    schema: { types: schemaTypes },
  };
}

export default defineConfig([
  workspace(
    'production',
    'Shorebird',
    process.env.SANITY_STUDIO_PREVIEW_ORIGIN_PRODUCTION,
  ),
  workspace(
    'dev',
    'Shorebird (dev)',
    process.env.SANITY_STUDIO_PREVIEW_ORIGIN_DEV,
  ),
]);
