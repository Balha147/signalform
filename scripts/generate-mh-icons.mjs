#!/usr/bin/env node
// Génère `_mh-icons.generated.scss` et `mh-icon.type.ts`
// à partir du fichier projet IcoMoon (export "selection.json").
//
// Usage : node scripts/generate-mh-icons.mjs

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Source unique : le fichier projet exporté depuis IcoMoon.
const SOURCE_ICOMOON_JSON = `${__dirname}/../src/assets/icons/dsicon.json`;
const OUTPUT_SCSS = `${__dirname}/../src/styles/icons/_mh-icons.generated.scss`;
const OUTPUT_TS = `${__dirname}/../src/app/shared/icons/mh-icon.type.ts`;

const GENERATED_HEADER =
    '// ⚠️ FICHIER GÉNÉRÉ AUTOMATIQUEMENT — NE PAS ÉDITER À LA MAIN.\n' +
    '// Source : src/assets/icons/dsicon.json (export projet IcoMoon)\n' +
    '// Régénérer avec : npm run icons:generate\n';

function loadIcons() {
    const raw = readFileSync(SOURCE_ICOMOON_JSON, 'utf-8');
    const project = JSON.parse(raw);

    const prefix = project.preferences?.fontPref?.prefix ?? 'mhicon-';
    const fontFamily = project.preferences?.fontPref?.metadata?.fontFamily ?? project.metadata?.name;

    if (!fontFamily) {
        throw new Error('Impossible de déterminer le "fontFamily" depuis le fichier IcoMoon.');
    }

    const icons = {};
    for (const entry of project.icons) {
        const name = `${prefix}${entry.properties.name}`;
        const codepoint = entry.properties.code.toString(16); // decimal -> hex
        icons[name] = codepoint;
    }

    const names = Object.keys(icons);
    if (names.length === 0) {
        throw new Error('Aucune icône trouvée dans le fichier IcoMoon.');
    }

    return { icons, fontFamily };
}

function generateScss(icons, fontFamily) {
    const rules = Object.entries(icons)
        .map(([name, codepoint]) => `  .${name}::before {\n    content: '\\${codepoint}';\n  }`)
        .join('\n\n');

    return `${GENERATED_HEADER}
@font-face {
  font-family: '${fontFamily}';
  src: url('/assets/fonts/ds-icon.eot');
  src: url('/assets/fonts/ds-icon.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/ds-icon.woff') format('woff'),
       url('/assets/fonts/ds-icon.ttf') format('truetype'),
       url('/assets/fonts/ds-icon.svg#${fontFamily}') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^='mhicon-'],
[class*=' mhicon-'] {
  font-family: '${fontFamily}' !important;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  speak: never;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

${rules}
`;
}

function generateTypeScript(icons) {
    const names = Object.keys(icons);
    const union = names.map(name => `  | '${name}'`).join('\n');

    return `${GENERATED_HEADER}
export type MhIconName =
${union};

export const MH_ICON_NAMES: readonly MhIconName[] = [
${names.map(name => `  '${name}'`).join(',\n')}
] as const;
`;
}

function ensureDir(filePath) {
    mkdirSync(dirname(filePath), { recursive: true });
}

function main() {
    const { icons, fontFamily } = loadIcons();

    ensureDir(OUTPUT_SCSS);
    writeFileSync(OUTPUT_SCSS, generateScss(icons, fontFamily), 'utf-8');

    ensureDir(OUTPUT_TS);
    writeFileSync(OUTPUT_TS, generateTypeScript(icons), 'utf-8');

    console.log(`✓ ${Object.keys(icons).length} icônes générées (police "${fontFamily}") :`);
    console.log(`  - ${OUTPUT_SCSS}`);
    console.log(`  - ${OUTPUT_TS}`);
}

main();