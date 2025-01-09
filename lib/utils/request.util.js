/**
 * 주어진 객체에서 빈 속성(값이 `null`, `undefined`, `""`인 속성)을 제거한 새로운 객체를 반환합니다.
 * 숫자 `0` 및 불리언 `false`는 유효한 값으로 간주되므로 제외되지 않습니다.
 *
 * @param {object} object - 빈 속성을 제거할 일차원 쿼리 객체.
 * @returns {object} 빈 속성이 제거된 새로운 객체.
 */
export function filterEmptyQuery(object) {
  let query = {};

  Object.keys(object).forEach((key) => {
    if (object[key] || object[key] === 0 || object[key] === false)
      query[key] = object[key];
  });

  return query;
}

/**
 * 주어진 객체를 URL 쿼리 문자열로 변환합니다.
 *
 * @param {object} object - URL 쿼리 문자열로 변환할 일차원 객체.
 * @returns {string} 변환된 URL 쿼리 문자열 (예: "?key1=value1&key2=value2").
 */
export function stringifyQuery(object) {
  const query = Object.entries(object)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return query ? `?${query}` : "";
}
