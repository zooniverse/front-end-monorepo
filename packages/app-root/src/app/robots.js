const appEnv = process.env.APP_ENV || "development";

export default function robots() {
  const isProduction = appEnv === "production";
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
