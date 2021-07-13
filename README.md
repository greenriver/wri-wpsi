# README

This is the main repo for the Water, Peace and Security web app.

[![Build Status](https://travis-ci.com/greenriver/wri-wpsi.svg?token=EQywZqAdUXLYyppSoTji&branch=production)](https://travis-ci.com/greenriver/wri-wpsi)
[![Heroku](https://img.shields.io/badge/heroku-wri--wpsi-8967B1)](https://dashboard.heroku.com/apps/wri-wpsi)

## Ruby version

See [.ruby-version](/.ruby-version) definition.

## System dependencies

See [Gemfile](/Gemfile) and [package.json](/package.json).

You also need chromedriver in order to run tests. Try `brew cask install chromedriver`.
You will need to update chromedriver when you update chrome (`brew cask upgrade chromedriver`).

## Setup

* `bundle` to install ruby gems.
* `yarn` to install node modules.
* `rake db:create db:migrate db:test:prepare` to initialize the databases.
* `bin/ci-build` to run all tests and checks.
* `foreman start -f Procfile.dev` to run the app locally.
* `rake db:fixtures:load` to fill the app with realistic layers and categories.

## Linting

Ruby code is linted by `rubocop` and JS code is linted by `eslint`. Both are run and enforced automatically when you try to commit new changes via `overcommit`. You may need to run `overcommit --install` the first time to get this to work.

## Testing

* `bin/ci-build` runs code audits and the test suite and is what TravisCI runs. Check it out for things you might test locally.
  * Use `rails test` to run ruby unit tests.
  * Use `rails test:system` to run ruby system tests.
  * Run system tests with `DEBUG_CHROME=1` to watch them execute in real time.
  * Use `yarn test` to run JS tests with Jest.

### Jest tests

Jest tests will fail whenever a snapshot becomes out of date. This does not mean there is something wrong with the code! It is an opportunity to check if the output of our abstracted HTML-generating code changed in the way that we intended.

If the changes all look good, update the failing snapshots by running `yarn test -u`.

## Deploying

Staging is deployed to heroku at `https://git.heroku.com/wri-wpsi.git`. Run `git push heroku staging:main` to deploy the staging branch there.

Production is deployed to a `Ubuntu 18.04.3 LTS` server at IHE Delft. Run `cap production deploy` to deploy there. Consult
`config/deploy/production.rb` for where that is. You will need to get your credentials set up by a current deployer.
You will also need to be on the office network in order to connect.

`capistrano` tasks for starting and stopping the services are set up per https://github.com/seuros/capistrano-puma.  All necessary services are manageable via systemd and enabled on boot.

#### Services

```
* puma.service - puma for production
   Loaded: loaded (/etc/systemd/system/puma.service; enabled; vendor preset: enabled)
* nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
* postgresql.service - PostgreSQL RDBMS
   Loaded: loaded (/lib/systemd/system/postgresql.service; enabled; vendor preset: enabled)
```

#### Host Info

```
$ cat /proc/cpuinfo | grep CPU
model name  : Intel(R) Xeon(R) CPU E5-2667 v3 @ 3.20GHz
model name  : Intel(R) Xeon(R) CPU E5-2667 v3 @ 3.20GHz
$ free -h
              total
Mem:           3.9G ....
```

## Exception monitoring

Exceptions are monitored via [sentry.io](https://sentry.io/organizations/green-river/issues/?project=1484102).

## Widgets

### Importing widget data from the CSV data table

All widget data is loaded into the app's database for easier access and exposed via a simple API ([see below](#using-the-widget-api)). To load the data, use the [`import:widget_datapoints` rake task](/lib/tasks/import.rake):

1. Download the CSV file to the computer where you are running the rake task

2. Run the task with the path to the file as a parameter, something like:

```
rake 'import:widget_datapoints[/Users/lucas/Downloads/data_final_inputs_Y2020M12_temp_Y2020M12_temp_tool_inputs.csv]'
```

In order to copy the CSV into the production database, you will need to specify the environment like this:

```bash
cd ~/current && RAILS_ENV=production bundle exec rake 'import:widget_datapoints[/home/amichal/csvs/data_final_inputs_Y2020M12_temp_Y2020M12_temp_tool_inputs.csv]'
```

(Takes about 1 to 2 minutes)

### Writing widget specifications

The app accepts [standard vega chart specifications](https://vega.github.io/vega/docs/specification/) with just one additional feature. If the spec includes a value for `data.urlTemplate` it will set `data.url` based on that template, substituting in the currently selected region id for any occurrences of the string `${region.gid_2}`.

This is intended for use with the single-endpoint widget data API (see below).

### Using the widget API

| Method | URL                                                  | Description
|--------|------------------------------------------------------|------------
| GET    | api/v1/widget_datapoints/`region_id`/`variable`/     | Returns all datapoints for the given `region_id` and `variable`:<ul><li>`region_id` should be a gid_2 like `NGA.21.9_1`</li><li>`variable` should be an identifier for one of the model variables, matching [one of the headers from the data csv](/db/schema.rb#L64-L138).</li></ul>

The api returns JSON containing an array of "data points". Each datapoint has the following fields:

* gid_2
* month_indep
* year
* `variable` (whatever variable was specified in the request)

Here is an example query and its result:

```JSON
// https://waterpeacesecurity.org/api/v1/widget_datapoints/NGA.21.9_1/gid_0/

{
  "widget_datapoints": [
    {
      "gid_2": "NGA.21.9_1",
      "month_indep": "2000-01-01",
      "year": 2000,
      "gid_0": "NGA"
    },
    {
      "gid_2": "NGA.21.9_1",
      "month_indep": "2000-02-01",
      "year": 2000,
      "gid_0": "NGA"
    },
    {
      "gid_2": "NGA.21.9_1",
      "month_indep": "2000-03-01",
      "year": 2000,
      "gid_0": "NGA"
    },
  ]
}
```
