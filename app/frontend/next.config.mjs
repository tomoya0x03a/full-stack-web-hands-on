/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://host.docker.internal:8000/api/:path*/',
            }
        ]
    },
    reactStrictMode: false
}

export default nextConfig;
