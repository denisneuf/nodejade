var config = {};

config.twitter = {};
config.redis = {};
config.web = {};

config.default_stuff =  ['red','green','blue','apple','yellow','orange','politics'];
config.twitter.user_name = process.env.TWITTER_USER || 'username';
config.twitter.password=  process.env.TWITTER_PASSWORD || 'password';
config.redis.uri = process.env.DUOSTACK_DB_REDIS;
config.redis.host = 'hostname';
config.redis.port = 6379;
config.web.port = process.env.WEB_PORT || 9980;

config.mongodb = {};
config.mongodb.db = "dbo594553846";
config.mongodb.ds = "ds027345";

config.mongodb.port = "27345";
config.mongodb.user = "usr600572416";
config.mongodb.password = "myxs4all";

module.exports = config;