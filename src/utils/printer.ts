function info(message: unknown) {
  console.log(`[INFO]: ${message}`);
}

function warn(message: unknown) {
  console.log(`[WARN]: ${message}`);
}

function error(message: unknown) {
  console.error("[ERROR]: 알 수 없는 오류가 발생했습니다:");
  console.error(message + "");
}

export default {
  info,
  warn,
  error,
};
