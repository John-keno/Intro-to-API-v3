import { init } from "@paralleldrive/cuid2";

const createId = init({
	length: 10,
});

export const generateId = (): string => {
	return createId();
};
