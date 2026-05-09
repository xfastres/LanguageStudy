/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@linguaflow/telemetry',
    '@linguaflow/runtime-core',
    '@linguaflow/feature-space',
    '@linguaflow/comprehension',
    '@linguaflow/shared',
    '@linguaflow/database',
    '@linguaflow/logger',
  ],
}

module.exports = nextConfig
