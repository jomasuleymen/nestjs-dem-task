import { getAxiosWithProxy, ProxyInfo } from "./axios-proxy";

/**
 * ****************************
 * npm run test-axios-proxy
 * ****************************
 */

describe("Axios using proxy", () => {
	it("should return same ip", async () => {
		const proxyInfo: ProxyInfo = {
			ip: "45.196.48.9",
			port: 5435,
			login: "jtzhwqur",
			password: "jnf0t0n2tecg",
		};

		const axiosWithProxy = getAxiosWithProxy(proxyInfo);
		await axiosWithProxy
			.get("https://api64.ipify.org?format=json")
			.then((res) => {
				expect(res.data.ip).toEqual(proxyInfo.ip);
			});
	});
});
