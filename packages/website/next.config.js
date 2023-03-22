const UnoCSS = require("@unocss/webpack").default;
const presetUno = require("@unocss/preset-uno").default;

const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
  options: { providerImportSource: "@mdx-js/react" },
});

// * --------------------------------

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack(config, { dev, isServer }) {
    config.plugins.push(UnoCSS({ presets: [presetUno()] }));

    config.cache = { type: "memory", cacheUnaffected: true };

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: { and: [/\.(js|ts)x?$/] },
    //   use: ["@svgr/webpack"],
    // });

    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     "react": "preact/compat",
    //     "react-dom/test-utils": "preact/test-utils",
    //     "react-dom": "preact/compat",
    //   });
    // }

    return config;
  },

  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

// * ------------------------------------------------

module.exports = withMDX(nextConfig);
