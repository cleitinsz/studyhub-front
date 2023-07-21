import { useRef } from 'react';

export default function useDebounce(search: Function, delay: number) {
	let timeout: { current: number | null } = useRef(null);

	function debounced(...params: any) {
		timeout.current && clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			search(...params);
		}, delay);
	}
	return debounced;
}
