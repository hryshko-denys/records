export default () => {
  const config = useRuntimeConfig();

  let url =
    config.public.productionSite ?? // Set this to your site URL in production env.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  console.log('redirect to url' , url)
  return url;
};
