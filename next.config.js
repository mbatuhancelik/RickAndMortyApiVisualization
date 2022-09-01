module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/locations',
          permanent: true,
        },
      ]
    },
  }