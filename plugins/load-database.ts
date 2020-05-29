import Vue from 'vue';
import alasql from 'alasql';

import database from '~/assets/data.json';

export default async function() {
  const db = new alasql.Database();

  // Create and load the video table
  await db.exec(
    'CREATE TABLE video (id STRING, title STRING, youtubeId STRING, series STRING);'
  );
  db.tables.video.data = database.video;

  // Create and load the series table
  await db.exec('CREATE TABLE series (id STRING, title STRING);');
  db.tables.series.data = database.series;

  // Attach the database to the Vue prototype so it is available everywhere
  Vue.prototype.$database = db;
}
