import axios from "axios";

export type ProxyInfo = {
	ip: string;
	port: number;
	login: string;
	password: string;
};

export function getAxiosWithProxy(proxyInfo: ProxyInfo) {
	return axios.create({
		proxy: {
			protocol: "http",
			host: proxyInfo.ip,
			port: proxyInfo.port,
			auth: {
				username: proxyInfo.login,
				password: proxyInfo.password,
			},
		},
	});
}
