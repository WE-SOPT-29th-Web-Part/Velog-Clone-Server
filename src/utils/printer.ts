function info(message: unknown) {
  console.log(`[INFO]: ${message}`);
}

function warn(message: unknown) {
  console.log(`[WARN]: ${message}`);
}

function error(message: unknown) {
  console.error(`[ERROR]: ${message}`);
}

export default {
  info,
  warn,
  error,
};
