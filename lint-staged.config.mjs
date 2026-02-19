export default {
  '*.ts': ['prettier --write', 'eslint --fix'],
  '*.{mjs,cjs}': ['prettier --write', 'eslint --fix'],
  '*.{js,json,md,yml,yaml}': ['prettier --write'],
}
