const BASE_URL = import.meta.env.VITE_BASE_URL

/**
 * 获取短链接
 * @param params - 请求参数对象
 * @param params.url - 原链接
 * @returns 返回Promise包含响应数据
 */
export const getShortUrlApi = async <T extends Record<string, string>>(
    params: T
): Promise<any> => {
    // 将参数转换为查询字符串
    const queryString = new URLSearchParams(params).toString();

    const res = await fetch(`${BASE_URL}/api/u/url?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
};