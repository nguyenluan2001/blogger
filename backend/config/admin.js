module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '90dcfa6672331288bd1506bc61cbd7e7'),
  },
});
