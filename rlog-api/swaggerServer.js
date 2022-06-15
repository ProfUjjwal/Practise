const Koa = require('koa');
const { koaSwagger } = require('koa2-swagger-ui');
const app = new Koa();
const yamljs = require('yamljs');
const spec = yamljs.load('./swagger.yaml');
app.use(
  koaSwagger({
    routePrefix: '/swagger',
    swaggerOptions: { spec },
  }),
);
app.listen(3000);