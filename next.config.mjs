import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
});

export default withPWAConfig({
  images: {
    unoptimized: true,
  },
});
