import path from "path";
import dotenv from "dotenv";

export const rootPath = path.join(__dirname, "..");
export const isProd = process.env.NODE_ENV === "production";

dotenv.config({
	path: path.resolve(isProd ? ".env" : ".env.development"),
});
