module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        // client: 'sqlite',
        // filename: env('DATABASE_FILENAME', '.tmp/data.db'),
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'blogger'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'luandatabase'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
