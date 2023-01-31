module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'dpg-ceq0mthgp3jlcsm4mi30-a.frankfurt-postgres.render.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'guitarla_luf6'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', 'i3Q4S8hx7R2VgeqF3joe4GdbPaJEs92C'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
