const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
            ...config.resolve.alias,
            next: path.resolve(path.join(__dirname, './node_modules/next'))
        }
    }
}

module.exports = nextConfig
