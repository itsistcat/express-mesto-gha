const SECRET_SIGNING_KEY = 'eyJ1c2VySWQiOiI2NTM5MzRiNDJhNWI3NTQ5YjBhOWVlMTMiLCJpYXQiOjE2OTgyNDc4NzYsImV4cCI6MTY5ODg1MjY3Nn0';

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  SECRET_SIGNING_KEY,
  URL_REGEX,
};
