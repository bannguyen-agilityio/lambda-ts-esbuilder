import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

/**
 * Modern ESLint flat config for TypeScript projects
 * Compatible with ESLint v9+ and Node.js 18+
 */
export default tseslint.config(
  // Ignore common output + dependency folders
  {
    ignores: ['dist', 'node_modules', '.cache'],
  },

  // Apply to all .ts files
  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json', // enable type-aware linting
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      // TypeScript best practices
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',

      // General JS rules
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // Style & formatting (Prettier handles formatting)
      ...prettier.rules,
    },
  },

  // Apply Prettier last to disable conflicting rules
  prettier
);
