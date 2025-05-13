import '@testing-library/jest-dom' // adds support for .toBeInTheDocument() and others
import { vi } from 'vitest'

// from https://github.com/vitest-dev/vitest/issues/821#issuecomment-1046954558
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})
