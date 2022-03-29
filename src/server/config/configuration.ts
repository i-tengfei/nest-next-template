export default () => ({
  prod: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
})
