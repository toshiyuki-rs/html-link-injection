import fs from 'fs'
import path from 'path'

fs.copyFileSync(
  path.join(__dirname, '../src/option-schema.json'), 
  path.join(__dirname, '../dist/umd/option-schema.json'))

fs.copyFileSync(
  path.join(__dirname, '../src/option-schema.json'), 
  path.join(__dirname, '../dist/esnext/option-schema.json'))

// vi: se ts=2 sw=2 et: 
