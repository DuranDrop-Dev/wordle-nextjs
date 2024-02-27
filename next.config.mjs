/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.public.blob.vercel-storage.com',
          port: '',
        },
        {
          hostname: 'lh3.googleusercontent.com',
        },
        {
          hostname: 'res.cloudinary.com',
        }
      ],
    },
  };

export default nextConfig;
