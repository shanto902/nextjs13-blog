export const devOnly = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      redirect: {
        permanent: false,
        destination: "/under-development",
      },
    };
  }

  return { props: {} };
};
